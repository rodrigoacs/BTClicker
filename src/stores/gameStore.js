import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import upgradesData from '@/data/upgrades.json'
import generatorsData from '@/data/generators.json'

export const useGameStore = defineStore('game', () => {
  const autoSaveEnabled = ref(true)
  const autoSaveInterval = ref(30000)
  const volume = ref(50)

  const lastTickTime = ref(Date.now())
  const totalBitcoins = ref(0)

  const upgrades = ref(JSON.parse(JSON.stringify(upgradesData)))
  const generators = ref(JSON.parse(JSON.stringify(generatorsData)))

  const clickPower = computed(() => {
    let power = 1
    const clickUpgrades = upgrades.value.filter(up => up.type === 'click')
    clickUpgrades.forEach(up => {
      power += up.value * up.owned
    })
    return power
  })

  const btcPerSecond = computed(() => {
    let rawPower = 0
    const autoGenerators = generators.value.filter(gen => gen.type === 'auto')
    autoGenerators.forEach(gen => {
      rawPower += gen.value * gen.owned
    })

    let totalMultiplier = 1
    const multiplierUpgrades = upgrades.value.filter(up => up.type === 'multiplier')
    multiplierUpgrades.forEach(up => {
      totalMultiplier += up.value * up.owned
    })

    return rawPower * totalMultiplier
  })

  function clickBitcoin() {
    totalBitcoins.value += clickPower.value
  }

  function buyItem(itemType, itemId) {
    let itemArray
    if (itemType === 'upgrade') {
      itemArray = upgrades.value
    } else if (itemType === 'generator') {
      itemArray = generators.value
    } else {
      console.error("Tipo inválido:", itemType)
      return
    }

    const item = itemArray.find(it => it.id === itemId)

    if (!item) {
      console.error("Item não encontrado:", itemId)
      return
    }

    if (totalBitcoins.value >= item.cost) {
      totalBitcoins.value -= item.cost
      item.owned++
      item.cost = Math.ceil(item.baseCost * Math.pow(1.15, item.owned))
    } else {
      console.log("Bitcoins insuficientes")
    }
  }

  function resetLastTick() {
    lastTickTime.value = Date.now()
  }

  function gameTick() {
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTickTime.value
    if (deltaTime > 0) {
      const btcPerMillisecond = btcPerSecond.value / 1000
      totalBitcoins.value += btcPerMillisecond * deltaTime
    }
    lastTickTime.value = currentTime
  }

  function saveGame() {
    const gameState = {
      totalBitcoins: totalBitcoins.value,
      lastTickTime: lastTickTime.value,
      upgrades: upgrades.value.map(u => ({ id: u.id, owned: u.owned, cost: u.cost })),
      generators: generators.value.map(g => ({ id: g.id, owned: g.owned, cost: g.cost })),
      settings: {
        autoSaveEnabled: autoSaveEnabled.value,
        autoSaveInterval: autoSaveInterval.value,
        volume: volume.value
      }
    }
    localStorage.setItem('bitcoin-clicker-save', JSON.stringify(gameState))
    console.log('Jogo salvo!')
  }

  function loadGame() {
    const savedString = localStorage.getItem('bitcoin-clicker-save')

    if (!savedString) return

    const savedState = JSON.parse(savedString)

    totalBitcoins.value = savedState.totalBitcoins || 0
    lastTickTime.value = savedState.lastTickTime || Date.now()

    if (savedState.upgrades) {
      savedState.upgrades.forEach(savedItem => {
        const realItem = upgrades.value.find(u => u.id === savedItem.id)
        if (realItem) {
          realItem.owned = savedItem.owned
          realItem.cost = savedItem.cost
        }
      })
    }

    if (savedState.generators) {
      savedState.generators.forEach(savedItem => {
        const realItem = generators.value.find(g => g.id === savedItem.id)
        if (realItem) {
          realItem.owned = savedItem.owned
          realItem.cost = savedItem.cost
        }
      })
    }

    if (savedState.settings) {
      autoSaveEnabled.value = savedState.settings.autoSaveEnabled ?? true
      autoSaveInterval.value = savedState.settings.autoSaveInterval || 30000
      volume.value = savedState.settings.volume || 50
    }
  }

  function resetGame() {
    localStorage.removeItem('bitcoin-clicker-save')
    location.reload()
  }

  return {
    totalBitcoins,
    upgrades,
    generators,
    lastTickTime,
    autoSaveEnabled,
    autoSaveInterval,
    volume,
    clickPower,
    btcPerSecond,
    clickBitcoin,
    buyItem,
    gameTick,
    resetLastTick,
    saveGame,
    loadGame,
    resetGame
  }
})