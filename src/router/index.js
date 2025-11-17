import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import UpgradesView from '../views/UpgradesView.vue'
import GeneratorsView from '../views/GeneratorsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameView
    },
    {
      path: '/upgrades',
      name: 'upgrades',
      component: UpgradesView
    },
    {
      path: '/generators',
      name: 'generators',
      component: GeneratorsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router