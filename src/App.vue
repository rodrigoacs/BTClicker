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
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useGameStore } from './stores/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { totalBitcoins, autoSaveEnabled, autoSaveInterval } = storeToRefs(gameStore)

let gameLoop = null
let autoSaveLoop = null

function startAutoSave() {
  if (autoSaveLoop) clearInterval(autoSaveLoop)

  if (!autoSaveEnabled.value) {
    console.log("Auto Save desativado.")
    return
  }

  console.log(`Auto Save iniciado: a cada ${autoSaveInterval.value / 1000}s`)

  autoSaveLoop = setInterval(() => {
    gameStore.saveGame()
  }, autoSaveInterval.value)
}

onMounted(() => {
  gameStore.loadGame()

  // gameStore.resetLastTick()
  gameLoop = setInterval(gameStore.gameTick, 100)

  startAutoSave()
})

watch([autoSaveEnabled, autoSaveInterval], () => {
  startAutoSave()
})

onUnmounted(() => {
  clearInterval(gameLoop)
  clearInterval(autoSaveLoop)
  gameStore.saveGame()
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
  box-sizing: border-box; /* Importante para o padding não estourar a largura */
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
  /* Removemos o overflow hidden do body para garantir que o #app controle tudo */
}

#app {
  display: flex;
  flex-direction: column;
  
  /* --- A CORREÇÃO ESTÁ AQUI --- */
  height: 100vh; /* Fixa a altura na altura da tela (Viewport Height) */
  overflow: hidden; /* Impede que a tela inteira role */
  /* ---------------------------- */
}

.app-header {
  /* Flex-shrink 0 impede que o header seja esmagado se faltar espaço */
  flex-shrink: 0; 
  text-align: center;
  padding: 15px;
  background-color: #ff9900;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Garante que a sombra fique sobre o conteúdo */
}

.content-area {
  flex-grow: 1;
  padding: 10px;
  
  /* --- AQUI É ONDE O SCROLL ACONTECE --- */
  overflow-y: auto; 
  /* Suaviza a rolagem no iOS */
  -webkit-overflow-scrolling: touch; 
}

.tab-navigation {
  flex-shrink: 0; /* Impede que o rodapé seja esmagado ou suma */
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #333;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
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