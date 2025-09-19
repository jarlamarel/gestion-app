// ===================================
// ZAPA Layout - Structure de Navigation
// 🎓 Apprentissage : Composant Layout React
// ===================================

import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// ===================================
// 📚 CONFIGURATION DE LA NAVIGATION
// ===================================

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: HomeIcon,
    description: 'Vue d\'ensemble de l\'association'
  },
  { 
    name: 'Membres', 
    href: '/members', 
    icon: UsersIcon,
    description: 'Gestion des membres et adhésions'
  },
  { 
    name: 'Événements', 
    href: '/events', 
    icon: CalendarIcon,
    description: 'Organisation et suivi des événements'
  },
  { 
    name: 'Finances', 
    href: '/finances', 
    icon: CurrencyDollarIcon,
    description: 'Budget, dépenses et revenus'
  },
];

// ===================================
// 📚 COMPOSANT LAYOUT PRINCIPAL
// ===================================

export default function Layout() {
  // 🎣 Hooks React pour l'état et la navigation
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // 📚 Fonction pour obtenir le nom de la page actuelle
  const getCurrentPageName = () => {
    const currentNav = navigation.find(item => item.href === location.pathname);
    return currentNav?.name || 'ZAPA';
  };
  
  // 📚 Fonction de déconnexion
  const handleLogout = () => {
    console.log('🔐 Déconnexion utilisateur');
    // TODO: Nettoyer le token JWT
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ===================================
          📱 SIDEBAR MOBILE (Overlay)
          =================================== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay sombre */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar mobile */}
          <div className="relative flex flex-col w-64 bg-white shadow-xl">
            <SidebarContent 
              navigation={navigation} 
              location={location} 
              onClose={() => setSidebarOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* ===================================
          💻 SIDEBAR DESKTOP
          =================================== */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <SidebarContent 
          navigation={navigation} 
          location={location} 
          onLogout={handleLogout}
        />
      </div>

      {/* ===================================
          📄 CONTENU PRINCIPAL
          =================================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 📋 Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Bouton menu mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-menu-button"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            {/* Titre de la page */}
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 ml-4 md:ml-0">
                {getCurrentPageName()}
              </h1>
            </div>
            
            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                🎓 Mode apprentissage
              </span>
            </div>
          </div>
        </header>

        {/* 📄 Contenu de la page */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* 📚 Outlet affiche le composant de la route actuelle */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ===================================
// 📚 COMPOSANT SIDEBAR RÉUTILISABLE
// ===================================

interface SidebarContentProps {
  navigation: typeof navigation;
  location: any;
  onClose?: () => void;
  onLogout: () => void;
}

function SidebarContent({ navigation, location, onClose, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg">
      {/* 🏷️ Logo et titre */}
      <div className="flex items-center justify-between h-16 px-4 bg-primary-600">
        <div className="flex items-center">
          <span className="text-2xl">🏛️</span>
          <h1 className="ml-2 text-xl font-bold text-white">ZAPA</h1>
        </div>
        
        {/* Bouton fermer (mobile uniquement) */}
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-gray-200 md:hidden">
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* 🧭 Navigation principale */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </p>
        
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose} // Fermer le menu mobile après clic
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon 
                className={`mr-3 h-5 w-5 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} 
              />
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span className="text-xs text-gray-500 mt-0.5">
                  {item.description}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 👤 Section utilisateur */}
      <div className="p-4 border-t border-gray-200">
        {/* Profil utilisateur */}
        <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Administrateur</p>
            <p className="text-xs text-gray-500">admin@zapa.com</p>
          </div>
        </div>
        
        {/* Actions utilisateur */}
        <div className="space-y-1">
          <button className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Cog6ToothIcon className="w-4 h-4 mr-3" />
            Paramètres
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================
// 📚 COMMENTAIRES PÉDAGOGIQUES
// ===================================

/*
🎯 Ce Layout est un composant WRAPPER qui :

1. 🧭 Gère la navigation (sidebar + mobile menu)
2. 📱 S'adapte au mobile (responsive design)
3. 📍 Affiche la page actuelle avec <Outlet />
4. 👤 Gère l'utilisateur connecté

💡 Concepts React utilisés :
- useState : État local (sidebar ouvert/fermé)
- useLocation : URL actuelle
- useNavigate : Navigation programmée
- Props : Passage de données entre composants

🔄 Flux de navigation :
User clique → Link → Router → Outlet → Nouveau composant

🎓 Prochaine étape : Créer les pages (Dashboard, Members, etc.) !
*/
