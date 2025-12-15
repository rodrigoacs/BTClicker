<template>
  <div id="app-container">
    <main class="content-area">
      <RouterView v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="tab-navigation">
      <RouterLink
        to="/"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">⛏️</span>
        <span class="label">Início</span>
      </RouterLink>

      <RouterLink
        to="/generators"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">🏭</span>
        <span class="label">Geradores</span>
      </RouterLink>

      <RouterLink
        to="/upgrades"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">⚡</span>
        <span class="label">Upgrades</span>
      </RouterLink>

      <RouterLink
        to="/settings"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">⚙️</span>
        <span class="label">Ajustes</span>
      </RouterLink>
    </footer>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useGameStore } from './stores/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { autoSaveEnabled, autoSaveInterval } = storeToRefs(gameStore)

let gameLoop = null
let autoSaveLoop = null

function startAutoSave() {
  if (autoSaveLoop) clearInterval(autoSaveLoop)
  if (!autoSaveEnabled.value) return

  autoSaveLoop = setInterval(() => {
    gameStore.saveGame()
  }, autoSaveInterval.value)
}

onMounted(() => {
  gameStore.loadGame()
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
</script>

<style>
* {
  user-select: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  color: #333;
}

#app,
#app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-header {
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  z-index: 20;
}

.brand-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ffb700, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.app-header h1 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: #444;
  letter-spacing: -0.5px;
}

.content-area {
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.tab-navigation {
  flex-shrink: 0;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.03);
  z-index: 20;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #999;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: transparent;
  border: none;
  height: 100%;
}

.tab-button .icon {
  font-size: 1.4rem;
  margin-bottom: 2px;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: transform 0.2s;
}

.tab-button .label {
  font-size: 0.7rem;
  font-weight: 600;
}

.tab-button.active {
  color: #ff9900;
}

.tab-button.active .icon {
  filter: grayscale(0%);
  opacity: 1;
  transform: translateY(-2px);
}

.tab-button:active {
  transform: scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>