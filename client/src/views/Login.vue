<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-cultural-50 to-cultural-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">🎭</h2>
        <h2 class="mt-2 text-2xl font-bold text-gray-900">Gestion Culturelle</h2>
        <p class="mt-2 text-sm text-gray-600">Application de gestion pour associations culturelles</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {{ error }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              placeholder="••••••••"
            />
          </div>
          
          <div v-if="isRegister" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
                placeholder="Votre nom"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cultural-600 hover:bg-cultural-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cultural-500 disabled:opacity-50"
          >
            <span v-if="loading">Chargement...</span>
            <span v-else>{{ isRegister ? 'Créer le compte' : 'Se connecter' }}</span>
          </button>
        </div>
        
        <div class="text-center">
          <button
            type="button"
            @click="toggleMode"
            class="text-cultural-600 hover:text-cultural-500 text-sm"
          >
            {{ isRegister ? 'Déjà un compte ? Se connecter' : 'Créer un compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const form = ref({
      email: '',
      password: '',
      name: ''
    })
    const loading = ref(false)
    const error = ref('')
    const isRegister = ref(false)
    
    const toggleMode = () => {
      isRegister.value = !isRegister.value
      error.value = ''
      form.value = { email: '', password: '', name: '' }
    }
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const endpoint = isRegister.value ? '/api/auth/register' : '/api/auth/login'
        const payload = isRegister.value ? form.value : {
          email: form.value.email,
          password: form.value.password
        }
        
        const response = await axios.post(endpoint, payload)
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        router.push('/dashboard')
      } catch (err) {
        error.value = err.response?.data?.message || 'Une erreur est survenue'
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      error,
      isRegister,
      toggleMode,
      handleSubmit
    }
  }
}
</script>