/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // 🎨 Couleurs personnalisées pour ZAPA
      colors: {
        // Palette principale
        primary: {
          50: '#eff6ff',   // Bleu très clair
          100: '#dbeafe',  // Bleu clair
          200: '#bfdbfe',  // Bleu moyen clair
          300: '#93c5fd',  // Bleu moyen
          400: '#60a5fa',  // Bleu
          500: '#3b82f6',  // Bleu principal ⭐
          600: '#2563eb',  // Bleu foncé
          700: '#1d4ed8',  // Bleu très foncé
          800: '#1e40af',  // Bleu sombre
          900: '#1e3a8a',  // Bleu très sombre
        },
        // Couleurs secondaires
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
        // Couleurs de statut
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      // 🔤 Typographie
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      // 📏 Espacements personnalisés
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // 🌊 Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // À installer plus tard si nécessaire
  ],
}
