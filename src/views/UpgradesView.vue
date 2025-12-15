<template>
  <div class="shop-view">
    <div class="shop-header">
      <h2>Upgrades</h2>
      <div class="balance-badge">
        <span class="symbol">₿</span>
        <span>{{ formatShort(gameStore.totalBitcoins) }}</span>
      </div>
    </div>

    <p class="shop-subtitle">Potencialize seus cliques e multiplicadores.</p>

    <div class="cards-container">
      <div
        v-for="upgrade in filteredUpgrades"
        :key="upgrade.id"
        class="upgrade-card"
        :class="{ 'disabled': gameStore.totalBitcoins < upgrade.cost }"
      >

        <div
          class="card-icon"
          :class="upgrade.type"
        >
          {{ getIcon(upgrade) }}
        </div>

        <div class="card-details">
          <span class="item-name">{{ upgrade.name }}</span>
          <p class="item-desc">{{ upgrade.description }}</p>
        </div>

        <div class="card-actions">
          <span class="item-level">Lvl {{ upgrade.owned }}</span>

          <button
            @click="gameStore.buyItem('upgrade', upgrade.id)"
            :disabled="gameStore.totalBitcoins < upgrade.cost"
            class="buy-btn"
          >
            <span class="cost-label">Preço</span>
            <span class="cost-value">₿ {{ formatShort(upgrade.cost) }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const filteredUpgrades = computed(() => {
  return gameStore.upgrades.filter(up => up.category === 'click' || up.category === 'multiplier')
})

function formatShort(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k'
  return Math.ceil(num).toLocaleString('pt-BR')
}

function getIcon(item) {
  const name = item.name.toLowerCase()
  if (name.includes('mouse')) return '🖱️'
  if (name.includes('teclado')) return '⌨️'
  if (name.includes('dedo')) return '👆'
  if (name.includes('hash')) return '#️⃣'
  if (name.includes('otimização') || name.includes('hardware')) return '🔧'
  if (name.includes('script')) return '📜'
  if (name.includes('refrigeração')) return '❄️'
  if (name.includes('ia')) return '🤖'
  if (name.includes('quântica')) return '⚛️'
  if (item.type === 'multiplier') return '⚡'
  return '🔼'
}
</script>

<style scoped>
.shop-view {
  padding: 20px 15px;
  padding-bottom: 80px;
}

.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.shop-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 800;
}

.balance-badge {
  background-color: #fff;
  padding: 5px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.balance-badge .symbol {
  color: #ff9900;
}

.shop-subtitle {
  color: #888;
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.upgrade-card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: transform 0.1s, opacity 0.2s;
}

.upgrade-card.disabled {
  opacity: 0.6;
  background: #f9f9f9;
}

.upgrade-card.disabled .card-icon {
  filter: grayscale(100%);
  opacity: 0.5;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.card-icon.click {
  background-color: #fff3cd;
}

.card-icon.multiplier {
  background-color: #e2e3ff;
}

.card-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.item-name {
  font-weight: 700;
  color: #333;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.item-desc {
  margin: 0;
  font-size: 0.8rem;
  color: #777;
  line-height: 1.2;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 80px;
}

.item-level {
  font-size: 0.75rem;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.buy-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.buy-btn:active {
  transform: scale(0.95);
}

.buy-btn:disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  transform: none;
}

.cost-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 2px;
}

.cost-value {
  font-weight: 800;
  font-size: 0.9rem;
}
</style>