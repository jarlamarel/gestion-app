// ===================================
// ZAPA Events - Gestion des Événements
// 🎓 Apprentissage : Page de gestion événementielle
// ===================================

import React from 'react';
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function Events() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Événements</h1>
          <p className="text-gray-600">Organisez et suivez vos événements associatifs</p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouvel Événement
        </button>
      </div>

      {/* Vue calendrier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Calendrier des Événements
              </h3>
              <p className="text-gray-500">
                Vue calendrier à implémenter
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <h3 className="font-medium text-gray-900 mb-4">Événements à venir</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">📅</span>
              <p className="text-gray-500 text-sm">
                Liste à développer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
