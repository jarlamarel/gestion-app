// ===================================
// ZAPA Members - Gestion des Membres
// 🎓 Apprentissage : Page de gestion avec données tabulaires
// ===================================

import React from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Members() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Membres</h1>
          <p className="text-gray-600">Gérez les adhésions et profils des membres</p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouveau Membre
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              className="input-field pl-10"
            />
          </div>
          <select className="input-field w-48">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Inactif</option>
            <option>En attente</option>
          </select>
        </div>
      </div>

      {/* Contenu à développer */}
      <div className="card">
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">👥</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Module Membres en cours de développement
          </h3>
          <p className="text-gray-500">
            Cette page sera développée dans les prochaines étapes de l'apprentissage !
          </p>
        </div>
      </div>
    </div>
  );
}

