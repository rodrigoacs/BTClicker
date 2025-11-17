# ₿TClicker 

BTClicker é um jogo incremental (também conhecido como *clicker game*) viciante construído com Vue.js 3. O objetivo é simples: clique no Bitcoin para minerar, use suas moedas para comprar geradores automáticos e upgrades, e veja seus números crescerem exponencialmente\!


## Funcionalidades Principais
  * **Mineração por Clique:** Cada clique no Bitcoin gigante gera moedas.
  * **Geradores Automáticos:** Compre "Geradores" (como 'Estudante de TI' ou 'ASIC Miner') que mineram Bitcoins passivamente para você, aumentando seu ₿/s (Bitcoins por segundo).
  * **Upgrades:** Adquira "Upgrades" para melhorar o poder do seu clique ('Mouse Reforçado') ou a eficiência geral da sua mineração ('Algoritmo de Hash Eficiente').
  * **Custo Escalável:** O preço de cada item (gerador ou upgrade) aumenta após cada compra, tornando o desafio progressivamente maior.
  * **Geração Passiva Contínua:** O jogo utiliza um "game tick" (`setInterval`) para calcular e adicionar os ganhos passivos de forma contínua, mesmo quando você não está clicando.
  * **Interface Reativa:** A interface é dividida em abas (Inicio, Geradores, Upgrades, Ajustes) usando o Vue Router, e todos os números são atualizados em tempo real.

## Tecnologias Utilizadas

  * **Framework:** Vue 3 (usando Composition API e tags `<script setup>`)
  * **Gerenciamento de Estado:** Pinia
  * **Roteamento:** Vue Router
  * **Build Tool:** Vite

## Instalação e Execução

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-repositorio>
    cd BTClicker
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  **Acesse o jogo** no seu navegador, geralmente em `http://localhost:5173`.

## Estrutura do Projeto

Aqui está uma visão geral dos arquivos e diretórios mais importantes:

```
/
├── index.html          # Ponto de entrada HTML
├── package.json        # Dependências e scripts do projeto
├── vite.config.js      # Configuração do Vite
└── src/
    ├── main.js         # Inicialização do Vue, Pinia e Vue Router
    ├── App.vue         # Componente raiz com layout (abas) e o game loop
    ├── assets/         # Arquivos estáticos (CSS)
    ├── components/
    │   └── BitcoinClicker.vue # O componente do botão principal do jogo
    ├── router/
    │   └── index.js    # Definição das rotas (abas) do app
    ├── stores/
    │   └── gameStore.js # O "cérebro" do jogo (Pinia store)
    └── views/
        ├── GameView.vue      # Tela principal (clique)
        ├── GeneratorsView.vue # Tela de compra de geradores
        ├── UpgradesView.vue   # Tela de compra de upgrades
        └── SettingsView.vue   # Tela de configurações
```