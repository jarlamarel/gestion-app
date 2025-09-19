// ===================================
// ZAPA Finances - Gestion Financière
// 🎓 Apprentissage : Page de gestion budgétaire
// ===================================

import React from 'react';
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Finances() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion Financière</h1>
          <p className="text-gray-600">Budget, dépenses et revenus de l'association</p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouvelle Transaction
        </button>
      </div>

      {/* Métriques financières */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Budget Total</h3>
          <p className="text-2xl font-bold text-gray-900">15 420,50 €</p>
          <p className="text-sm text-green-600">+12.3% ce mois</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Dépenses</h3>
          <p className="text-2xl font-bold text-gray-900">2 340,25 €</p>
          <p className="text-sm text-red-600">+5.1% ce mois</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Revenus</h3>
          <p className="text-2xl font-bold text-gray-900">3 650,00 €</p>
          <p className="text-sm text-green-600">+8.7% ce mois</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="card">
        <div className="text-center py-12">
          <ChartBarIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Graphiques Financiers
          </h3>
          <p className="text-gray-500">
            Charts et analyses à développer avec Chart.js
          </p>
        </div>
      </div>
    </div>
  );
}
