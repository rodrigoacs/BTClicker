<template>
  <div
    class="modal-overlay"
    v-if="gameStore.offlineEarnings > 0"
  >
    <div class="modal-content">
      <div class="modal-icon">🌙</div>
      <h2>{{ gameStore.texts.offline.title }}</h2>

      <p>{{ gameStore.texts.offline.message }}</p>

      <div class="earnings-box">
        <span class="plus">+</span>
        <span class="symbol">₿</span>
        <span class="amount">{{ formatNumber(gameStore.offlineEarnings) }}</span>
      </div>

      <button
        @click="gameStore.clearOfflineEarnings"
        class="collect-btn"
      >
        {{ gameStore.texts.offline.collect_btn }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import { formatNumber } from '@/utils/formatNumber'

const gameStore = useGameStore()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--card-bg);
  color: var(--text-color);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 90%;
  max-width: 320px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

h2 {
  margin: 0 0 10px 0;
  color: var(--accent-color);
}

p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 20px;
}

.earnings-box {
  background: var(--input-bg);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-weight: 800;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.symbol {
  color: #ff9900;
}

.plus {
  color: #28a745;
}

.collect-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: transform 0.1s;
}

.collect-btn:active {
  transform: scale(0.95);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1);
  }
}
</style>
