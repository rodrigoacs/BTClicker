<template>
  <div class="clicker-area">

    <button
      @click="handleClick"
      class="bitcoin-coin"
    >
      <div class="coin-face">
        <div class="coin-inner-ring">
          <span class="currency-symbol">₿</span>
        </div>
      </div>
    </button>

    <div class="click-power-badge">
      ⚡ {{ gameStore.clickPower }} {{ gameStore.texts.home.power_badge }}
    </div>

    <div
      v-for="popup in popups"
      :key="popup.id"
      class="click-popup"
      :style="{ left: popup.x + 'px', top: popup.y + 'px' }"
    >
      +{{ formatNumber(popup.amount) }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNumber } from '@/utils/formatNumber'

const gameStore = useGameStore()

const popups = ref([])
let popupIdCounter = 0

let batchTimer = null
let batchAmount = 0
let batchX = 0
let batchY = 0
const BATCH_WINDOW_MS = 80

function handleClick(event) {
  gameStore.clickBitcoin()

  if (navigator.vibrate) navigator.vibrate(5)

  const clickPowerAmount = gameStore.clickPower
  batchAmount += clickPowerAmount

  if (batchTimer) return

  const areaRect = event.currentTarget.parentElement.getBoundingClientRect()
  batchX = event.clientX - areaRect.left
  batchY = event.clientY - areaRect.top

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
    }, 800)

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
  justify-content: center;
  width: 100%;
}

.bitcoin-coin {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: floatIdle 3s ease-in-out infinite;
}

.bitcoin-coin:active {
  transform: scale(0.92) !important;
  animation: none;
}

.coin-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffb700 0%, #ff9900 100%);
  border: 8px solid #e68a00;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 5px 10px rgba(255, 255, 255, 0.4), inset 0 -5px 10px rgba(0, 0, 0, 0.1);
}

.coin-inner-ring {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 4px dashed rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.currency-symbol {
  font-size: 140px;
  color: white;
  font-weight: bold;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  user-select: none;
}

.click-power-badge {
  margin-top: 30px;
  background-color: var(--header-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  pointer-events: none;
  transition: background-color 0.3s, color 0.3s;
}

.click-popup {
  position: absolute;
  color: var(--accent-color);
  font-size: 2rem;
  font-weight: 900;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
  transform: translateX(-50%);
  animation: popUpFloat 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes floatIdle {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes popUpFloat {
  0% {
    opacity: 0;
    transform: translate(-50%, 10px) scale(0.5);
  }

  20% {
    opacity: 1;
    transform: translate(-50%, -20px) scale(1.2);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -100px) scale(1);
  }
}
</style>
