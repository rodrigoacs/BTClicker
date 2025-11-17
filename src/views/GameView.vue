<template>
  <div class="game-view">
    <div class="status-bar">
      <h2>{{ formatNumber(gameStore.totalBitcoins) }} ₿</h2>
      <h4>{{ formatNumber(gameStore.btcPerSecond) }} ₿/s</h4>
    </div>

    <div class="clicker-section">
      <BitcoinClicker />
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import BitcoinClicker from '@/components/BitcoinClicker.vue'

const gameStore = useGameStore()

function formatNumber(num) {
  if (num >= 1000000000000000) return (num / 1000000000000000).toFixed(2) + 'Q'
  if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + 'T'
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
  return Math.floor(num).toLocaleString('pt-BR')
}
</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.status-bar {
  text-align: center;
  padding: 20px;
  background: white;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
}

.status-bar h2 {
  margin: 0;
  color: #ff9900;
  font-size: 2.5em;
}

.status-bar h4 {
  margin: 5px 0 0;
  font-weight: normal;
  color: #555;
  font-size: 1.2em;
}

.clicker-section {
  padding: 10px;
  margin-top: 20px;
}
</style>