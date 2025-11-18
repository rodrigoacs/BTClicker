<template>
  <div class="clicker-area">
    <button
      @click="handleClick"
      class="bitcoin-button"
    >
      <span class="bitcoin-icon">₿</span>
    </button>
    <div class="click-power">Poder do Clique: {{ gameStore.clickPower }}</div>

    <div
      v-for="popup in popups"
      :key="popup.id"
      class="click-popup"
      :style="{ left: popup.x + 'px', top: popup.y + 'px' }"
    >
      +{{ popup.amount }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const popups = ref([])
let popupIdCounter = 0

let batchTimer = null
let batchAmount = 0
let batchX = 0
let batchY = 0

const BATCH_WINDOW_MS = 100

function handleClick(event) {
  gameStore.clickBitcoin()

  const clickPowerAmount = gameStore.clickPower

  batchAmount += clickPowerAmount

  if (batchTimer) {
    return
  }

  const areaRect = event.currentTarget.parentElement.getBoundingClientRect()
  const clickX = event.clientX
  const clickY = event.clientY
  batchX = clickX - areaRect.left
  batchY = clickY - areaRect.top

  batchTimer = setTimeout(() => {
    const newPopup = {
      id: popupIdCounter++,
      amount: batchAmount,
      x: batchX,
      y: batchY
    }
    popups.value.push(newPopup)

    setTimeout(() => {
      popups.value = popups.value.filter(p => p.id !== newPopup.id)
    }, 10000)

    batchTimer = null
    batchAmount = 0

  }, BATCH_WINDOW_MS)
}
</script>

<style scoped>
.clicker-area {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 300px;
  overflow: hidden;
}

.bitcoin-button {
  background: #ff9900;
  border: none;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  user-select: none;
  z-index: 10;
}

.bitcoin-button:active {
  transform: scale(0.95);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.bitcoin-icon {
  font-size: 150px;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.click-power {
  margin-top: 20px;
  font-size: 1.2em;
  color: #333;
}

.click-popup {
  position: absolute;
  color: #ffffff;
  font-size: 1.5em;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  animation: floatUpFadeOut 1s ease-out forwards;
  z-index: 20;
  pointer-events: none;
  transform: translateX(-50%);
}

@keyframes floatUpFadeOut {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  70% {
    opacity: 1;
    transform: translate(-50%, -50px);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -80px);
  }
}
</style>
