const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.db');
let db;

const initialize = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('📊 Base de données SQLite connectée');
        createTables().then(resolve).catch(reject);
      }
    });
  });
};

const createTables = () => {
  return new Promise((resolve, reject) => {
    const tables = [
      // Table des utilisateurs/administrateurs
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Table des membres de l'association
      `CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        birth_date DATE,
        membership_type VARCHAR(50) NOT NULL DEFAULT 'standard',
        membership_start DATE NOT NULL,
        membership_end DATE,
        status VARCHAR(20) DEFAULT 'active',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Table des événements culturels
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_type VARCHAR(50) NOT NULL,
        start_date DATETIME NOT NULL,
        end_date DATETIME,
        location VARCHAR(255),
        capacity INTEGER,
        ticket_price DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'planned',
        organizer_id INTEGER,
        budget DECIMAL(10,2) DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organizer_id) REFERENCES users(id)
      )`,
      
      // Table des activités (cours, ateliers, formations)
      `CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        activity_type VARCHAR(50) NOT NULL,
        instructor VARCHAR(255),
        schedule TEXT,
        duration INTEGER,
        max_participants INTEGER,
        price DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active',
        start_date DATE,
        end_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Table des finances
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(20) NOT NULL,
        category VARCHAR(100) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        transaction_date DATE NOT NULL,
        related_event_id INTEGER,
        related_activity_id INTEGER,
        payment_method VARCHAR(50),
        reference VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (related_event_id) REFERENCES events(id),
        FOREIGN KEY (related_activity_id) REFERENCES activities(id)
      )`,
      
      // Table des inscriptions membres-activités
      `CREATE TABLE IF NOT EXISTS activity_registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER NOT NULL,
        activity_id INTEGER NOT NULL,
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'registered',
        payment_status VARCHAR(20) DEFAULT 'pending',
        FOREIGN KEY (member_id) REFERENCES members(id),
        FOREIGN KEY (activity_id) REFERENCES activities(id),
        UNIQUE(member_id, activity_id)
      )`
    ];

    let completed = 0;
    tables.forEach((sql, index) => {
      db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          completed++;
          if (completed === tables.length) {
            console.log('✅ Tables créées avec succès');
            resolve();
          }
        }
      });
    });
  });
};

const getDb = () => db;

module.exports = {
  initialize,
  getDb
};