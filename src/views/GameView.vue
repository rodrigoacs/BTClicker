<template>
  <div class="game-view">
    <div class="background-decoration"></div>

    <div class="status-panel">
      <div class="btc-amount">
        <span class="btc-symbol">₿</span>
        <span>{{ formatNumber(gameStore.totalBitcoins) }}</span>
      </div>
      <div class="btc-rate">
        {{ formatNumber(gameStore.btcPerSecond) }} {{ gameStore.texts.home.per_second }}
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
import { formatNumber } from '@/utils/formatNumber'

const gameStore = useGameStore()
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
  background: transparent;
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
  background: var(--header-bg);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  min-width: 250px;
  transition: background-color 0.3s, border-color 0.3s;
}

.btc-amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-color);
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
  color: var(--text-color);
  opacity: 0.7;
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
