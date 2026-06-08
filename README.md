# 🏋️ Diário de Treinos

Aplicação web desenvolvida para registro e organização de exercícios físicos diários. O sistema permite cadastrar treinos com informações como nome do exercício, dia da semana, séries, repetições e carga, além de oferecer filtros e persistência de dados.

---

## 📌 Descrição do projeto

O **Diário de Treinos** é uma aplicação front-end voltada para o gerenciamento simples de rotinas de treino. O objetivo é facilitar o registro e acompanhamento de exercícios físicos de forma prática e intuitiva.

Os dados são armazenados localmente no navegador utilizando `localStorage`, garantindo que as informações permaneçam salvas mesmo após recarregar a página.

---

## 🚀 Funcionalidades

- 🏋️ Cadastro de exercícios (nome, dia da semana, séries, repetições e carga)
- 📅 Filtro de exercícios por dia da semana
- 🗑️ Remoção de exercícios da lista
- 💾 Persistência de dados com `localStorage`
- ⚠️ Validação de campos com mensagens de erro
- 🔎 Sugestão de exercícios (autocomplete)
- 🎨 Interface responsiva e moderna

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da aplicação
- **Tailwind CSS (via CDN)** — estilização moderna e responsiva com tema escuro e detalhes em dourado
- **JavaScript (Vanilla)** — lógica da aplicação, manipulação do DOM, eventos e validações

---

## 🎨 Interface

A interface foi desenvolvida utilizando **Tailwind CSS**, com foco em:

- Design responsivo (mobile, tablet e desktop)
- Tema escuro (*dark mode*)
- Estilo moderno com efeitos de profundidade (*glassmorphism*)
- Experiência de usuário simples e intuitiva

---

## 📂 Estrutura do projeto

```text
├── index.html   # Estrutura da interface
├── script.js    # Lógica da aplicação
└── README.md    # Documentação do projeto
