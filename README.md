# Blog React + Firebase

Este é um projeto de blog criado com [React](https://reactjs.org/) e [Firebase](https://firebase.google.com/), permitindo funcionalidades básicas de criação, edição, deleção e visualização de posts. Com Firebase, aproveitamos um backend completo para autenticação, armazenamento e banco de dados em tempo real.

## Funcionalidades

- **Autenticação de usuário**: login e cadastro com email e senha.
- **CRUD de Posts**: Criação, leitura, edição e exclusão de posts de blog.
- **Banco de Dados em Tempo Real**: Atualização de posts em tempo real utilizando Firebase Firestore.
- **Armazenamento de Imagens**: Upload e armazenamento de imagens para os posts com Firebase Storage.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface.
- **Firebase**: Plataforma backend para autenticação, banco de dados e armazenamento.
- **React Router**: Gerenciamento de rotas do blog.
- **React Hooks**: Utilização de hooks como `useState`, `useEffect` e `useContext` para o gerenciamento de estado.

## Pré-requisitos

- **Node.js** instalado
- Conta no **Firebase** com um projeto configurado para autenticação, Firestore e Storage.

## Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Habilite o Firestore Database e o Firebase Authentication com o método de login de Email e Senha.
3. Habilite o Firebase Storage para armazenamento de imagens.
4. Gere as credenciais de configuração do Firebase para seu projeto:
   - No console do Firebase, vá para **Configurações do projeto** e, em **Configurações gerais**, copie a configuração do Firebase para seu aplicativo web.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/blog-react-firebase.git
   cd blog-react-firebase

2. Instale as dependências do projeto:
   ```bash
   npm install

3. Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente do Firebase:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id

4. Inicie o projeto:
    ```bash
    npm run dev

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.