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

    <!-- <div class="settings-card about-card">
      <div class="app-info">
        <span class="app-icon">₿</span>
        <div>
          <h4 class="app-name">Bitcoin Clicker</h4>
          <span class="app-version">Versão 1.0.0</span>
        </div>
      </div>

      <div class="developer-info">
        <p>Desenvolvido com 🧡 por <strong>Rodrigo Soares</strong></p>
        <div class="links">
          <a
            href="#"
            class="link-btn"
          >GitHub</a>
          <a
            href="#"
            class="link-btn"
          >Portfolio</a>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { volume, autoSaveEnabled, autoSaveInterval, theme } = storeToRefs(gameStore)

const language = ref('pt-BR')

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
  padding-bottom: 90px;
}

.header-section h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 800;
  color: inherit;
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
  font-size: 1rem;
  color: inherit;
}

.label-group small {
  opacity: 0.6;
  font-size: 0.8rem;
  margin-top: 2px;
}

.divider {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
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
  border-radius: 34px;
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
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #ff9900;
}

input:checked+.slider:before {
  transform: translateX(22px);
}

.slider-container {
  padding: 10px 0;
}

.custom-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
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
}

.select-wrapper {
  width: 160px;
  flex-shrink: 0;
}

.select-wrapper select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  color: inherit;
  outline: none;
  text-overflow: ellipsis;
}

.select-wrapper select:focus {
  border-color: #ff9900;
}

.danger-zone {
  border: 1px solid rgba(220, 53, 69, 0.3);
  background: rgba(220, 53, 69, 0.05) !important;
}

.danger-zone h3 {
  color: #dc3545;
}

.warning-text {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 15px;
}

.danger-button {
  background-color: transparent;
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

.about-card {
  text-align: center;
  padding: 30px 20px;
}

.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.app-icon {
  font-size: 3rem;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #ffb700, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.app-version {
  font-size: 0.8rem;
  opacity: 0.6;
}

.developer-info p {
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.link-btn {
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}

.link-btn:hover {
  background-color: #ff9900;
  color: white;
  border-color: #ff9900;
}
</style>