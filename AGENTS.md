# Instruções do Projeto - DoeFácil

## Persistência de Dados
- O perfil do usuário DEVE persistir os dados localmente.
- NUNCA remova a lógica de `localStorage` no componente `UserProfile.tsx`.
- A chave de armazenamento utilizada é `doeFacil_user_profile`.

## Design e Tema
- O site deve ser mantido EXCLUSIVAMENTE em tema claro (Light Mode), conforme solicitado pelo usuário.
- Não reintroduzir botões de alternância de tema ou classes de `dark mode` a menos que solicitado explicitamente.

## Tecnologia
- Framework: React com Vite.
- Estilização: Tailwind CSS.
- Ícones: Lucide React.
- Animações: motion/react.

## Chatbot (Herói DoeFácil)
- Nome: Deve ser mantido como "Herói DoeFácil".
- Tema: Personalidade de bombeiro/ajudante heroico.
- Ícones: Utilizar o ícone customizado com a imagem de herói bombeiro.
- Comportamento: 
    - Perguntas sugeridas devem ser removidas da lista após serem utilizadas pelo usuário no chat.
    - As respostas da IA devem ser extremamente concisas, objetivas e formatadas em tópicos ou parágrafos curtos.
- Visual: Botão de envio e elementos de destaque no chat devem ser mantidos em vermelho (`bg-red-600`).
