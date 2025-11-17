<template>
  <header class="app-header">
    <h1>Bitcoin Clicker ({{ formatNumber(totalBitcoins) }})</h1>
  </header>

  <main class="content-area">
    <RouterView />
  </main>

  <footer class="tab-navigation">
    <RouterLink
      to="/"
      class="tab-button"
      active-class="active"
    >
      Inicio
    </RouterLink>
    <RouterLink
      to="/generators"
      class="tab-button"
      active-class="active"
    >
      Geradores
    </RouterLink>
    <RouterLink
      to="/upgrades"
      class="tab-button"
      active-class="active"
    >
      Upgrades
    </RouterLink>
    <RouterLink
      to="/settings"
      class="tab-button"
      active-class="active"
    >
      Ajustes
    </RouterLink>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useGameStore } from './stores/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { totalBitcoins } = storeToRefs(gameStore)
let gameLoop = null

onMounted(() => {
  gameStore.resetLastTick()
  gameLoop = setInterval(gameStore.gameTick, 100)
})

onUnmounted(() => {
  clearInterval(gameLoop)
})

function formatNumber(num) {
  if (num >= 1000000000000000) return (num / 1000000000000000).toFixed(2) + 'Q'
  if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + 'T'
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
  return Math.floor(num).toLocaleString('pt-BR')
}
</script>

<style>
* {
  user-select: none;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  text-align: center;
  padding: 15px;
  background-color: #ff9900;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.content-area {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

.tab-navigation {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #333;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

.tab-button {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s ease;
  border-right: 1px solid #555;
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background-color: #555;
}

.tab-button.active {
  background-color: #ff9900;
  color: white;
}
</style>