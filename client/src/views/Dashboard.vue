<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
      <div class="text-sm text-gray-500">
        {{ new Date().toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) }}
      </div>
    </div>

    <!-- Welcome Message -->
    <div class="bg-gradient-to-r from-cultural-500 to-cultural-600 rounded-lg p-6 text-white">
      <h2 class="text-xl font-semibold">Bienvenue dans votre espace de gestion culturelle</h2>
      <p class="mt-2 opacity-90">Gérez efficacement votre association culturelle : membres, événements, activités et finances</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <UsersIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Membres Actifs</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.members || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CalendarIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Événements à venir</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.upcomingEvents || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <AcademicCapIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Activités Actives</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.activeActivities || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <CurrencyEuroIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Solde Mensuel</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.monthlyBalance || 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Upcoming Events -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Prochains Événements</h3>
        </div>
        <div class="p-6">
          <div v-if="upcomingEvents.length === 0" class="text-gray-500 text-center py-4">
            Aucun événement à venir
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="event in upcomingEvents.slice(0, 5)"
              :key="event.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">{{ event.title }}</p>
                <p class="text-sm text-gray-600">{{ formatDate(event.start_date) }}</p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getEventTypeClass(event.event_type)">
                {{ getEventTypeLabel(event.event_type) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Actions Rapides</h3>
        </div>
        <div class="p-6">
          <div class="space-y-3">
            <router-link
              to="/members"
              class="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <UsersIcon class="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
              <span class="ml-3 text-blue-700 group-hover:text-blue-800 font-medium">Ajouter un membre</span>
            </router-link>
            
            <router-link
              to="/events"
              class="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
            >
              <CalendarIcon class="w-5 h-5 text-green-600 group-hover:text-green-700" />
              <span class="ml-3 text-green-700 group-hover:text-green-800 font-medium">Créer un événement</span>
            </router-link>
            
            <router-link
              to="/activities"
              class="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
            >
              <AcademicCapIcon class="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
              <span class="ml-3 text-purple-700 group-hover:text-purple-800 font-medium">Nouvelle activité</span>
            </router-link>
            
            <router-link
              to="/finances"
              class="flex items-center p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors group"
            >
              <CurrencyEuroIcon class="w-5 h-5 text-yellow-600 group-hover:text-yellow-700" />
              <span class="ml-3 text-yellow-700 group-hover:text-yellow-800 font-medium">Saisir une transaction</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  UsersIcon,
  CalendarIcon,
  AcademicCapIcon,
  CurrencyEuroIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    UsersIcon,
    CalendarIcon,
    AcademicCapIcon,
    CurrencyEuroIcon
  },
  setup() {
    const stats = ref({})
    const upcomingEvents = ref([])
    
    const loadDashboardData = async () => {
      try {
        // Load basic stats (in a real app, you'd have a dedicated endpoint)
        const [eventsRes] = await Promise.all([
          axios.get('/api/events?status=planned')
        ])
        
        upcomingEvents.value = eventsRes.data
        stats.value = {
          members: 0,
          upcomingEvents: eventsRes.data.length,
          activeActivities: 0,
          monthlyBalance: 0
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      }
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
    
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }
    
    const getEventTypeClass = (type) => {
      const classes = {
        'spectacle': 'bg-red-100 text-red-800',
        'exposition': 'bg-blue-100 text-blue-800',
        'atelier': 'bg-green-100 text-green-800',
        'festival': 'bg-purple-100 text-purple-800',
        'conference': 'bg-yellow-100 text-yellow-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    }
    
    const getEventTypeLabel = (type) => {
      const labels = {
        'spectacle': 'Spectacle',
        'exposition': 'Exposition',
        'atelier': 'Atelier',
        'festival': 'Festival',
        'conference': 'Conférence'
      }
      return labels[type] || type
    }
    
    onMounted(loadDashboardData)
    
    return {
      stats,
      upcomingEvents,
      formatDate,
      formatCurrency,
      getEventTypeClass,
      getEventTypeLabel
    }
  }
}
</script>