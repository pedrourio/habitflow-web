# HabitFlow Web ☀️🌙

Frontend web para a aplicação HabitFlow, um rastreador de hábitos moderno e elegante. Construído com React, TypeScript e Ant Design, consumindo a [HabitFlow API](https://github.com/[seu-usuario]/habitflow-api).

![Placeholder para GIF/Screenshot da sua aplicação]
*(Dica: Grave um GIF curto da sua aplicação em uso e substitua o link acima)*

---

### ✨ Principais Funcionalidades

* **Interface Reativa:** Construída com React e TypeScript para uma experiência de usuário rápida e segura.
* **Design System Profissional:** Utiliza o Ant Design para uma UI consistente e elegante.
* **Fluxo de Autenticação Completo:** Páginas de Login e Cadastro que se comunicam com a API via tokens JWT.
* **Dashboard Completo:**
    * Visualização da lista de hábitos.
    * Criação, Edição e Exclusão de hábitos através de modais.
    * Funcionalidade de Check-in diário com feedback visual imediato.
    * Filtros para organizar os hábitos.
* **Tema Claro/Escuro:** Seletor de tema com persistência da escolha do usuário.
* **Página de Perfil:** Permite ao usuário visualizar e atualizar suas informações.

---

### 🛠️ Tecnologias e Ferramentas

* **React 18**
* **TypeScript**
* **Vite** como ambiente de desenvolvimento e build tool.
* **Ant Design** para a biblioteca de componentes e sistema de temas.
* **React Router DOM** para o roteamento de páginas.
* **Axios** para as requisições à API.
* **Conventional Commits** e **Gitmojis** para o controle de versão.

---

### 🚀 Começando (Setup Local)

1.  **Pré-requisitos:** Node.js e `npm` (via `nvm`) instalados. **A API [HabitFlow API](https://github.com/[seu-usuario]/habitflow-api) deve estar rodando localmente em `http://localhost:3000`**.
2.  Clone o repositório: `git clone https://github.com/[seu-usuario]/habitflow-web.git`
3.  Instale as dependências: `npm install`
4.  Configure as variáveis de ambiente. Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a URL da sua API:
    ```
    VITE_API_URL=http://localhost:3000
    ```
5.  Inicie o servidor de desenvolvimento: `npm run dev`

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

### 👨‍💻 Autor

* **[Pedro Urio]** - [https://www.linkedin.com/in/pedro-henrique-u-4476aa257/]

---

### 📄 Licença

Este projeto está sob a licença MIT.
