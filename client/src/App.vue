<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <div v-if="!isLoginPage" class="flex">
      <!-- Sidebar -->
      <div class="fixed inset-y-0 left-0 z-50 w-64 bg-cultural-800 shadow-lg">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-center h-16 px-4 bg-cultural-900">
            <h1 class="text-xl font-bold text-white">🎭 Gestion Culturelle</h1>
          </div>
          
          <nav class="flex-1 px-4 py-4 space-y-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="flex items-center px-4 py-2 text-sm font-medium text-cultural-100 hover:bg-cultural-700 hover:text-white rounded-md transition-colors"
              :class="{ 'bg-cultural-700 text-white': $route.path === item.href }"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </router-link>
          </nav>
          
          <div class="p-4 border-t border-cultural-700">
            <button
              @click="logout"
              class="flex items-center w-full px-4 py-2 text-sm font-medium text-cultural-100 hover:bg-cultural-700 hover:text-white rounded-md transition-colors"
            >
              <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="flex-1 ml-64">
        <main class="p-8">
          <router-view />
        </main>
      </div>
    </div>
    
    <!-- Login page -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  AcademicCapIcon,
  CurrencyEuroIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'App',
  components: {
    HomeIcon,
    UsersIcon,
    CalendarIcon,
    AcademicCapIcon,
    CurrencyEuroIcon,
    ArrowRightOnRectangleIcon
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const navigation = [
      { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon },
      { name: 'Membres', href: '/members', icon: UsersIcon },
      { name: 'Événements', href: '/events', icon: CalendarIcon },
      { name: 'Activités', href: '/activities', icon: AcademicCapIcon },
      { name: 'Finances', href: '/finances', icon: CurrencyEuroIcon }
    ]
    
    const isLoginPage = computed(() => route.path === '/login')
    
    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
    
    return {
      navigation,
      isLoginPage,
      logout
    }
  }
}
</script>