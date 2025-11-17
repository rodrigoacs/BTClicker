<template>
  <div class="tab-view">
    <h2>Ajustes</h2>
    <p class="tab-description">Personalize sua experiência de mineração.</p>

    <div class="settings-group">
      <h3>Áudio</h3>
      <div class="setting-item">
        <label for="volume">Volume:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="100"
          v-model="volume"
        />
        <span>{{ volume }}%</span>
      </div>
    </div>

    <div class="settings-group">
      <h3>Jogo</h3>
      <div class="setting-item">
        <label for="autoSave">Salvamento Automático:</label>
        <input
          type="checkbox"
          id="autoSave"
          v-model="autoSaveEnabled"
        />
      </div>
      <div class="setting-item">
        <label for="language">Idioma:</label>
        <select
          id="language"
          v-model="language"
        >
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
        </select>
      </div>
      <div class="setting-item">
        <label for="theme">Tema:</label>
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
</template>

<script setup>
import { ref } from 'vue'

const volume = ref(50)
const autoSaveEnabled = ref(true)
const language = ref('pt-BR')
const theme = ref('light')

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

.settings-group {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fcfcfc;
}

.settings-group h3 {
  color: #555;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 5px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1em;
}

.setting-item label {
  flex-basis: 50%;
  font-weight: bold;
}

.setting-item input[type="range"] {
  flex-basis: 40%;
  width: 100%;
}

.setting-item span {
  flex-basis: 10%;
  text-align: right;
  font-weight: bold;
}

.setting-item select,
.setting-item input[type="checkbox"] {
  flex-basis: 45%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>