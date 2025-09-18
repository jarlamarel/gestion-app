<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Gestion Financière</h1>
      <button class="bg-cultural-600 hover:bg-cultural-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
        Nouvelle transaction
      </button>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-center py-12">
        <CurrencyEuroIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Gestion Financière Culturelle</h3>
        <p class="text-gray-600 mb-6">
          Suivez vos budgets, subventions, recettes et dépenses liées aux activités culturelles
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
          <div class="flex items-center justify-center p-4 bg-green-50 rounded-lg">
            <span>💰 Subventions</span>
          </div>
          <div class="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <span>🎫 Billetterie</span>
          </div>
          <div class="flex items-center justify-center p-4 bg-yellow-50 rounded-lg">
            <span>📊 Budgets</span>
          </div>
          <div class="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
            <span>💸 Dépenses</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CurrencyEuroIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Finances',
  components: {
    CurrencyEuroIcon
  }
}
</script>