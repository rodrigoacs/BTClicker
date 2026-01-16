import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import upgradesData from '@/data/upgrades.json'
import generatorsData from '@/data/generators.json'
import locales from '@/data/locales.js'

import sound1 from '@/public/sound1.wav'
import sound2 from '@/public/sound2.wav'
import sound3 from '@/public/sound3.wav'
import sound4 from '@/public/sound4.wav'
import sound5 from '@/public/sound5.wav'

export const useGameStore = defineStore('game', () => {
  const autoSaveEnabled = ref(true)
  const autoSaveInterval = ref(30000)
  const volume = ref(50)
  const language = ref('pt-BR')
  const theme = ref('light')

  const lastTickTime = ref(Date.now())
  const totalBitcoins = ref(0)
  const isSaving = ref(false)
  const offlineEarnings = ref(0)

  const upgrades = ref(JSON.parse(JSON.stringify(upgradesData)))
  const generators = ref(JSON.parse(JSON.stringify(generatorsData)))

  const soundEffects = [
    new Audio(sound1), new Audio(sound2), new Audio(sound3), new Audio(sound4), new Audio(sound5)
  ]

  function playClickSound() {
    if (volume.value > 0) {
      const randomIndex = Math.floor(Math.random() * soundEffects.length)
      const audioToPlay = soundEffects[randomIndex]
      audioToPlay.volume = volume.value / 100
      audioToPlay.currentTime = 0
      audioToPlay.play().catch(e => { if (e.name !== 'NotAllowedError') console.warn(e) })
    }
  }

  const texts = computed(() => {
    return locales[language.value] || locales['pt-BR']
  })

  const translatedGenerators = computed(() => {
    return generators.value.map(gen => {
      const translation = texts.value.items[gen.id]
      return {
        ...gen,
        name: translation ? translation.name : gen.name,
        description: translation ? translation.desc : gen.description
      }
    })
  })

  const translatedUpgrades = computed(() => {
    return upgrades.value.map(up => {
      const translation = texts.value.items[up.id]
      return {
        ...up,
        name: translation ? translation.name : up.name,
        description: translation ? translation.desc : up.description
      }
    })
  })

  const clickPower = computed(() => {
    let power = 1
    const clickUpgrades = upgrades.value.filter(up => up.type === 'click')
    clickUpgrades.forEach(up => { power += up.value * up.owned })
    return power
  })

  const btcPerSecond = computed(() => {
    let rawPower = 0
    const autoGenerators = generators.value.filter(gen => gen.type === 'auto')
    autoGenerators.forEach(gen => { rawPower += gen.value * gen.owned })

    let totalMultiplier = 1
    const multiplierUpgrades = upgrades.value.filter(up => up.type === 'multiplier')
    multiplierUpgrades.forEach(up => { totalMultiplier += up.value * up.owned })

    return rawPower * totalMultiplier
  })

  function clickBitcoin() {
    totalBitcoins.value += clickPower.value
    playClickSound()
  }

  function buyItem(itemType, itemId) {
    let itemArray = (itemType === 'upgrade') ? upgrades.value : generators.value
    const item = itemArray.find(it => it.id === itemId)

    if (item && totalBitcoins.value >= item.cost) {
      totalBitcoins.value -= item.cost
      item.owned++
      item.cost = Math.ceil(item.baseCost * Math.pow(1.15, item.owned))
      playClickSound()
    }
  }

  function resetLastTick() { lastTickTime.value = Date.now() }

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
        volume: volume.value,
        language: language.value,
        theme: theme.value
      }
    }
    localStorage.setItem('bitcoin-clicker-save', JSON.stringify(gameState))
    console.log('Jogo salvo!')
    isSaving.value = true
    setTimeout(() => { isSaving.value = false }, 2000)
  }

  function loadGame() {
    const savedString = localStorage.getItem('bitcoin-clicker-save')
    if (!savedString) return

    const savedState = JSON.parse(savedString)
    totalBitcoins.value = savedState.totalBitcoins || 0

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

    const lastTime = savedState.lastTickTime || Date.now()
    const now = Date.now()
    const secondsPassed = (now - lastTime) / 1000

    if (secondsPassed > 10) {
      const potentialEarnings = btcPerSecond.value * secondsPassed
      if (potentialEarnings > 0) {
        totalBitcoins.value += potentialEarnings
        offlineEarnings.value = potentialEarnings
      }
    }

    lastTickTime.value = now

    if (savedState.settings) {
      autoSaveEnabled.value = savedState.settings.autoSaveEnabled ?? true
      autoSaveInterval.value = savedState.settings.autoSaveInterval || 30000
      volume.value = savedState.settings.volume ?? 50
      language.value = savedState.settings.language || 'pt-BR'
      theme.value = savedState.settings.theme || 'light'
    }
  }

  function clearOfflineEarnings() {
    offlineEarnings.value = 0
  }

  function resetGame() {
    localStorage.removeItem('bitcoin-clicker-save')
    location.reload()
  }

  return {
    totalBitcoins, upgrades, generators, lastTickTime, autoSaveEnabled, autoSaveInterval, volume, language, theme,
    isSaving, offlineEarnings,
    clickPower, btcPerSecond, texts, translatedGenerators, translatedUpgrades,
    clickBitcoin, buyItem, gameTick, resetLastTick, saveGame, loadGame, resetGame, clearOfflineEarnings
  }
})
