# ZAPA - Application de Gestion Associative 🏛️

> **Application web moderne pour la gestion d'associations culturelles et financières**

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue.svg)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org/)

---

## 📋 Table des Matières

- [🎯 Objectifs du Projet](#-objectifs-du-projet)
- [🚀 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [💻 Technologies](#-technologies)
- [🌐 Hébergement](#-hébergement)
- [📁 Structure du Projet](#-structure-du-projet)
- [⚡ Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🗄️ Base de Données](#️-base-de-données)
- [🎨 Interface Utilisateur](#-interface-utilisateur)
- [🔐 Sécurité](#-sécurité)
- [📊 Roadmap](#-roadmap)

---

## 🎯 Objectifs du Projet

### Contexte
Application destinée aux **associations culturelles** pour simplifier leur gestion administrative et financière.

### Public Cible
- **Administrateurs** : Gestion complète de l'association
- **Trésoriers** : Gestion financière et budgétaire
- **Membres** : Consultation et participation aux événements
- **Responsables événements** : Organisation et suivi

### Objectifs Principaux
- ✅ Centraliser la gestion des membres
- ✅ Simplifier l'organisation d'événements
- ✅ Automatiser la gestion financière
- ✅ Fournir des rapports et statistiques
- ✅ Assurer la transparence financière

---

## 🚀 Fonctionnalités

### 👥 Gestion des Membres
- **Inscription et profils** : Données personnelles, coordonnées
- **Gestion des adhésions** : Cotisations, renouvellements
- **Rôles et permissions** : Admin, trésorier, membre, invité
- **Communication** : Notifications, newsletters
- **Historique** : Suivi des activités et participations

### 📅 Gestion des Événements
- **Création d'événements** : Culturels, formations, assemblées
- **Planification** : Calendrier, ressources, intervenants
- **Inscriptions** : Gestion des participants, listes d'attente
- **Suivi** : Présences, évaluations, feedback
- **Récurrence** : Événements périodiques automatisés

### 💰 Gestion Financière
- **Budget prévisionnel** : Planification annuelle/mensuelle
- **Suivi des dépenses** : Catégorisation, justificatifs
- **Gestion des revenus** : Cotisations, subventions, dons
- **Rapports financiers** : Bilans, comptes de résultat
- **Alertes** : Dépassements budgétaires, échéances

### 📊 Rapports et Statistiques
- **Tableaux de bord** : Vues d'ensemble personnalisées
- **Analyses** : Tendances, évolutions, comparaisons
- **Exports** : PDF, Excel, formats comptables
- **Visualisations** : Graphiques, charts interactifs

---

## 🏗️ Architecture

### Architecture Choisie : **Monolithique Modulaire**

```
┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend API      │    │   PostgreSQL    │
│   (React)       │◄──►│   (Node.js/Express)  │◄──►│   Database      │
│                 │    │                      │    │                 │
│ • Components    │    │ • Auth Module        │    │ • Users         │
│ • Pages         │    │ • Members Module     │    │ • Events        │
│ • Services      │    │ • Events Module      │    │ • Finances      │
│ • State Mgmt    │    │ • Finance Module     │    │ • Audit Logs    │
└─────────────────┘    │ • Reports Module     │    └─────────────────┘
                       └──────────────────────┘
```

### Avantages de cette Architecture
- ✅ **Simplicité** : Développement et déploiement faciles
- ✅ **Performance** : Communication directe entre modules
- ✅ **Coût** : Hébergement économique
- ✅ **Maintenance** : Code centralisé et cohérent
- ✅ **Évolutivité** : Migration possible vers microservices

---

## 💻 Technologies

### Frontend
- **Framework** : React 18 + TypeScript
- **Styling** : Tailwind CSS + Headless UI
- **State Management** : React Query + Context API
- **Routing** : React Router v6
- **Forms** : React Hook Form + Validation
- **Charts** : Chart.js + React-ChartJS-2
- **Icons** : Heroicons
- **Notifications** : React Hot Toast

### Backend
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Database ORM** : Sequelize
- **Authentication** : JWT + bcrypt
- **Validation** : Express-validator
- **Security** : Helmet + CORS
- **Logging** : Morgan
- **File Upload** : Multer
- **Testing** : Jest + Supertest

### Base de Données
- **SGBD** : PostgreSQL 15+
- **Migrations** : Sequelize CLI
- **Backup** : Scripts automatisés
- **Monitoring** : Logs de performance

### DevOps & Tools
- **Version Control** : Git + GitHub
- **Package Manager** : npm
- **Linting** : ESLint + Prettier
- **Build** : Create React App
- **Environment** : dotenv

---

## 🌐 Hébergement

### Solutions Gratuites Recommandées

#### Frontend (React)
- **🥇 Vercel** : Déploiement automatique, CDN global, HTTPS
- **🥈 Netlify** : Interface simple, build automatique
- **🥉 GitHub Pages** : Basique mais gratuit

#### Backend + Database
- **🥇 Railway** : 500h/mois, PostgreSQL inclus, déploiement Git
- **🥈 Render** : 750h/mois, builds automatiques
- **🥉 Heroku** : Plan gratuit limité

#### Base de Données Séparée
- **Supabase** : 500MB gratuit + interface admin
- **ElephantSQL** : 20MB gratuit pour débuter

### Configuration Recommandée
```
Frontend: Vercel (React build automatique)
Backend + DB: Railway (solution tout-en-un)
Total: 100% gratuit pour commencer
```

---

## 📁 Structure du Projet

### Structure Globale
```
zapa/
├── 📁 backend/                 # API Node.js
├── 📁 frontend/                # Application React
├── 📁 database/                # Scripts SQL et migrations
├── 📁 docs/                    # Documentation
├── 📁 scripts/                 # Scripts utilitaires
├── 📄 package.json             # Scripts globaux
├── 📄 README.md                # Ce fichier
└── 📄 .gitignore              # Fichiers ignorés
```

### Structure Backend
```
backend/
├── 📁 config/                  # Configuration DB, JWT, etc.
├── 📁 controllers/             # Logique des routes
│   ├── authController.js
│   ├── memberController.js
│   ├── eventController.js
│   └── financeController.js
├── 📁 middleware/              # Authentification, validation
├── 📁 models/                  # Modèles Sequelize
│   ├── User.js
│   ├── Member.js
│   ├── Event.js
│   └── Transaction.js
├── 📁 routes/                  # Définition des endpoints
├── 📁 services/                # Logique métier
├── 📁 utils/                   # Helpers et utilitaires
├── 📄 server.js                # Point d'entrée
└── 📄 package.json             # Dépendances backend
```

### Structure Frontend
```
frontend/src/
├── 📁 components/              # Composants réutilisables
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── common/
├── 📁 pages/                   # Pages principales
│   ├── Dashboard.tsx
│   ├── Members.tsx
│   ├── Events.tsx
│   └── Finances.tsx
├── 📁 features/                # Modules par fonctionnalité
│   ├── 📁 auth/
│   ├── 📁 members/
│   ├── 📁 events/
│   └── 📁 finances/
├── 📁 hooks/                   # Custom React hooks
├── 📁 services/                # Appels API
├── 📁 utils/                   # Helpers
├── 📁 types/                   # Types TypeScript
├── 📄 App.tsx                  # Composant principal
└── 📄 index.tsx                # Point d'entrée
```

---

## ⚡ Installation

### Prérequis
- **Node.js** 18+ ([télécharger](https://nodejs.org/))
- **PostgreSQL** 15+ ([télécharger](https://postgresql.org/download/))
- **Git** ([télécharger](https://git-scm.com/))
- **Compte GitHub** ([créer un compte](https://github.com/))

### Configuration Git et GitHub

#### 1. Configuration Git Initiale
```bash
# Configurer votre identité Git (à faire une seule fois)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Vérifier la configuration
git config --list
```

#### 2. Initialiser le Projet Git
```bash
# Dans le dossier de votre projet zapa
cd zapa

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Setup ZAPA project structure"
```

#### 3. Créer le Repository GitHub
1. Aller sur [GitHub.com](https://github.com)
2. Cliquer sur **"New repository"** (bouton vert)
3. Nommer le repository : `zapa` (ou `zapa-association-app`)
4. **NE PAS** cocher "Initialize with README" (vous en avez déjà un)
5. Cliquer **"Create repository"**

#### 4. Connecter au Repository GitHub
```bash
# Ajouter l'origine GitHub (remplacer 'votre-username')
git remote add origin https://github.com/votre-username/zapa.git

# Vérifier la connexion
git remote -v

# Pousser le code vers GitHub
git branch -M main
git push -u origin main
```

### Installation Complète
```bash
# 1. Cloner le projet (si vous récupérez un projet existant)
git clone https://github.com/votre-username/zapa.git
cd zapa

# 2. Installer toutes les dépendances
npm run install-all

# 3. Configuration de la base de données
cd backend
cp .env.example .env
# Éditer .env avec vos paramètres DB

# 4. Créer la base de données
npm run db:create
npm run db:migrate
npm run db:seed

# 5. Démarrer en mode développement
cd ..
npm run dev
```

### Commandes Git Quotidiennes

#### Workflow de Développement Standard
```bash
# 1. Récupérer les derniers changements
git pull origin main

# 2. Voir l'état de vos fichiers
git status

# 3. Ajouter vos modifications
git add .                    # Ajouter tous les fichiers modifiés
# OU
git add frontend/            # Ajouter seulement le frontend
git add backend/             # Ajouter seulement le backend
git add fichier-specifique.js # Ajouter un fichier spécifique

# 4. Commiter vos changements
git commit -m "feat: description de vos changements"

# 5. Pousser vers GitHub
git push origin main
```

#### Types de Messages de Commit
```bash
git commit -m "feat: nouvelle fonctionnalité"          # Nouvelle fonctionnalité
git commit -m "fix: correction d'un bug"               # Correction de bug
git commit -m "docs: mise à jour documentation"        # Documentation
git commit -m "style: amélioration CSS/UI"             # Styles
git commit -m "refactor: refactoring du code"          # Refactoring
git commit -m "test: ajout de tests"                   # Tests
git commit -m "chore: mise à jour dépendances"         # Maintenance
```

#### Commandes Utiles
```bash
# Voir l'historique des commits
git log --oneline

# Voir les différences avant commit
git diff

# Annuler les modifications non commitées
git checkout -- .

# Voir les branches
git branch

# Créer une nouvelle branche
git checkout -b nouvelle-branche

# Changer de branche
git checkout main
```

### Scripts Disponibles
```bash
npm run dev          # Démarre frontend + backend
npm run server       # Backend uniquement
npm run client       # Frontend uniquement
npm run install-all  # Installe toutes les dépendances
npm run build        # Build de production
npm run test         # Lance les tests
```

---

## 🔧 Configuration

### Variables d'Environnement Backend (.env)
```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zapa_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Serveur
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Upload
MAX_FILE_SIZE=10MB
UPLOAD_PATH=./uploads
```

### Configuration Frontend
```typescript
// src/config/api.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const APP_NAME = 'ZAPA';
export const VERSION = '1.0.0';
```

---

## 🗄️ Base de Données

### Modèle de Données Principal

```sql
-- Utilisateurs et authentification
Users (id, email, password, role, created_at, updated_at)

-- Profils des membres
Members (id, user_id, first_name, last_name, phone, address, membership_date)

-- Événements
Events (id, title, description, date, location, max_participants, created_by)

-- Inscriptions aux événements
EventRegistrations (id, event_id, member_id, registration_date, status)

-- Transactions financières
Transactions (id, type, amount, description, category, date, created_by)

-- Budget et catégories
BudgetCategories (id, name, allocated_amount, spent_amount, year)
```

### Relations Principales
- `Users` 1:1 `Members`
- `Events` 1:N `EventRegistrations`
- `Members` 1:N `EventRegistrations`
- `Users` 1:N `Transactions`
- `BudgetCategories` 1:N `Transactions`

### Migrations et Seeders
```bash
# Créer une migration
npx sequelize-cli migration:generate --name create-users

# Exécuter les migrations
npm run db:migrate

# Créer des données de test
npm run db:seed
```

---

## 🎨 Interface Utilisateur

### Design System
- **Couleurs** : Palette moderne avec bleu primaire
- **Typographie** : Inter (Google Fonts)
- **Composants** : Headless UI + Tailwind
- **Icons** : Heroicons (outline + solid)
- **Responsive** : Mobile-first approach

### Pages Principales
1. **🏠 Dashboard** : Vue d'ensemble, métriques clés
2. **👥 Membres** : Liste, profils, gestion des adhésions
3. **📅 Événements** : Calendrier, création, inscriptions
4. **💰 Finances** : Budget, transactions, rapports
5. **⚙️ Paramètres** : Configuration, profil utilisateur

### Composants Réutilisables
- **Forms** : Validation en temps réel
- **Tables** : Tri, filtres, pagination
- **Modals** : Confirmations, formulaires
- **Charts** : Graphiques financiers interactifs
- **Notifications** : Toast messages, alertes

---

## 🔐 Sécurité

### Authentification
- **JWT Tokens** : Stateless, sécurisé
- **Refresh Tokens** : Renouvellement automatique
- **Password Hashing** : bcrypt avec salt
- **Rate Limiting** : Protection contre les attaques

### Autorisation
- **RBAC** : Role-Based Access Control
- **Middleware** : Vérification des permissions
- **Route Protection** : Frontend + Backend

### Validation
- **Input Sanitization** : Prévention XSS
- **Schema Validation** : Express-validator
- **File Upload** : Types et tailles contrôlés
- **CORS** : Configuration stricte

### Bonnes Pratiques
- **HTTPS** : Chiffrement en transit
- **Environment Variables** : Secrets sécurisés
- **SQL Injection** : ORM protection
- **Audit Logs** : Traçabilité des actions

---

## 📊 Roadmap

### Phase 1 : MVP (4-6 semaines)
- [x] ✅ Architecture et setup
- [ ] 🔄 Base de données et modèles
- [ ] 🔄 Authentification basique
- [ ] 🔄 CRUD membres
- [ ] 🔄 CRUD événements
- [ ] 🔄 Interface utilisateur de base

### Phase 2 : Fonctionnalités Avancées (4-6 semaines)
- [ ] 📋 Gestion financière complète
- [ ] 📊 Rapports et statistiques
- [ ] 📧 Système de notifications
- [ ] 🔍 Recherche et filtres avancés
- [ ] 📱 Optimisation mobile

### Phase 3 : Optimisations (2-4 semaines)
- [ ] ⚡ Performance et caching
- [ ] 🧪 Tests automatisés
- [ ] 🚀 Déploiement production
- [ ] 📖 Documentation utilisateur

### Phase 4 : Extensions (Futur)
- [ ] 📱 Application mobile
- [ ] 🔗 Intégrations (comptabilité, paiement)
- [ ] 🤖 Automatisations avancées
- [ ] 📈 Analytics et BI

---

## 📞 Support et Contribution

### Contact
- **Développeur** : Zakaria
- **Email** : contact@zapa.com
- **GitHub** : [github.com/zakaria/zapa](https://github.com/zakaria/zapa)

### Contribution
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changes (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

### Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 Remerciements

- **React Team** pour le framework
- **Tailwind CSS** pour le système de design
- **PostgreSQL** pour la robustesse de la base de données
- **Communauté Open Source** pour les outils utilisés

---

**💡 Prêt à révolutionner la gestion associative avec ZAPA !**

*Dernière mise à jour : Septembre 2025*
