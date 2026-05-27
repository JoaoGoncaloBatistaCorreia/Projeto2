# XReplica

Um projeto frontend moderno construído com **React**, **TypeScript** e **Vite** que integra tecnologias avançadas de inteligência artificial e análise de dados em tempo real.

## 📋 Sobre o Projeto

XReplica é uma aplicação web inovadora que combina:
- **Inteligência Artificial Generativa** via Google Generative AI
- **Análise de Dados em Gráficos** com Recharts e React Charts
- **Autenticação e Base de Dados** com Firebase
- **UI Responsiva** com Bootstrap

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 19.2.5 - Biblioteca UI
- **TypeScript** 6.0.2 - Tipagem estática
- **Vite** 8.0.9 - Bundler de alta performance
- **React Router DOM** 7.15.1 - Roteamento

### Inteligência Artificial
- **Google Generative AI** 0.24.1 - API de IA generativa
- **Google GenAI** 1.52.0 - Cliente IA

### Dados e Gráficos
- **Recharts** 3.8.1 - Gráficos React
- **React Charts** 3.0.0-beta.57 - Componentes de gráficos

### Backend e Autenticação
- **Firebase** 12.12.1 - Autenticação, database e storage
- **Axios** 1.16.1 - Cliente HTTP

### Estilo
- **Bootstrap** 5.3.8 - Framework CSS

### Desenvolvimento
- **ESLint** 9.39.4 - Linting
- **TypeScript ESLint** 8.58.2 - Linting TypeScript

## 📊 Composição do Repositório

```
TypeScript   91.2%
CSS          4.2%
JavaScript   3.6%
HTML         1.0%
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/JoaoGoncaloBatistaCorreia/Projeto2.git

# Navegar para o diretório
cd Projeto2

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build

```bash
# Compilar e construir para produção
npm run build
```

### Verificação de Código

```bash
# Executar ESLint para verificar a qualidade do código
npm run lint
```

### Preview de Produção

```bash
# Visualizar build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
Projeto2/
├── src/              # Código fonte TypeScript/React
├── public/           # Arquivos públicos estáticos
├── dist/             # Build de produção
├── package.json      # Dependências e scripts
├── tsconfig.json     # Configuração TypeScript
├── vite.config.ts    # Configuração Vite
└── README.md         # Este arquivo
```

## 🔐 Configuração de Variáveis de Ambiente

Para usar as funcionalidades de IA e Firebase, crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GOOGLE_AI_API_KEY=your_google_ai_key
```

## 📚 Recursos

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Generative AI](https://ai.google.dev)
- [Recharts Documentation](https://recharts.org)
- [Bootstrap Documentation](https://getbootstrap.com)

## 👤 Autor

**João Gonçalo Batista Correia**
- GitHub: [@JoaoGoncaloBatistaCorreia](https://github.com/JoaoGoncaloBatistaCorreia)

## 📝 Licença

Este projeto não possui licença especificada. Todos os direitos reservados.

---

**Última atualização:** Maio 2026
