# Sistema de Gestão de Ativos - Inpasa

Sistema web para gerenciamento de ativos de TI, desenvolvido com React e Vite, permitindo controle completo de equipamentos, chamados e usuários.

## 📋 Sobre o Projeto

O Sistema de Gestão de Ativos da Inpasa é uma aplicação web moderna que facilita o controle e monitoramento de ativos de tecnologia da informação. O sistema oferece funcionalidades para cadastro, edição, exclusão e filtragem de ativos, além de gerenciamento de chamados e usuários.

### Funcionalidades Principais

- **Gestão de Ativos**: CRUD completo de ativos de TI com filtros avançados
- **Gerenciamento de Chamados**: Controle de solicitações e suporte técnico
- **Administração de Usuários**: Cadastro e gerenciamento de usuários do sistema
- **Autenticação**: Sistema de login seguro com JWT
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos

## 🚀 Tecnologias Utilizadas

- **React 19.1.1**: Biblioteca JavaScript para construção de interfaces
- **Vite 7.1.7**: Build tool e dev server de alta performance
- **React Router DOM 6.30.1**: Gerenciamento de rotas
- **Axios 1.13.2**: Cliente HTTP para requisições à API
- **React Icons 5.5.0**: Biblioteca de ícones
- **CSS Modules**: Estilização com escopo local
- **ESLint**: Linting e qualidade de código
- **React Compiler**: Otimização automática de performance

## 📁 Estrutura do Projeto

```
gestao-de-ativos-inpasa/
├── Components/
│   ├── Header/              # Cabeçalho da aplicação
│   ├── Sidebar/             # Menu lateral de navegação
│   ├── Layout/              # Layout principal
│   └── Pages/
│       ├── Ativos/          # Módulo de gestão de ativos
│       ├── Chamados/        # Módulo de chamados
│       ├── Login/           # Página de autenticação
│       └── Usuarios/        # Módulo de usuários
├── Hooks/
│   ├── AuthContext.jsx      # Contexto de autenticação
│   ├── LayoutContext.jsx    # Contexto de layout
│   └── useAuth.jsx          # Hook customizado de autenticação
├── Helper/
│   └── ProtectedRouter.jsx  # Proteção de rotas privadas
├── src/
│   ├── api/
│   │   ├── axios.js         # Configuração do Axios
│   │   └── README.md        # Documentação da API
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Ponto de entrada
├── assets/
│   ├── img/                 # Imagens e logos
│   └── App.css              # Estilos globais
└── vite.config.js           # Configuração do Vite
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- API Backend rodando em `http://localhost:5234/api`

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GustavoSozzi/Gestao-De-Ativos-Front
cd gestao-de-ativos-inpasa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API (se necessário):
   - Edite o arquivo `src/api/axios.js`
   - Altere a constante `API_BASE_URL` para o endereço da sua API

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Visualiza o build de produção
- `npm run lint`: Executa o linter para verificar qualidade do código

## 🔐 Autenticação

O sistema utiliza autenticação baseada em JWT (JSON Web Token):

- **Login**: Endpoint `/api/Login` com matrícula e senha
- **Token**: Armazenado no localStorage
- **Interceptors**: Adicionam automaticamente o token nas requisições
- **Proteção**: Rotas protegidas redirecionam para login se não autenticado

### Exemplo de Login

```javascript
const response = await axiosPublic.post('/Login', {
  Matricula: 12345,
  Password: 'senha123'
});
```

## 🎨 Módulos do Sistema

### Gestão de Ativos

Permite gerenciar todos os ativos de TI da empresa:

- Cadastro de novos ativos
- Edição de informações
- Exclusão de ativos
- Filtros avançados por:
  - Nome
  - Modelo
  - Tipo
  - Código de inventário
  - Localização (cidade/estado)
  - Usuário responsável

### Chamados

Sistema de gerenciamento de solicitações e suporte técnico.

### Usuários

Administração de usuários do sistema com controle de permissões.

## 🌐 API e Requisições

O projeto utiliza duas instâncias do Axios:

### axiosPublic
Para requisições públicas (sem autenticação):
```javascript
import { axiosPublic } from '../src/api/axios';
const response = await axiosPublic.post('/Login', data);
```

### axiosPrivate
Para requisições autenticadas (token adicionado automaticamente):
```javascript
import { axiosPrivate } from '../src/api/axios';
const response = await axiosPrivate.get('/Ativos');
const response = await axiosPrivate.post('/Ativos/register', data);
const response = await axiosPrivate.put('/Ativos/123', data);
const response = await axiosPrivate.delete('/Ativos/123');
```

## 🎯 Contextos React

### AuthContext
Gerencia o estado de autenticação:
- `isLogged`: Status de autenticação
- `user`: Dados do usuário logado
- `login()`: Função de login
- `logout()`: Função de logout
- `getToken()`: Retorna o token JWT

### LayoutContext
Gerencia o estado do layout:
- `pageTitle`: Título da página atual
- `setPageTitle()`: Atualiza o título

## 🛣️ Rotas

- `/login`: Página de autenticação
- `/`: Dashboard (página inicial)
- `/ativos`: Gestão de ativos
- `/chamados`: Gerenciamento de chamados
- `/usuarios`: Administração de usuários
- `/licencas`: Controle de licenças (em desenvolvimento)
- `/localizacoes`: Gestão de localizações (em desenvolvimento)

## 🎨 Estilização

O projeto utiliza CSS Modules para estilização com escopo local, garantindo:
- Isolamento de estilos
- Prevenção de conflitos de classes
- Melhor manutenibilidade
- Performance otimizada

## 🔄 Estado e Performance

- **React Compiler**: Habilitado para otimização automática
- **Context API**: Gerenciamento de estado global
- **Debounce**: Implementado nos filtros para reduzir requisições
- **Loading States**: Feedback visual durante operações assíncronas

## 🐛 Tratamento de Erros

- Mensagens de erro amigáveis ao usuário
- Interceptors para tratamento de erros HTTP
- Redirecionamento automático em caso de token expirado
- Logs detalhados no console para debugging

## 📦 Build e Deploy

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence à Inpasa.

## 👥 Equipe

Desenvolvido pela equipe de TI da Inpasa.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.
