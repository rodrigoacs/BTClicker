<template>
  <div class="tab-view">
    <div class="header-section">
      <h2>Ajustes</h2>
    </div>

    <div class="settings-card">
      <h3>🔊 Áudio</h3>

      <div class="setting-row">
        <div class="label-group">
          <label>Volume Master</label>
        </div>
        <div class="value-display">{{ volume }}%</div>
      </div>

      <div class="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          v-model="volume"
          class="custom-slider"
          :style="{ backgroundSize: volume + '% 100%' }"
        />
      </div>
    </div>

    <div class="settings-card">
      <h3>🎮 Salvamento</h3>

      <div class="setting-row">
        <div class="label-group">
          <label for="autoSave">Salvamento Automático</label>
          <small v-if="autoSaveEnabled">Ativo</small>
          <small v-else>Desativado (Cuidado!)</small>
        </div>

        <label class="switch">
          <input
            type="checkbox"
            id="autoSave"
            v-model="autoSaveEnabled"
          >
          <span class="slider round"></span>
        </label>
      </div>

      <hr class="divider">

      <div
        class="setting-row"
        :class="{ disabled: !autoSaveEnabled }"
      >
        <div class="label-group">
          <label for="saveInterval">Frequência</label>
          <small>Intervalo do salvamento</small>
        </div>

        <div class="select-wrapper">
          <select
            id="saveInterval"
            v-model="autoSaveInterval"
            :disabled="!autoSaveEnabled"
          >
            <option :value="10000">10 Segundos</option>
            <option :value="30000">30 Segundos</option>
            <option :value="60000">1 Minuto</option>
            <option :value="300000">5 Minutos</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-card">
      <h3>🎨 Interface</h3>

      <div class="setting-row">
        <label for="language">🌐 Idioma</label>
        <div class="select-wrapper">
          <select
            id="language"
            v-model="language"
          >
            <option value="pt-BR">Português</option>
            <option value="en-US">English</option>
          </select>
        </div>
      </div>

      <hr class="divider">

      <div class="setting-row">
        <label for="theme">🌙 Tema</label>
        <div class="select-wrapper">
          <select
            id="theme"
            v-model="theme"
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="bitcoin">Bitcoin (Laranja)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-card danger-zone">
      <h3>⚠️ Zona de Perigo</h3>
      <p class="warning-text">Ações aqui não podem ser desfeitas.</p>
      <button
        @click="handleReset"
        class="danger-button"
      >
        🗑️ Apagar Todo o Progresso
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { volume, autoSaveEnabled, autoSaveInterval } = storeToRefs(gameStore)
const language = ref('pt-BR')
const theme = ref('light')

function handleReset() {
  const confirmacao = confirm(
    "Tem certeza absoluta?\n\nIsso apagará seus Bitcoins, Upgrades e Geradores permanentemente e recarregará o jogo."
  )

  if (confirmacao) {
    gameStore.resetGame()
  }
}
</script>

<style scoped>
.tab-view {
  padding: 20px 15px;
  background-color: #f4f6f8;
  min-height: 100%;
}

.header-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.settings-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.settings-card h3 {
  margin: 0 0 20px 0;
  color: #ff9900;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  transition: opacity 0.3s ease;
}

.setting-row.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.label-group {
  display: flex;
  flex-direction: column;
}

.label-group label,
.setting-row>label {
  font-weight: 600;
  color: #444;
  font-size: 1rem;
}

.label-group small {
  color: #999;
  font-size: 0.8rem;
  margin-top: 2px;
}

.divider {
  border: 0;
  border-top: 1px solid #f0f0f0;
  margin: 10px 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked+.slider {
  background-color: #ff9900;
}

input:focus+.slider {
  box-shadow: 0 0 1px #ff9900;
}

input:checked+.slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.slider-container {
  padding: 10px 0;
}

.custom-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  outline: none;
  background-color: #e0e0e0;
  background-image: linear-gradient(#ff9900, #ff9900);
  background-repeat: no-repeat;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #ff9900;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s;
  margin-top: 0px;
}

.select-wrapper {
  width: 160px;
  flex-shrink: 0;
}

.select-wrapper select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 0.95rem;
  color: #333;
  outline: none;
  text-overflow: ellipsis;
}

.select-wrapper select:focus {
  border-color: #ff9900;
}

.danger-zone {
  border: 1px solid #ffeeba;
  background: #fffbf0;
}

.danger-zone h3 {
  color: #d9534f;
}

.warning-text {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 15px;
}

.danger-button {
  background-color: #fff;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.danger-button:active {
  background-color: #dc3545;
  color: white;
}
</style>