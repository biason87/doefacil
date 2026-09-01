# 🩸 DoeFácil — Plataforma Digital para Incentivo à Doação de Sangue

> **Simplificando a jornada do doador para salvar vidas.**  
> Projeto Integrador e de Extensão Universitária desenvolvido no curso de Análise e Desenvolvimento de Sistemas da **Universidade de Sorocaba (UNISO)**.

[![Deploy com Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://doefacil-ecru.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Gemini API](https://img.shields.io/badge/Gemini_API-Google_AI_Studio-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com)

---

## 📌 Visão Geral do Produto

Apenas **1,4% da população brasileira é doadora regular de sangue**, e estudos indicam que **48% dos potenciais doadores são retidos por desinformação, medo ou entraves logísticos**. 

O **DoeFácil** é uma plataforma web criada para centralizar a jornada do voluntário, aproximando doadores de hemocentros regionais, fornecendo pré-triagem guiada por IA e monitorando níveis de estoque crítico em tempo real.

O projeto está alinhado aos **Objetivos de Desenvolvimento Sustentável da ONU (ODS 3, 9 e 10)** e foi desenvolvido com apoio informativo do hemocentro parceiro **Colsan (Sorocaba)**.

🔗 **Acesse a aplicação no ar:** [doefacil-ecru.vercel.app](https://doefacil-ecru.vercel.app)

<p align="center">
  <!-- Imagem principal de capa -->
  <img src="assets/home-preview.png" width="90%" alt="DoeFácil Home Preview" />
</p>

---

## 🎨 Prototipagem & Interface do Usuário (UX/UI)

A prototipagem do **DoeFácil** foi concebida sob os princípios da **Psicologia do Design**, priorizando uma paleta de cores acolhedora e uma navegação intuitiva para reduzir a ansiedade do usuário em relação à doação.

### 🖼️ Telas do Sistema & Legendas

#### 1. Tela Inicial (Home Page)
<p align="center">
  <img src="assets/prototipo-home.png" width="85%" alt="Protótipo Tela Inicial" />
</p>

> **Legenda:** Interface principal voltada para o engajamento rápido do visitante. Apresenta o indicador de urgência dos estoques sanguíneos de Sorocaba e região, além dos botões de ação direta para busca de postos e pré-triagem informativa.

---

#### 2. Mapa Interativo e Geolocalização de Postos
<p align="center">
  <img src="assets/prototipo-mapa.png" width="85%" alt="Protótipo Mapa Interativo" />
</p>

> **Legenda:** Mapeamento geolocalizado dos hemocentros (com foco inicial na Colsan Sorocaba). Permite visualizar rotas de acesso, horários de atendimento e contatos diretos para agendamento.

---

#### 3. Assistente Virtual & Pré-Triagem (Gemini Chatbot)
<p align="center">
  <img src="assets/prototipo-chat.png" width="85%" alt="Protótipo Chatbot Gemini" />
</p>

> **Legenda:** Interface interativa do assistente alimentado pela **Gemini API**. Esclarece dúvidas frequentes sobre pré-requisitos para doação, mitos sobre procedimentos clínicos e prazos de aptidão em tempo real.

---

#### 4. Perfil do Doador e Histórico Pessoal
<p align="center">
  <img src="assets/prototipo-perfil.png" width="85%" alt="Protótipo Perfil do Doador" />
</p>

> **Legenda:** Área do usuário voltada para o acompanhamento do histórico de doações efetuadas, cálculo automático de data de liberação para a próxima doação e armazenamento de comprovantes.

---

## 📊 Diagramas, Modelagem & Pesquisas de Caso

### 1. Pesquisa de Empatia & Mapeamento de Necessidades
Para fundamentar o escopo do sistema e garantir utilidade real ao público-alvo, foi aplicada uma **pesquisa de campo quantitativa/qualitativa contendo 74 respondentes**.

* **Resultado da Pesquisa:** Identificou-se que o principal fator inibidor não é o desinteresse, mas sim a **ausência de informações claras sobre onde doar e se o indivíduo está apto**.
* **Aplicação no Projeto:** As respostas guiaram a criação do **Chatbot Informativo** e do **Mapa Interativo** como os pilares de maior destaque no menu principal.

---

### 2. Diagrama de Casos de Uso (Use Case)

<p align="center">
  <img src="assets/diagramas.png" width="80%" alt="Diagrama de Casos de Uso" />
</p>

> **Explicação do Diagrama:** O diagrama reflete o fluxo de interações do **Doador/Usuário** com a plataforma:
> 1. **Consultar Postos:** O usuário consulta a localização do hemocentro Colsan mais próximo.
> 2. **Pré-Triagem Guiada:** Interage com o chatbot para verificar se preenche os requisitos clínicos antes de sair de casa.
> 3. **Gestão de Histórico:** Acessa seu painel pessoal para acompanhar datas de aptidão e registros de doações passadas.

---

## 🛠️ Arquitetura & Stack Técnica

* **Interface & Frontend:** React.js com TypeScript, Vite e Tailwind CSS[cite: 2].
* **Inteligência Artificial:** Integração com a **Gemini API (Google AI Studio)** para atendimento automatizado e auxílio no refinamento de código.
* **Autenticação & Dados:** Firebase (Cloud Firestore e Authentication via Google).
* **Infraestrutura & Segurança:** Versionamento via Git/GitHub, deploy contínuo (CI/CD) na **Vercel** e gestão de chaves secretas por variáveis de ambiente (`VITE_GEMINI_API_KEY`).

---

## 👥 Colaboradores & Créditos

Projeto desenvolvido pelos alunos do curso de ADS da UNISO:
* **Ketilyn Biason** — *Product Owner (P.O.) & Desenvolvedora Front-end*
* **Vitor Souza Oliveira** — *Desenvolvedor*
* **Equipe de Desenvolvimento (UNISO):** Jorge L. Zacarias, Maria C. Borges, Matheus Casaburi, Matheus O. Silverio, Rafael V. Bruneti.
