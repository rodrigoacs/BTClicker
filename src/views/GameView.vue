<template>
  <div class="game-view">
    <div class="background-decoration"></div>

    <div class="status-panel">
      <div class="btc-amount">
        <span class="btc-symbol">₿</span>
        <span>{{ formatNumber(gameStore.totalBitcoins) }}</span>
      </div>
      <div class="btc-rate">
        {{ formatNumber(gameStore.btcPerSecond) }} por segundo
      </div>
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
  if (num >= 1_000_000_000_000_000) return (num / 1_000_000_000_000_000).toFixed(2) + 'Q'
  if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + 'T'
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K'
  return Math.floor(num).toLocaleString('pt-BR')
}
</script>

<style scoped>
.game-view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.background-decoration {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 153, 0, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.status-panel {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  min-width: 250px;
}

.btc-amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2.8rem;
  font-weight: 800;
  color: #333;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.btc-symbol {
  color: #ff9900;
  font-size: 2.8rem;
}

.btc-rate {
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.clicker-section {
  position: relative;
  z-index: 5;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>