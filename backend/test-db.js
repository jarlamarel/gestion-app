// ===================================
// Test de Connexion PostgreSQL 17 - ZAPA Academy
// ===================================

const { Client } = require('pg');

// Configuration de connexion
const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'd8d39dae61ae40bd895e2cf58e3cf642',
  database: 'postgres' // Base par défaut pour tester la connexion
};

async function testPostgreSQL17() {
  console.log('🧪 Test de connexion PostgreSQL 17...');
  console.log('📚 Apprentissage : Connexion à la base de données');
  
  const client = new Client(dbConfig);
  
  try {
    // Tentative de connexion
    await client.connect();
    console.log('✅ Connexion PostgreSQL réussie !');
    
    // Test de version
    const versionResult = await client.query('SELECT version();');
    console.log('🔢 Version PostgreSQL:', versionResult.rows[0].version);
    
    // Test de création de base de données
    try {
      await client.query('CREATE DATABASE zapa_db;');
      console.log('✅ Base de données "zapa_db" créée avec succès !');
    } catch (error) {
      if (error.code === '42P04') {
        console.log('ℹ️  Base de données "zapa_db" existe déjà');
      } else {
        console.log('❌ Erreur création DB:', error.message);
      }
    }
    
    // Test de requête simple
    const timeResult = await client.query('SELECT NOW() as current_time;');
    console.log('⏰ Heure serveur:', timeResult.rows[0].current_time);
    
    console.log('🎉 PostgreSQL 17 fonctionne parfaitement avec Node.js !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion PostgreSQL:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Solution : Vérifiez que PostgreSQL est démarré');
      console.log('🔧 Commande Windows : services.msc → postgresql-x64-17');
    }
    
  } finally {
    await client.end();
    console.log('🔌 Connexion fermée');
  }
}

// Exécution du test
testPostgreSQL17();

