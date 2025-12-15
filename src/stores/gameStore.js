import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  // ----------------
  // 1. NOVAS CONFIGURAÇÕES (O erro acontece porque isso falta)
  // ----------------
  const autoSaveEnabled = ref(true)
  const autoSaveInterval = ref(30000) // 30 segundos
  const volume = ref(50)

  // ----------------
  // 2. ESTADOS DO JOGO
  // ----------------
  const lastTickTime = ref(Date.now())
  const totalBitcoins = ref(0)

  const upgrades = ref([
    {
      id: 1,
      name: 'Mouse Reforçado',
      description: 'Aumenta o valor do clique em 1 BTC.',
      cost: 10,
      baseCost: 10,
      value: 1,
      owned: 0,
      type: 'click',
      category: 'click'
    },
    {
      id: 2,
      name: 'Dedo de Programador',
      description: 'Aumenta o valor do clique em 10 BTC.',
      cost: 1000,
      baseCost: 1000,
      value: 10,
      owned: 0,
      type: 'click',
      category: 'click'
    },
    {
      id: 3,
      name: 'Algoritmo de Hash Eficiente',
      description: 'Aumenta a produção TOTAL em 1.2x.',
      cost: 500,
      baseCost: 500,
      value: 0.2,
      owned: 0,
      type: 'multiplier',
      category: 'multiplier'
    },
    {
      id: 4,
      name: 'Otimização de Hardware',
      description: 'Aumenta a produção TOTAL em 1.5x.',
      cost: 5000,
      baseCost: 5000,
      value: 0.5,
      owned: 0,
      type: 'multiplier',
      category: 'multiplier'
    }
  ])

  const generators = ref([
    {
      id: 101,
      name: 'Estudante de TI',
      description: 'Gera 1 Bitcoin por segundo.',
      cost: 100,
      baseCost: 100,
      value: 1,
      owned: 0,
      type: 'auto',
      category: 'generator'
    },
    {
      id: 102,
      name: 'Placa de Vídeo Antiga',
      description: 'Gera 5 Bitcoins por segundo.',
      cost: 500,
      baseCost: 500,
      value: 5,
      owned: 0,
      type: 'auto',
      category: 'generator'
    },
    {
      id: 103,
      name: 'Fazenda de Mineração Pequena',
      description: 'Gera 50 Bitcoins por segundo.',
      cost: 5000,
      baseCost: 5000,
      value: 50,
      owned: 0,
      type: 'auto',
      category: 'generator'
    },
    {
      id: 104,
      name: 'ASIC Miner',
      description: 'Gera 100 Bitcoins por segundo.',
      cost: 10000,
      baseCost: 10000,
      value: 100,
      owned: 0,
      type: 'auto',
      category: 'generator'
    }
  ])

  // ----------------
  // 3. GETTERS
  // ----------------
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

  // ----------------
  // 4. ACTIONS
  // ----------------
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
      console.error("Tipo de item inválido:", itemType)
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

  // ----------------
  // 5. SALVAR E CARREGAR (Atualizado)
  // ----------------
  function saveGame() {
    const gameState = {
      totalBitcoins: totalBitcoins.value,
      lastTickTime: lastTickTime.value,
      upgrades: upgrades.value.map(u => ({ id: u.id, owned: u.owned, cost: u.cost })),
      generators: generators.value.map(g => ({ id: g.id, owned: g.owned, cost: g.cost })),
      // Salvando as novas configs
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

    savedState.upgrades.forEach(savedUpgrade => {
      const upgradeInStore = upgrades.value.find(u => u.id === savedUpgrade.id)
      if (upgradeInStore) {
        upgradeInStore.owned = savedUpgrade.owned
        upgradeInStore.cost = savedUpgrade.cost
      }
    })

    savedState.generators.forEach(savedGenerator => {
      const generatorInStore = generators.value.find(g => g.id === savedGenerator.id)
      if (generatorInStore) {
        generatorInStore.owned = savedGenerator.owned
        generatorInStore.cost = savedGenerator.cost
      }
    })

    // Carregando as configs
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

  // ----------------
  // 6. RETORNO (EXPORTAÇÃO) - Onde o erro acontecia
  // ----------------
  return {
    // Variáveis
    totalBitcoins,
    upgrades,
    generators,
    lastTickTime,
    // NOVAS VARIÁVEIS EXPORTADAS
    autoSaveEnabled,
    autoSaveInterval,
    volume,

    // Getters
    clickPower,
    btcPerSecond,

    // Actions
    clickBitcoin,
    buyItem,
    gameTick,
    resetLastTick,
    saveGame,
    loadGame,
    resetGame
  }
})