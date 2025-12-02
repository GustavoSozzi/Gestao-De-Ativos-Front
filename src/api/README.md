# Configuração do Axios

Este diretório contém a configuração centralizada do Axios para o projeto.

## Instâncias

### `axiosPublic`
- Usado para requisições públicas (sem autenticação)
- Exemplo: Login, Cadastro

### `axiosPrivate`
- Usado para requisições autenticadas
- Adiciona automaticamente o token Bearer do localStorage
- Redireciona para login em caso de erro 401 (não autorizado)

## Uso

```javascript
import { axiosPublic, axiosPrivate } from '../src/api/axios';

// Requisição pública
const response = await axiosPublic.post('/Login', { Matricula, Password });

// Requisição autenticada (token adicionado automaticamente)
const response = await axiosPrivate.get('/Ativos');
const response = await axiosPrivate.post('/Ativos/register', data);
const response = await axiosPrivate.put('/Ativos/123', data);
const response = await axiosPrivate.delete('/Ativos/123');
```

## Interceptors

O `axiosPrivate` possui interceptors que:
1. Adicionam automaticamente o token Bearer em todas as requisições
2. Tratam erros 401 removendo dados do localStorage e redirecionando para login
