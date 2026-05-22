# Projeto Frontend - A1Pr0ject

Este projeto é um frontend React + TypeScript criado com Vite. Ele integra autenticação Firebase, um chat com Google Gemini (Generative AI) e um painel simples de métricas.

## Visão geral

Funcionalidades principais:
- Autenticação de utilizador com Firebase Authentication
- Área de login e registo de contas
- Chat com IA usando o modelo `gemini-2.5-flash` da Google Generative AI
- Dashboard de métricas com número de mensagens e tempo de resposta da API
- Seleção de temas (claro, escuro e azul)
- Tratamento de rotas com `react-router-dom`

## Estrutura do projeto

Arquivos principais:
- `src/main.tsx` - ponto de entrada da aplicação
- `src/App.tsx` - configuração de rotas e providers de contexto
- `src/config/firebase.js` - configuração do Firebase
- `src/components/Login.tsx` - página de login
- `src/components/Registo.tsx` - página de registo
- `src/components/Homepage.tsx` - página principal após login
- `src/components/AppGemini.tsx` - interface de chat com Gemini
- `src/components/Dashboard.tsx` - painel de métricas
- `src/components/Error.tsx` - página de erro de rota / autenticação
- `src/components/LeftMenu.tsx` - menu lateral com histórico de mensagens e seleção de tema
- `src/components/Header.tsx` - topo da aplicação
- `src/components/Footer.tsx` - rodapé com métricas e tema atual
- `src/components/ChatContext.tsx` - contexto partilhado para mensagens e tempo de resposta
- `src/styles/theme.css` - estilos globais do projeto

## Dependências principais

- `react`, `react-dom`, `react-router-dom`
- `vite`, `typescript`
- `bootstrap` para layout e componentes visuais
- `firebase` para autenticação e configurações de backend
- `@google/generative-ai` para integração com Gemini

## Como executar

1. Instalar dependências:

```bash
npm install
```

2. Iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abrir o endereço exibido no terminal (normalmente `http://localhost:5173`).

## Scripts úteis

- `npm run dev` - inicia o servidor de desenvolvimento Vite
- `npm run build` - compila o projeto para produção
- `npm run lint` - executa o ESLint no código
- `npm run preview` - pré-visualiza a versão de produção

## Fluxo da aplicação

1. O utilizador começa em `/` ou `/Login` e pode entrar com email e password.
2. Se não tiver conta, pode ir para `/Registo` e criar uma conta Firebase.
3. Após o login, o utilizador é redirecionado para `/Homepage`.
4. Na homepage, há um chat onde o utilizador envia prompts para a API Gemini.
5. O menu lateral mostra histórico de mensagens e permite mudar o tema.
6. O botão `Dashboard` abre o componente de métricas com número total de mensagens e tempo de resposta da API.
7. Se o utilizador não estiver autenticado, é redirecionado para a página de erro.

## Configuração do Firebase

A configuração do Firebase está em `src/config/firebase.js` e já contém os valores do projeto:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

> Nota: em produção, rever a forma como as chaves são geridas e não expor valores sensíveis diretamente no frontend.

## Integração com Google Gemini

O chat usa `@google/generative-ai` com o modelo `gemini-2.5-flash`.

- `src/components/AppGemini.tsx` constrói o prompt a partir do histórico de mensagens
- Mede o tempo de resposta da API e guarda no contexto
- Mostra a resposta do modelo no ecrã

## Temas suportados

O menu lateral permite escolher:
- `Modo claro`
- `Modo escuro`
- `Modo azul`

O estado do tema é guardado no `ThemeContext` em `src/App.tsx`.

## Sugestões de melhoria

- Armazenar o histórico de conversas no Firestore
- Adicionar rota protegida com `PrivateRoute`
- Melhorar validação de formulários
- Evitar expor chaves de API no frontend
- Adicionar testes unitários

## Notas extras

- O projeto usa Vite com `react-router-dom` para navegação
- Os estilos principais estão em `src/styles/theme.css`
- A página de erro é exibida para rotas desconhecidas (`*`) e quando o usuário não está autenticado

---

Desenvolvido por João Nunes | Frontend 25/26
