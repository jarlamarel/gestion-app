// ===================================
// ZAPA Backend Server - Apprentissage Express.js
// ===================================

// 📚 ÉTAPE 1 : Importation des modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config(); // Charge les variables d'environnement

// 📚 ÉTAPE 2 : Création de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Démarrage du serveur ZAPA...');
console.log('📚 Mode apprentissage activé - Chaque étape sera expliquée');

// ===================================
// 📚 MIDDLEWARES - Fonctions qui s'exécutent sur chaque requête
// ===================================

// 🛡️ SÉCURITÉ : Helmet protège contre les attaques communes
app.use(helmet());
console.log('🛡️ Middleware de sécurité Helmet activé');

// 🌐 CORS : Permet au frontend (port 3000) de communiquer avec l'API (port 5000)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true // Permet l'envoi de cookies
}));
console.log('🌐 CORS configuré pour le frontend');

// 📝 PARSING : Permet de lire les données JSON dans les requêtes
app.use(express.json({ limit: '10mb' })); // Corps de requête en JSON
app.use(express.urlencoded({ extended: true })); // Données de formulaire
console.log('📝 Middleware de parsing JSON activé');

// 📊 LOGGING : Morgan enregistre toutes les requêtes HTTP
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Format coloré pour le développement
  console.log('📊 Logger Morgan activé en mode développement');
}

// ===================================
// 📚 ROUTES - Endpoints de notre API
// ===================================

// 🏠 Route de base - Test de fonctionnement
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Bienvenue dans ZAPA Academy !',
    description: 'Backend d\'apprentissage pour la gestion associative',
    version: '1.0.0',
    author: 'Zakaria',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth (à venir)',
      members: '/api/members (à venir)',
      events: '/api/events (à venir)',
      finances: '/api/finances (à venir)'
    }
  });
});

// 🏥 Route de santé - Vérification que l'API fonctionne
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ API opérationnelle',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'PostgreSQL (connexion à configurer)',
    uptime: process.uptime() + ' secondes'
  });
});

// 📚 Route d'apprentissage - Explique les concepts
app.get('/api/learn', (req, res) => {
  res.json({
    lesson: 'Comprendre les APIs REST',
    concepts: {
      'GET': 'Récupérer des données (comme lire un livre)',
      'POST': 'Créer de nouvelles données (comme écrire une page)',
      'PUT': 'Modifier des données existantes (comme corriger un texte)',
      'DELETE': 'Supprimer des données (comme effacer une ligne)'
    },
    example: {
      'GET /api/members': 'Récupère la liste des membres',
      'POST /api/members': 'Crée un nouveau membre',
      'PUT /api/members/123': 'Modifie le membre avec l\'ID 123',
      'DELETE /api/members/123': 'Supprime le membre avec l\'ID 123'
    },
    nextStep: 'Nous allons créer ces routes étape par étape !'
  });
});

// ===================================
// 📚 GESTION D'ERREURS
// ===================================

// 🚫 Gestion des routes non trouvées (404)
app.use('*', (req, res) => {
  res.status(404).json({
    error: '🚫 Route non trouvée',
    message: `La route ${req.method} ${req.originalUrl} n'existe pas`,
    suggestion: 'Vérifiez l\'URL ou consultez la documentation',
    availableRoutes: ['/', '/api/health', '/api/learn']
  });
});

// 💥 Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('💥 Erreur serveur:', err.stack);
  
  res.status(500).json({
    error: '💥 Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Une erreur inattendue s\'est produite',
    timestamp: new Date().toISOString()
  });
});

// ===================================
// 📚 DÉMARRAGE DU SERVEUR
// ===================================

app.listen(PORT, () => {
  console.log('');
  console.log('🎉 ===============================');
  console.log('🚀 Serveur ZAPA démarré avec succès !');
  console.log('📍 Port:', PORT);
  console.log('🌍 Environnement:', process.env.NODE_ENV || 'development');
  console.log('🔗 URL locale: http://localhost:' + PORT);
  console.log('🏥 Test de santé: http://localhost:' + PORT + '/api/health');
  console.log('📚 Apprentissage: http://localhost:' + PORT + '/api/learn');
  console.log('🎓 Mode apprentissage activé - Prêt pour le développement !');
  console.log('===============================');
  console.log('');
});
