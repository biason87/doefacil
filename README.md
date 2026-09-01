# 🩸 DoeFácil — Plataforma Digital para Incentivo à Doação de Sangue

> **Simplificando a jornada do doador para salvar vidas.**  
> Projeto Integrador e Extensão Universitária desenvolvido na **Universidade de Sorocaba (UNISO)**.

<p align="center">
  <a href="https://doefacil-ecru.vercel.app">
    <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy Vercel" />
  </a>
  <a href="https://react.dev">
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://vitejs.dev">
    <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
  <a href="https://aistudio.google.com">
    <img src="https://img.shields.io/badge/Gemini_API-Google_AI_Studio-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API" />
  </a>
</p>

<p align="center">
  <font face="Georgia">
    Apenas <b>1,4% da população brasileira é doadora regular de sangue</b>, e cerca de <b>48% dos potenciais doadores são retidos por desinformação, medo ou barreiras logísticas</b>. O <b>DoeFácil</b> é uma aplicação web criada para aproximar voluntários de hemocentros regionais, fornecendo pré-triagem informativa, geolocalização e alertas em tempo real.
  </font>
</p>

<p align="center">
  ───  ───
</p>

## 📌 Visão Geral & Proposta de Valor

O **DoeFácil** centraliza as necessidades do doador de sangue em uma experiência digital acolhedora e informativa. O projeto foi alinhado aos **Objetivos de Desenvolvimento Sustentável da ONU (ODS 3, 9 e 10)** e desenvolvido com apoio e validação informativa do hemocentro parceiro **Colsan (Sorocaba)**.

🔗 **Acesse a aplicação em produção:** [doefacil-ecru.vercel.app](https://doefacil-ecru.vercel.app)

---

## 🚀 Funcionalidades Principais

| Módulo | Descrição & Impacto Social |
| :--- | :--- |
| 🗺️ **Mapa Interativo & Geolocalização** | Mapeamento de hemocentros próximos e guia de rotas de acesso para reduzir barreiras geográficas. |
| 🚨 **Alertas de Estoque Crítico** | Monitoramento e destaque automático de tipos sanguíneos em nível de emergência (≤ 25%). |
| 🤖 **Assistente Virtual Gemini** | Chatbot de pré-triagem alimentado pela Gemini API para sanar dúvidas clínicas e reduzir a ansiedade do doador. |
| 📊 **Perfil & Histórico do Doador** | Registro do histórico pessoal de doações, cálculo automático de aptidão e agendamento. |
| 🎨 **Design Acolhedor (UX/UI)** | Interface desenvolvida sob princípios da Psicologia do Design para transmitir segurança e usabilidade. |

---

## 🛠️ Arquitetura & Stack Técnica

* **Interface & Front-end:** React.js com TypeScript, Vite e Tailwind CSS.
* **Inteligência Artificial:** Integração direta com a **Gemini API (Google AI Studio)** para atendimento automatizado de pré-triagem e auxílio na refatoração de código.
* **Autenticação & Banco de Dados:** Firebase (Cloud Firestore e Authentication via Google).
* **Infraestrutura & Segurança:** Versionamento via Git/GitHub, deploy contínuo (CI/CD) na **Vercel** e gestão de chaves secretas via variáveis de ambiente (`VITE_GEMINI_API_KEY`).

---

## 💡 Metodologia & Liderança de Projeto

* **Design Thinking:** Pesquisa de campo e aplicação de empatia realizada com **74 respondentes** para mapeamento das reais dores do voluntário.
* **Gestão Ágil:** Planejamento de sprints e controle de backlog organizado via quadros Kanban (Trello).
* **Documentação Estruturada:** Elaboração completa do Termo de Abertura do Projeto (TAP) e Relatório Acadêmico de Extensão.

---

## 💻 Como Executar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/biason87/doefacil.git](https://github.com/biason87/doefacil.git)

# 2. Acesse a pasta do projeto
cd doefacil

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env na raiz do projeto contendo:
# VITE_GEMINI_API_KEY=sua_chave_do_google_ai_studio

# 5. Inicie o servidor de desenvolvimento
npm run dev
