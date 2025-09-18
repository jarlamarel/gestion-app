const express = require('express');
const { getDb } = require('../config/database');

const router = express.Router();

// Get all events
router.get('/', (req, res) => {
  const db = getDb();
  const { status, event_type, start_date, end_date } = req.query;
  
  let sql = `
    SELECT e.*, u.name as organizer_name 
    FROM events e 
    LEFT JOIN users u ON e.organizer_id = u.id 
    WHERE 1=1
  `;
  const params = [];
  
  if (status) {
    sql += ' AND e.status = ?';
    params.push(status);
  }
  
  if (event_type) {
    sql += ' AND e.event_type = ?';
    params.push(event_type);
  }
  
  if (start_date) {
    sql += ' AND e.start_date >= ?';
    params.push(start_date);
  }
  
  if (end_date) {
    sql += ' AND e.start_date <= ?';
    params.push(end_date);
  }
  
  sql += ' ORDER BY e.start_date ASC';
  
  db.all(sql, params, (err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
    res.json(events);
  });
});

// Get event by ID
router.get('/:id', (req, res) => {
  const db = getDb();
  db.get(
    `SELECT e.*, u.name as organizer_name 
     FROM events e 
     LEFT JOIN users u ON e.organizer_id = u.id 
     WHERE e.id = ?`,
    [req.params.id],
    (err, event) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' });
      }
      if (!event) {
        return res.status(404).json({ message: 'Événement non trouvé' });
      }
      res.json(event);
    }
  );
});

// Create new event
router.post('/', (req, res) => {
  const {
    title, description, event_type, start_date, end_date, location,
    capacity, ticket_price, organizer_id, budget
  } = req.body;
  
  if (!title || !event_type || !start_date) {
    return res.status(400).json({ 
      message: 'Titre, type d\'événement et date de début sont requis' 
    });
  }

  const db = getDb();
  db.run(
    `INSERT INTO events (
      title, description, event_type, start_date, end_date, location,
      capacity, ticket_price, organizer_id, budget
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, event_type, start_date, end_date, location,
     capacity, ticket_price, organizer_id, budget],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
      }
      res.status(201).json({
        message: 'Événement créé avec succès',
        id: this.lastID
      });
    }
  );
});

// Update event
router.put('/:id', (req, res) => {
  const {
    title, description, event_type, start_date, end_date, location,
    capacity, ticket_price, status, organizer_id, budget
  } = req.body;

  const db = getDb();
  db.run(
    `UPDATE events SET
      title = ?, description = ?, event_type = ?, start_date = ?, end_date = ?,
      location = ?, capacity = ?, ticket_price = ?, status = ?, organizer_id = ?,
      budget = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [title, description, event_type, start_date, end_date, location,
     capacity, ticket_price, status, organizer_id, budget, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Événement non trouvé' });
      }
      res.json({ message: 'Événement mis à jour avec succès' });
    }
  );
});

// Delete event
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.run('DELETE FROM events WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json({ message: 'Événement supprimé avec succès' });
  });
});

// Get event statistics
router.get('/stats/overview', (req, res) => {
  const db = getDb();
  const stats = {};
  
  // Count events by status
  db.all('SELECT status, COUNT(*) as count FROM events GROUP BY status', (err, statusCounts) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
    stats.by_status = statusCounts;
    
    // Count by event type
    db.all(
      'SELECT event_type, COUNT(*) as count FROM events GROUP BY event_type',
      (err, typeCounts) => {
        if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
        stats.by_type = typeCounts;
        
        // Upcoming events (next 30 days)
        db.get(
          'SELECT COUNT(*) as count FROM events WHERE start_date >= date("now") AND start_date <= date("now", "+30 days")',
          (err, upcoming) => {
            if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
            stats.upcoming_events = upcoming.count;
            
            // Total budget for upcoming events
            db.get(
              'SELECT SUM(budget) as total FROM events WHERE start_date >= date("now") AND budget > 0',
              (err, budget) => {
                if (err) return res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
                stats.total_budget = budget.total || 0;
                res.json(stats);
              }
            );
          }
        );
      }
    );
  });
});

// Get events calendar data
router.get('/calendar/:year/:month', (req, res) => {
  const { year, month } = req.params;
  const startDate = `${year}-${month.padStart(2, '0')}-01`;
  const endDate = `${year}-${month.padStart(2, '0')}-31`;
  
  const db = getDb();
  db.all(
    `SELECT id, title, event_type, start_date, end_date, status 
     FROM events 
     WHERE start_date >= ? AND start_date <= ?
     ORDER BY start_date`,
    [startDate, endDate],
    (err, events) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la récupération du calendrier' });
      }
      res.json(events);
    }
  );
});

module.exports = router;