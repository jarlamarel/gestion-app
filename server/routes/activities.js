const express = require('express');
const { getDb } = require('../config/database');

const router = express.Router();

// Get all activities
router.get('/', (req, res) => {
  const db = getDb();
  const { status, activity_type } = req.query;
  
  let sql = 'SELECT * FROM activities WHERE 1=1';
  const params = [];
  
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  
  if (activity_type) {
    sql += ' AND activity_type = ?';
    params.push(activity_type);
  }
  
  sql += ' ORDER BY name';
  
  db.all(sql, params, (err, activities) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des activités' });
    }
    res.json(activities);
  });
});

// Get activity by ID with registrations
router.get('/:id', (req, res) => {
  const db = getDb();
  db.get('SELECT * FROM activities WHERE id = ?', [req.params.id], (err, activity) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération de l\'activité' });
    }
    if (!activity) {
      return res.status(404).json({ message: 'Activité non trouvée' });
    }
    
    // Get registrations for this activity
    db.all(
      `SELECT ar.*, m.first_name, m.last_name, m.email 
       FROM activity_registrations ar
       JOIN members m ON ar.member_id = m.id
       WHERE ar.activity_id = ?`,
      [req.params.id],
      (err, registrations) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la récupération des inscriptions' });
        }
        activity.registrations = registrations;
        res.json(activity);
      }
    );
  });
});

// Create new activity
router.post('/', (req, res) => {
  const {
    name, description, activity_type, instructor, schedule, duration,
    max_participants, price, start_date, end_date
  } = req.body;
  
  if (!name || !activity_type) {
    return res.status(400).json({ 
      message: 'Nom et type d\'activité sont requis' 
    });
  }

  const db = getDb();
  db.run(
    `INSERT INTO activities (
      name, description, activity_type, instructor, schedule, duration,
      max_participants, price, start_date, end_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, activity_type, instructor, schedule, duration,
     max_participants, price, start_date, end_date],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'activité' });
      }
      res.status(201).json({
        message: 'Activité créée avec succès',
        id: this.lastID
      });
    }
  );
});

// Update activity
router.put('/:id', (req, res) => {
  const {
    name, description, activity_type, instructor, schedule, duration,
    max_participants, price, status, start_date, end_date
  } = req.body;

  const db = getDb();
  db.run(
    `UPDATE activities SET
      name = ?, description = ?, activity_type = ?, instructor = ?, schedule = ?,
      duration = ?, max_participants = ?, price = ?, status = ?, start_date = ?,
      end_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [name, description, activity_type, instructor, schedule, duration,
     max_participants, price, status, start_date, end_date, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'activité' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Activité non trouvée' });
      }
      res.json({ message: 'Activité mise à jour avec succès' });
    }
  );
});

// Delete activity
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.run('DELETE FROM activities WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression de l\'activité' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Activité non trouvée' });
    }
    res.json({ message: 'Activité supprimée avec succès' });
  });
});

// Register member to activity
router.post('/:id/register', (req, res) => {
  const { member_id } = req.body;
  const activity_id = req.params.id;
  
  if (!member_id) {
    return res.status(400).json({ message: 'ID du membre requis' });
  }

  const db = getDb();
  
  // Check if activity exists and has space
  db.get('SELECT * FROM activities WHERE id = ?', [activity_id], (err, activity) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la vérification de l\'activité' });
    }
    if (!activity) {
      return res.status(404).json({ message: 'Activité non trouvée' });
    }
    
    // Check current registrations
    db.get(
      'SELECT COUNT(*) as count FROM activity_registrations WHERE activity_id = ? AND status = "registered"',
      [activity_id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la vérification des inscriptions' });
        }
        
        if (activity.max_participants && result.count >= activity.max_participants) {
          return res.status(400).json({ message: 'Activité complète' });
        }
        
        // Register member
        db.run(
          'INSERT INTO activity_registrations (member_id, activity_id) VALUES (?, ?)',
          [member_id, activity_id],
          function(err) {
            if (err) {
              if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(409).json({ message: 'Membre déjà inscrit à cette activité' });
              }
              return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            }
            res.status(201).json({
              message: 'Inscription réussie',
              registration_id: this.lastID
            });
          }
        );
      }
    );
  });
});

// Unregister member from activity
router.delete('/:id/register/:member_id', (req, res) => {
  const { id: activity_id, member_id } = req.params;
  
  const db = getDb();
  db.run(
    'DELETE FROM activity_registrations WHERE activity_id = ? AND member_id = ?',
    [activity_id, member_id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la désinscription' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Inscription non trouvée' });
      }
      res.json({ message: 'Désinscription réussie' });
    }
  );
});

module.exports = router;