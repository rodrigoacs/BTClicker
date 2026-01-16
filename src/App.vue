<template>
  <div id="app-container">

    <OfflineModal />

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
        <span class="label">{{ gameStore.texts.app.nav.home }}</span>
      </RouterLink>

      <RouterLink
        to="/generators"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">🏭</span>
        <span class="label">{{ gameStore.texts.app.nav.generators }}</span>
      </RouterLink>

      <RouterLink
        to="/upgrades"
        class="tab-button"
        active-class="active"
      >
        <span class="icon">⚡</span>
        <span class="label">{{ gameStore.texts.app.nav.upgrades }}</span>
      </RouterLink>

      <RouterLink
        to="/settings"
        class="tab-button"
        active-class="active"
        :class="{ 'save-active': isSaving }"
      >
        <span class="icon">
          {{ isSaving ? '💾' : '⚙️' }}
        </span>
        <span class="label">
          {{ isSaving ? (gameStore.language === 'en-US' ? 'Saved!' : 'Salvo!') : gameStore.texts.app.nav.settings }}
        </span>
      </RouterLink>
    </footer>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useGameStore } from './stores/gameStore'
import { storeToRefs } from 'pinia'
import OfflineModal from '@/components/OfflineModal.vue'

const gameStore = useGameStore()
const { autoSaveEnabled, autoSaveInterval, theme, isSaving } = storeToRefs(gameStore)

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

watch(theme, (newTheme) => {
  document.body.classList.remove('theme-light', 'theme-dark', 'theme-bitcoin')
  document.body.classList.add(`theme-${newTheme || 'light'}`)
}, { immediate: true })

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
body.theme-light {
  --bg-color: #f5f7fa;
  --text-color: #333333;
  --card-bg: #ffffff;
  --header-bg: rgba(255, 255, 255, 0.9);
  --nav-bg: rgba(255, 255, 255, 0.95);
  --accent-color: #ff9900;
  --border-color: rgba(0, 0, 0, 0.05);
  --input-bg: rgba(0, 0, 0, 0.05);
  --success-color: #28a745;
}

body.theme-dark {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --card-bg: #1e1e1e;
  --header-bg: rgba(30, 30, 30, 0.9);
  --nav-bg: rgba(30, 30, 30, 0.95);
  --accent-color: #ff9900;
  --border-color: rgba(255, 255, 255, 0.1);
  --input-bg: rgba(255, 255, 255, 0.1);
  --success-color: #2ea043;
}

body.theme-bitcoin {
  --bg-color: #000000;
  --text-color: #ffb700;
  --card-bg: #1a1a1a;
  --header-bg: rgba(10, 10, 10, 0.9);
  --nav-bg: rgba(10, 10, 10, 0.95);
  --accent-color: #ff9900;
  --border-color: #333;
  --input-bg: #222;
  --success-color: #00e676;
}

* {
  user-select: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
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
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  z-index: 20;
  transition: background-color 0.3s;
}

.brand-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ffb700, #ff9900);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.app-header h1 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-color);
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
  background-color: var(--nav-bg);
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.03);
  z-index: 20;
  padding-bottom: env(safe-area-inset-bottom);
  transition: background-color 0.3s;
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
  color: var(--accent-color);
}

.tab-button.active .icon {
  filter: grayscale(0%);
  opacity: 1;
  transform: translateY(-2px);
}

.tab-button:active {
  transform: scale(0.95);
}

.tab-button.save-active {
  color: var(--success-color) !important;
}

.tab-button.save-active .icon {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.1);
  animation: pulseSave 0.5s ease-in-out infinite alternate;
}

@keyframes pulseSave {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.15);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.upgrade-card,
.generator-card,
.settings-card {
  background-color: var(--card-bg) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}
</style>
