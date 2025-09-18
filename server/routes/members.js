const express = require('express');
const { getDb } = require('../config/database');

const router = express.Router();

// Get all members
router.get('/', (req, res) => {
  const db = getDb();
  const { status, membership_type } = req.query;
  
  let sql = 'SELECT * FROM members WHERE 1=1';
  const params = [];
  
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  
  if (membership_type) {
    sql += ' AND membership_type = ?';
    params.push(membership_type);
  }
  
  sql += ' ORDER BY last_name, first_name';
  
  db.all(sql, params, (err, members) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des membres' });
    }
    res.json(members);
  });
});

// Get member by ID
router.get('/:id', (req, res) => {
  const db = getDb();
  db.get('SELECT * FROM members WHERE id = ?', [req.params.id], (err, member) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération du membre' });
    }
    if (!member) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.json(member);
  });
});

// Create new member
router.post('/', (req, res) => {
  const {
    first_name, last_name, email, phone, address, birth_date,
    membership_type, membership_start, membership_end, notes
  } = req.body;
  
  if (!first_name || !last_name || !membership_type || !membership_start) {
    return res.status(400).json({ 
      message: 'Prénom, nom, type d\'adhésion et date de début sont requis' 
    });
  }

  const db = getDb();
  db.run(
    `INSERT INTO members (
      first_name, last_name, email, phone, address, birth_date,
      membership_type, membership_start, membership_end, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, phone, address, birth_date,
     membership_type, membership_start, membership_end, notes],
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Cet email est déjà utilisé' });
        }
        return res.status(500).json({ message: 'Erreur lors de la création du membre' });
      }
      res.status(201).json({
        message: 'Membre créé avec succès',
        id: this.lastID
      });
    }
  );
});

// Update member
router.put('/:id', (req, res) => {
  const {
    first_name, last_name, email, phone, address, birth_date,
    membership_type, membership_start, membership_end, status, notes
  } = req.body;

  const db = getDb();
  db.run(
    `UPDATE members SET
      first_name = ?, last_name = ?, email = ?, phone = ?, address = ?,
      birth_date = ?, membership_type = ?, membership_start = ?,
      membership_end = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [first_name, last_name, email, phone, address, birth_date,
     membership_type, membership_start, membership_end, status, notes, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du membre' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Membre non trouvé' });
      }
      res.json({ message: 'Membre mis à jour avec succès' });
    }
  );
});

// Delete member
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.run('DELETE FROM members WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du membre' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.json({ message: 'Membre supprimé avec succès' });
  });
});

// Get member statistics
router.get('/stats/overview', (req, res) => {
  const db = getDb();
  const stats = {};
  
  // Count active members
  db.get('SELECT COUNT(*) as count FROM members WHERE status = "active"', (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
    stats.active_members = result.count;
    
    // Count by membership type
    db.all(
      'SELECT membership_type, COUNT(*) as count FROM members WHERE status = "active" GROUP BY membership_type',
      (err, types) => {
        if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
        stats.by_type = types;
        
        // Count expiring memberships (next 30 days)
        db.get(
          'SELECT COUNT(*) as count FROM members WHERE status = "active" AND membership_end <= date("now", "+30 days")',
          (err, expiring) => {
            if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
            stats.expiring_soon = expiring.count;
            res.json(stats);
          }
        );
      }
    );
  });
});

module.exports = router;