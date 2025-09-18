const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/database');

const router = express.Router();

// Register (for initial setup)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name],
      function(err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).json({ message: 'Cet email est déjà utilisé' });
          }
          return res.status(500).json({ message: 'Erreur lors de la création du compte' });
        }
        
        const token = jwt.sign(
          { userId: this.lastID, email },
          process.env.JWT_SECRET || 'gestion-culturelle-secret',
          { expiresIn: '24h' }
        );

        res.status(201).json({
          message: 'Compte créé avec succès',
          token,
          user: { id: this.lastID, email, name }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const db = getDb();
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur de base de données' });
        }

        if (!user) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'gestion-culturelle-secret',
          { expiresIn: '24h' }
        );

        res.json({
          message: 'Connexion réussie',
          token,
          user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;