<template>
  <div class="shop-view">
    <div class="shop-header">
      <h2>Geradores</h2>
      <div class="balance-badge">
        <span class="symbol">₿</span>
        <span>{{ formatShort(gameStore.totalBitcoins) }}</span>
      </div>
    </div>

    <p class="shop-subtitle">Construa seu império de mineração automática.</p>

    <div class="cards-container">
      <div
        v-for="generator in gameStore.generators"
        :key="generator.id"
        class="generator-card"
        :class="{ 'disabled': gameStore.totalBitcoins < generator.cost }"
      >

        <div class="card-icon">
          {{ getIcon(generator.name) }}
        </div>

        <div class="card-details">
          <span class="item-name">{{ generator.name }}</span>

          <div class="production-badge">
            ⚡ +{{ formatShort(generator.value) }}/s
          </div>

          <p class="item-desc">{{ generator.description }}</p>
        </div>

        <div class="card-actions">
          <span class="item-level">Qtd: {{ generator.owned }}</span>

          <button
            @click="gameStore.buyItem('generator', generator.id)"
            :disabled="gameStore.totalBitcoins < generator.cost"
            class="buy-btn"
          >
            <span class="cost-label">Preço</span>
            <span class="cost-value">₿ {{ formatShort(generator.cost) }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function formatShort(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k'
  return Math.ceil(num).toLocaleString('pt-BR')
}

function getIcon(name) {
  const n = name.toLowerCase()
  if (n.includes('estudante')) return '👨‍💻'
  if (n.includes('vídeo') || n.includes('gpu')) return '📼'
  if (n.includes('fazenda')) return '🏭'
  if (n.includes('asic')) return '📟'
  if (n.includes('cluster') || n.includes('servidor')) return '🖥️'
  if (n.includes('data center')) return '🏢'
  if (n.includes('botnet')) return '🌐'
  if (n.includes('usina') || n.includes('geotérmica')) return '🌋'
  if (n.includes('satélite')) return '🛰️'
  if (n.includes('matriz') || n.includes('virtual')) return '🕶️'
  return '⚙️'
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

.generator-card {
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

.generator-card.disabled {
  opacity: 0.6;
  background: #f9f9f9;
}

.generator-card.disabled .card-icon {
  filter: grayscale(100%);
  opacity: 0.5;
}

.card-icon {
  width: 50px;
  height: 50px;
  background-color: #e0e7ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
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
  margin-bottom: 2px;
}

.production-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  color: #4f46e5;
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
  background-color: #4f46e5;
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