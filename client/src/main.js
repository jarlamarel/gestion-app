import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import views
import Dashboard from './views/Dashboard.vue'
import Members from './views/Members.vue'
import Events from './views/Events.vue'
import Activities from './views/Activities.vue'
import Finances from './views/Finances.vue'
import Login from './views/Login.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/members', component: Members, meta: { requiresAuth: true } },
  { path: '/events', component: Events, meta: { requiresAuth: true } },
  { path: '/activities', component: Activities, meta: { requiresAuth: true } },
  { path: '/finances', component: Finances, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')