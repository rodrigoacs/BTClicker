<template>
  <div class="tab-view">
    <h2>Geradores</h2>
    <p class="tab-description">Compre equipamentos para minerar Bitcoins automaticamente!</p>
    <ul>
      <li
        v-for="generator in gameStore.generators"
        :key="generator.id"
        class="item-card"
      >
        <div class="item-info">
          <strong>{{ generator.name }}</strong> ({{ generator.owned }})
          <small>{{ generator.description }}</small>
        </div>
        <button
          @click="gameStore.buyItem('generator', generator.id)"
          :disabled="gameStore.totalBitcoins < generator.cost"
          class="buy-button"
        >
          Comprar ({{ formatNumber(generator.cost) }})
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function formatNumber(num) {
  return Math.ceil(num).toLocaleString('pt-BR')
}
</script>

<style scoped>
.tab-view {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 10px;
  overflow-y: auto;
}

.tab-view h2 {
  text-align: center;
  color: #ff9900;
  margin-bottom: 10px;
}

.tab-description {
  text-align: center;
  color: #777;
  margin-bottom: 20px;
  font-size: 0.9em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fcfcfc;
}

.item-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-info {
  margin-bottom: 10px;
}

.item-info strong {
  display: block;
  font-size: 1.1em;
  color: #333;
}

.item-info small {
  color: #666;
  font-size: 0.9em;
}

.buy-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  align-self: flex-end;
  width: 100%;
}

.buy-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>