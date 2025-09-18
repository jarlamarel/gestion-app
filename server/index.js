const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/finances', require('./routes/finances'));
app.use('/api/activities', require('./routes/activities'));

// Serve client application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Initialize database and start server
const db = require('./config/database');
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🎭 Serveur de gestion culturelle démarré sur le port ${PORT}`);
    console.log(`🌐 Application disponible sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erreur lors de l\'initialisation de la base de données:', err);
  process.exit(1);
});

module.exports = app;