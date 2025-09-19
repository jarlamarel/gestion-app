// ===================================
// ZAPA Login - Page de Connexion
// 🎓 Apprentissage : Formulaires React et authentification
// ===================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// ===================================
// 📚 COMPOSANT LOGIN PRINCIPAL
// ===================================

export default function Login() {
  // 🎣 États locaux du composant
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 📚 Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    console.log('🔐 Tentative de connexion:', { email });
    
    // Validation basique
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    if (!email.includes('@')) {
      toast.error('Format d\'email invalide');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 📚 TODO: Remplacer par un vrai appel API
      // Simulation d'une connexion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Connexion factice réussie
      if (email === 'admin@zapa.com' && password === 'admin123') {
        toast.success('Connexion réussie ! Bienvenue dans ZAPA 🎉');
        
        // TODO: Stocker le token JWT
        localStorage.setItem('zapa_token', 'fake-jwt-token');
        
        // Redirection vers le dashboard
        navigate('/');
      } else {
        toast.error('Email ou mot de passe incorrect');
      }
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* 📋 En-tête */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white">🏛️</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue dans ZAPA
          </h1>
          <p className="text-gray-600">
            Connectez-vous à votre espace de gestion associative
          </p>
        </div>

        {/* 📝 Formulaire de connexion */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zapa.com"
                className="input-field"
                disabled={isLoading}
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="input-field pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner mr-3"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  🔐 Se connecter
                </>
              )}
            </button>
          </form>

          {/* 📚 Informations de test */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              🎓 Mode Apprentissage - Comptes de test :
            </h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Admin :</strong> admin@zapa.com / admin123</p>
              <p><strong>Trésorier :</strong> tresorier@zapa.com / tresorier123</p>
              <p><strong>Membre :</strong> membre@zapa.com / membre123</p>
            </div>
          </div>
        </div>

        {/* 📄 Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Pas encore de compte ? 
            <button className="ml-1 text-primary-600 hover:text-primary-500 font-medium">
              Contactez l'administrateur
            </button>
          </p>
          <p className="mt-2">
            🎓 ZAPA Academy - Apprentissage du développement web
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================================
// 📚 COMMENTAIRES PÉDAGOGIQUES
// ===================================

/*
🎯 Cette page de connexion illustre :

1. 📝 Gestion des formulaires React (useState, onChange)
2. 🔐 Validation côté client
3. 🎨 Interface utilisateur moderne avec Tailwind
4. 📱 Design responsive
5. 🍞 Notifications avec react-hot-toast
6. 🧭 Navigation avec useNavigate

💡 Concepts React utilisés :
- useState : Gestion de l'état local
- useNavigate : Navigation programmée
- Event handlers : onSubmit, onChange
- Conditional rendering : {isLoading ? ... : ...}
- Form validation : Vérification des champs

🔄 Flux d'authentification :
1. User saisit email/password
2. Validation côté client
3. Appel API (simulé)
4. Stockage token JWT
5. Redirection dashboard

🎓 Améliorations futures :
- Vraie API d'authentification
- Gestion des rôles utilisateurs
- Récupération de mot de passe
- Authentification à deux facteurs
*/
