// ===================================
// ZAPA Frontend - Point d'entrée React
// 🎓 Apprentissage : Comment React s'initialise
// ===================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 📚 ÉTAPE 1 : Récupération de l'élément DOM racine
const rootElement = document.getElementById('root') as HTMLElement;

// ⚠️ Vérification de sécurité
if (!rootElement) {
  throw new Error('🚫 Élément #root non trouvé dans index.html');
}

// 📚 ÉTAPE 2 : Création du root React 18
const root = ReactDOM.createRoot(rootElement);

// 📚 ÉTAPE 3 : Rendu de l'application
console.log('🚀 Initialisation de ZAPA...');
console.log('📚 Mode apprentissage React activé');

root.render(
  <React.StrictMode>
    {/* 📚 StrictMode aide à détecter les problèmes en développement */}
    <App />
  </React.StrictMode>
);

// ===================================
// 📚 COMMENTAIRES PÉDAGOGIQUES
// ===================================

/*
🎯 Ce fichier est le POINT D'ENTRÉE de notre application React :

1. 🎯 ReactDOM.createRoot() : Nouvelle API React 18
2. 🛡️ React.StrictMode : Mode strict pour le développement
3. 📱 root.render() : Affiche notre App dans le DOM

💡 Différences React 17 vs 18 :
- React 17 : ReactDOM.render(<App />, document.getElementById('root'))
- React 18 : ReactDOM.createRoot().render(<App />)

🔄 Flux d'initialisation :
1. index.html charge ce script
2. Ce script crée le root React
3. App.tsx définit la structure
4. Les composants s'affichent

🎓 Prochaine étape : Comprendre le routage et la navigation !
*/
