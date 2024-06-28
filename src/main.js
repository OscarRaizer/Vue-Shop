import './assets/main.css'
import HomePage from './pages/HomePage.vue'
import FavouritesPage from './pages/FavouritesPage.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/favourites', name: 'favourites', component: FavouritesPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)

app.use(router)

app.mount('#app')
