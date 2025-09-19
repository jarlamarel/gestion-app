// ===================================
// ZAPA App - Composant Principal React
// 🎓 Apprentissage : Architecture React moderne
// ===================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// 📚 ÉTAPE 1 : Import des composants (à créer)
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Members from './pages/Members';
import Events from './pages/Events';
import Finances from './pages/Finances';

// 📚 ÉTAPE 2 : Import des styles
import './index.css';

// ===================================
// 📚 CONFIGURATION REACT QUERY
// ===================================

// React Query gère le cache des données API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Ne pas recharger au focus
      retry: 1, // 1 seul retry en cas d'erreur
      staleTime: 5 * 60 * 1000, // Cache pendant 5 minutes
    },
  },
});

// ===================================
// 📚 COMPOSANT PRINCIPAL APP
// ===================================

function App() {
  console.log('🎓 ZAPA App - Mode apprentissage activé');
  console.log('⚛️ React 18 chargé avec succès');
  
  return (
    // 🌐 Provider pour React Query (gestion des données)
    <QueryClientProvider client={queryClient}>
      {/* 🧭 Router pour la navigation */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* 🍞 Notifications toast */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          {/* ===================================
              📚 DÉFINITION DES ROUTES
              =================================== */}
          
          <Routes>
            {/* 🔐 Route publique - Connexion */}
            <Route path="/login" element={<Login />} />
            
            {/* 🏠 Routes protégées avec layout */}
            <Route path="/" element={<Layout />}>
              {/* 📊 Page d'accueil - Dashboard */}
              <Route index element={<Dashboard />} />
              
              {/* 👥 Gestion des membres */}
              <Route path="members" element={<Members />} />
              
              {/* 📅 Gestion des événements */}
              <Route path="events" element={<Events />} />
              
              {/* 💰 Gestion financière */}
              <Route path="finances" element={<Finances />} />
              
              {/* 🚫 Route 404 - Page non trouvée */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

// ===================================
// 📚 COMPOSANT PAGE NON TROUVÉE
// ===================================

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <span className="text-6xl">🔍</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl text-gray-600 mb-4">Page non trouvée</h2>
        <p className="text-gray-500 mb-6">
          La page que vous cherchez n'existe pas dans ZAPA.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn-primary"
        >
          🏠 Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default App;

// ===================================
// 📚 COMMENTAIRES PÉDAGOGIQUES
// ===================================

/*
🎯 Ce composant App est le CŒUR de notre application React :

1. 🌐 QueryClientProvider : Gère le cache des données API
2. 🧭 Router : Gère la navigation entre les pages
3. 📍 Routes : Définit quelle page afficher selon l'URL
4. 🍞 Toaster : Affiche les notifications

💡 Architecture des routes :
- /login → Page de connexion (publique)
- / → Dashboard (privée, dans Layout)
- /members → Gestion membres (privée, dans Layout)
- /events → Gestion événements (privée, dans Layout)
- /finances → Gestion finances (privée, dans Layout)

🔄 Flux de données :
User → Route → Component → API Call → React Query → Update UI

🎓 Prochaine étape : Créer le composant Layout !
*/
