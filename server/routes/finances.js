const express = require('express');
const { getDb } = require('../config/database');

const router = express.Router();

// Get all transactions
router.get('/transactions', (req, res) => {
  const db = getDb();
  const { type, category, start_date, end_date } = req.query;
  
  let sql = `
    SELECT t.*, e.title as event_title, a.name as activity_name
    FROM transactions t
    LEFT JOIN events e ON t.related_event_id = e.id
    LEFT JOIN activities a ON t.related_activity_id = a.id
    WHERE 1=1
  `;
  const params = [];
  
  if (type) {
    sql += ' AND t.type = ?';
    params.push(type);
  }
  
  if (category) {
    sql += ' AND t.category = ?';
    params.push(category);
  }
  
  if (start_date) {
    sql += ' AND t.transaction_date >= ?';
    params.push(start_date);
  }
  
  if (end_date) {
    sql += ' AND t.transaction_date <= ?';
    params.push(end_date);
  }
  
  sql += ' ORDER BY t.transaction_date DESC';
  
  db.all(sql, params, (err, transactions) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
    }
    res.json(transactions);
  });
});

// Get transaction by ID
router.get('/transactions/:id', (req, res) => {
  const db = getDb();
  db.get(
    `SELECT t.*, e.title as event_title, a.name as activity_name
     FROM transactions t
     LEFT JOIN events e ON t.related_event_id = e.id
     LEFT JOIN activities a ON t.related_activity_id = a.id
     WHERE t.id = ?`,
    [req.params.id],
    (err, transaction) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de la transaction' });
      }
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction non trouvée' });
      }
      res.json(transaction);
    }
  );
});

// Create new transaction
router.post('/transactions', (req, res) => {
  const {
    type, category, amount, description, transaction_date,
    related_event_id, related_activity_id, payment_method, reference
  } = req.body;
  
  if (!type || !category || !amount || !transaction_date) {
    return res.status(400).json({ 
      message: 'Type, catégorie, montant et date sont requis' 
    });
  }

  const db = getDb();
  db.run(
    `INSERT INTO transactions (
      type, category, amount, description, transaction_date,
      related_event_id, related_activity_id, payment_method, reference
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [type, category, amount, description, transaction_date,
     related_event_id, related_activity_id, payment_method, reference],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la création de la transaction' });
      }
      res.status(201).json({
        message: 'Transaction créée avec succès',
        id: this.lastID
      });
    }
  );
});

// Update transaction
router.put('/transactions/:id', (req, res) => {
  const {
    type, category, amount, description, transaction_date,
    related_event_id, related_activity_id, payment_method, reference
  } = req.body;

  const db = getDb();
  db.run(
    `UPDATE transactions SET
      type = ?, category = ?, amount = ?, description = ?, transaction_date = ?,
      related_event_id = ?, related_activity_id = ?, payment_method = ?, reference = ?
    WHERE id = ?`,
    [type, category, amount, description, transaction_date,
     related_event_id, related_activity_id, payment_method, reference, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de la transaction' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Transaction non trouvée' });
      }
      res.json({ message: 'Transaction mise à jour avec succès' });
    }
  );
});

// Delete transaction
router.delete('/transactions/:id', (req, res) => {
  const db = getDb();
  db.run('DELETE FROM transactions WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression de la transaction' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }
    res.json({ message: 'Transaction supprimée avec succès' });
  });
});

// Get financial summary
router.get('/summary', (req, res) => {
  const { year, month } = req.query;
  const db = getDb();
  
  let dateFilter = '1=1';
  const params = [];
  
  if (year) {
    dateFilter = 'strftime("%Y", transaction_date) = ?';
    params.push(year);
    
    if (month) {
      dateFilter += ' AND strftime("%m", transaction_date) = ?';
      params.push(month.padStart(2, '0'));
    }
  }
  
  // Get total income and expenses
  db.get(
    `SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses
     FROM transactions WHERE ${dateFilter}`,
    params,
    (err, totals) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors du calcul du résumé financier' });
      }
      
      // Get breakdown by category
      db.all(
        `SELECT type, category, SUM(amount) as total
         FROM transactions WHERE ${dateFilter}
         GROUP BY type, category ORDER BY type, total DESC`,
        params,
        (err, breakdown) => {
          if (err) {
            return res.status(500).json({ message: 'Erreur lors du calcul du résumé financier' });
          }
          
          // Get monthly evolution (last 12 months)
          db.all(
            `SELECT 
              strftime('%Y-%m', transaction_date) as month,
              SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
              SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
             FROM transactions 
             WHERE transaction_date >= date('now', '-12 months')
             GROUP BY strftime('%Y-%m', transaction_date)
             ORDER BY month`,
            (err, evolution) => {
              if (err) {
                return res.status(500).json({ message: 'Erreur lors du calcul du résumé financier' });
              }
              
              res.json({
                totals: {
                  income: totals.total_income || 0,
                  expenses: totals.total_expenses || 0,
                  balance: (totals.total_income || 0) - (totals.total_expenses || 0)
                },
                breakdown,
                evolution
              });
            }
          );
        }
      );
    }
  );
});

// Get budget vs actual for events
router.get('/budget-analysis', (req, res) => {
  const db = getDb();
  
  db.all(
    `SELECT 
      e.id,
      e.title,
      e.budget as planned_budget,
      COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) as actual_income,
      COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) as actual_expenses
     FROM events e
     LEFT JOIN transactions t ON e.id = t.related_event_id
     WHERE e.budget > 0
     GROUP BY e.id, e.title, e.budget
     ORDER BY e.start_date DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de l\'analyse budgétaire' });
      }
      
      const analysis = results.map(event => ({
        ...event,
        actual_balance: event.actual_income - event.actual_expenses,
        budget_variance: (event.actual_income - event.actual_expenses) - event.planned_budget,
        expense_ratio: event.planned_budget > 0 ? (event.actual_expenses / event.planned_budget) * 100 : 0
      }));
      
      res.json(analysis);
    }
  );
});

module.exports = router;