// ===================================
// ZAPA Dashboard - Page d'Accueil
// 🎓 Apprentissage : Composant de page React
// ===================================

import React from 'react';
import { 
  UsersIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// ===================================
// 📚 DONNÉES MOCKÉES (temporaires)
// ===================================

const mockStats = {
  totalMembers: 142,
  activeMembers: 128,
  upcomingEvents: 5,
  totalBudget: 15420.50,
  monthlyExpenses: 2340.25,
  monthlyRevenue: 3650.00
};

const mockRecentActivities = [
  { id: 1, type: 'member', message: 'Marie Dubois a rejoint l\'association', time: '2h' },
  { id: 2, type: 'event', message: 'Événement "Concert Jazz" créé', time: '4h' },
  { id: 3, type: 'finance', message: 'Dépense de 250€ enregistrée', time: '6h' },
  { id: 4, type: 'member', message: '3 nouveaux membres cette semaine', time: '1j' },
];

const mockUpcomingEvents = [
  { id: 1, name: 'Concert de Jazz', date: '2024-01-15', participants: 45 },
  { id: 2, name: 'Assemblée Générale', date: '2024-01-20', participants: 12 },
  { id: 3, name: 'Atelier Théâtre', date: '2024-01-25', participants: 28 },
];

// ===================================
// 📚 COMPOSANT DASHBOARD PRINCIPAL
// ===================================

export default function Dashboard() {
  console.log('📊 Dashboard chargé - Mode apprentissage');
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* 📋 En-tête avec message de bienvenue */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              🎉 Bienvenue dans ZAPA !
            </h1>
            <p className="text-primary-100">
              Tableau de bord de votre association - Vue d'ensemble des activités
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-200">Dernière connexion</p>
            <p className="font-semibold">Aujourd'hui à 14:30</p>
          </div>
        </div>
      </div>

      {/* 📊 Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Membres Actifs"
          value={mockStats.activeMembers}
          total={mockStats.totalMembers}
          icon={UsersIcon}
          color="blue"
          trend="+5.2%"
        />
        
        <StatCard
          title="Événements"
          value={mockStats.upcomingEvents}
          subtitle="à venir"
          icon={CalendarIcon}
          color="green"
          trend="+2 cette semaine"
        />
        
        <StatCard
          title="Budget Total"
          value={`${mockStats.totalBudget.toLocaleString('fr-FR')}€`}
          icon={CurrencyDollarIcon}
          color="yellow"
          trend="+12.3%"
        />
        
         <StatCard
           title="Revenus du Mois"
           value={`${mockStats.monthlyRevenue.toLocaleString('fr-FR')}€`}
           icon={ArrowTrendingUpIcon}
           color="purple"
           trend="+8.1%"
         />
      </div>

      {/* 📈 Graphiques et activités */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">
              Activités Récentes
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'member' ? 'bg-blue-100' :
                  activity.type === 'event' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.type === 'member' ? '👤' :
                   activity.type === 'event' ? '📅' : '💰'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Événements à venir */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">
              Événements à Venir
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Gérer
            </button>
          </div>
          
          <div className="space-y-3">
            {mockUpcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(event.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="badge badge-info">
                    {event.participants} inscrits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🚨 Alertes et notifications */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Attention - Actions requises
            </h3>
            <div className="mt-2 text-sm text-yellow-700 space-y-1">
              <p>• 5 cotisations arrivent à échéance ce mois</p>
              <p>• Budget "Événements culturels" à 85% utilisé</p>
              <p>• Assemblée générale à planifier avant fin mars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================
// 📚 COMPOSANT CARTE DE STATISTIQUE
// ===================================

interface StatCardProps {
  title: string;
  value: string | number;
  total?: number;
  subtitle?: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  trend?: string;
}

function StatCard({ title, value, total, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600',
    green: 'bg-green-500 text-green-600', 
    yellow: 'bg-yellow-500 text-yellow-600',
    purple: 'bg-purple-500 text-purple-600'
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900">
              {value}
            </p>
            {total && (
              <p className="text-sm text-gray-500">/ {total}</p>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {trend && (
            <p className="text-xs text-green-600 font-medium mt-1">
              {trend}
            </p>
          )}
        </div>
        
        <div className={`p-3 rounded-full bg-opacity-10 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

// ===================================
// 📚 COMMENTAIRES PÉDAGOGIQUES
// ===================================

/*
🎯 Ce Dashboard illustre plusieurs concepts React :

1. 📊 Composant de page avec données mockées
2. 🎨 Interface utilisateur avec Tailwind
3. 🧩 Composant réutilisable (StatCard)
4. 📱 Design responsive (grid adaptatif)
5. 🎭 Props et TypeScript pour la sécurité

💡 Concepts utilisés :
- Props avec TypeScript (StatCardProps)
- Conditional rendering (total && <p>)
- Map pour afficher des listes
- CSS classes dynamiques
- Composant fonctionnel avec JSX

🔄 Données mockées → Vraies données API :
Actuellement nous utilisons des données factices.
Plus tard, nous les remplacerons par des appels API avec React Query.

🎓 Prochaine étape : Créer les autres pages et connecter l'API !
*/
