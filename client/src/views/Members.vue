<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Gestion des Membres</h1>
      <button
        @click="showAddModal = true"
        class="bg-cultural-600 hover:bg-cultural-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
      >
        Ajouter un membre
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            v-model="filters.status"
            @change="loadMembers"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
          >
            <option value="">Tous</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="expired">Expiré</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Type d'adhésion
          </label>
          <select
            v-model="filters.membershipType"
            @change="loadMembers"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
          >
            <option value="">Tous</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="student">Étudiant</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Nom, prénom, email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
          />
        </div>
      </div>
    </div>

    <!-- Members List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          Liste des membres ({{ filteredMembers.length }})
        </h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adhésion
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="members.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                Aucun membre trouvé
              </td>
            </tr>
            <tr v-for="member in filteredMembers" :key="member.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ member.first_name }} {{ member.last_name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    Membre depuis {{ formatDate(member.membership_start) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.email }}</div>
                <div class="text-sm text-gray-500">{{ member.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ getMembershipTypeLabel(member.membership_type) }}</div>
                <div class="text-sm text-gray-500">
                  Expire le {{ formatDate(member.membership_end) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(member.status)"
                >
                  {{ getStatusLabel(member.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editMember(member)"
                  class="text-cultural-600 hover:text-cultural-900 mr-3"
                >
                  Modifier
                </button>
                <button
                  @click="deleteMember(member)"
                  class="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Member Modal -->
    <div v-if="showAddModal || editingMember" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingMember ? 'Modifier le membre' : 'Ajouter un membre' }}
        </h3>
        
        <form @submit.prevent="saveMember" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                v-model="memberForm.first_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                v-model="memberForm.last_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="memberForm.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              v-model="memberForm.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Type d'adhésion *
            </label>
            <select
              v-model="memberForm.membership_type"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="student">Étudiant</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Date de début *
              </label>
              <input
                v-model="memberForm.membership_start"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                v-model="memberForm.membership_end"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cultural-500 focus:border-cultural-500"
              />
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-cultural-600 text-white rounded-md hover:bg-cultural-700"
            >
              {{ editingMember ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Members',
  setup() {
    const members = ref([])
    const loading = ref(false)
    const showAddModal = ref(false)
    const editingMember = ref(null)
    const searchTerm = ref('')
    const filters = ref({
      status: '',
      membershipType: ''
    })
    
    const memberForm = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      membership_type: 'standard',
      membership_start: '',
      membership_end: ''
    })
    
    const filteredMembers = computed(() => {
      return members.value.filter(member => {
        const matchesSearch = !searchTerm.value || 
          `${member.first_name} ${member.last_name} ${member.email}`
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase())
        
        return matchesSearch
      })
    })
    
    const loadMembers = async () => {
      try {
        loading.value = true
        const params = new URLSearchParams()
        if (filters.value.status) params.append('status', filters.value.status)
        if (filters.value.membershipType) params.append('membership_type', filters.value.membershipType)
        
        const response = await axios.get(`/api/members?${params}`)
        members.value = response.data
      } catch (error) {
        console.error('Error loading members:', error)
      } finally {
        loading.value = false
      }
    }
    
    const saveMember = async () => {
      try {
        if (editingMember.value) {
          await axios.put(`/api/members/${editingMember.value.id}`, memberForm.value)
        } else {
          await axios.post('/api/members', memberForm.value)
        }
        await loadMembers()
        closeModal()
      } catch (error) {
        console.error('Error saving member:', error)
      }
    }
    
    const editMember = (member) => {
      editingMember.value = member
      memberForm.value = { ...member }
    }
    
    const deleteMember = async (member) => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${member.first_name} ${member.last_name} ?`)) {
        try {
          await axios.delete(`/api/members/${member.id}`)
          await loadMembers()
        } catch (error) {
          console.error('Error deleting member:', error)
        }
      }
    }
    
    const closeModal = () => {
      showAddModal.value = false
      editingMember.value = null
      memberForm.value = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        membership_type: 'standard',
        membership_start: '',
        membership_end: ''
      }
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return 'Non défini'
      return new Date(dateString).toLocaleDateString('fr-FR')
    }
    
    const getMembershipTypeLabel = (type) => {
      const labels = {
        'standard': 'Standard',
        'premium': 'Premium',
        'student': 'Étudiant',
        'senior': 'Senior'
      }
      return labels[type] || type
    }
    
    const getStatusLabel = (status) => {
      const labels = {
        'active': 'Actif',
        'inactive': 'Inactif',
        'expired': 'Expiré'
      }
      return labels[status] || status
    }
    
    const getStatusClass = (status) => {
      const classes = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-gray-100 text-gray-800',
        'expired': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
    
    onMounted(loadMembers)
    
    return {
      members,
      loading,
      showAddModal,
      editingMember,
      searchTerm,
      filters,
      memberForm,
      filteredMembers,
      loadMembers,
      saveMember,
      editMember,
      deleteMember,
      closeModal,
      formatDate,
      getMembershipTypeLabel,
      getStatusLabel,
      getStatusClass
    }
  }
}
</script>