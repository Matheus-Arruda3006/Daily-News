# 🚀 Daily News — React 19 + Laravel 11 + PostgreSQL + pgAdmin 4

> Plataforma moderna, fluida e profissional de notícias técnicas e publicações para o ecossistema React, Next.js e Arquitetura Fullstack.

---

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + Vite + TypeScript + Design System Dark Mode com CSS Moderno + Lucide Icons + Canvas Confetti.
- **Backend**: Laravel 11+ (API RESTful com Sanctum, Seeders, Migrations e Eloquent ORM).
- **Banco de Dados**: PostgreSQL com suporte a pgAdmin 4.
- **Orquestração**: `docker-compose.yml` para banco de dados e pgAdmin em 1 comando.

---

## ⚡ Como Executar o Projeto

### 1. Banco de Dados PostgreSQL & pgAdmin 4

Você pode rodar o PostgreSQL e o pgAdmin de forma automática via Docker Compose:

```bash
docker compose up -d
```

#### 🔑 Credenciais do pgAdmin 4:
- **URL da Interface Web**: [http://localhost:5050](http://localhost:5050)
- **E-mail**: `admin@dailynews.com`
- **Senha**: `admin`

#### 🐘 Conexão no pgAdmin para o PostgreSQL:
- **Host**: `postgres` (se dentro do docker) ou `localhost` / `127.0.0.1`
- **Porta**: `5432`
- **Maintenance Database**: `daily_news`
- **Username**: `postgres`
- **Password**: `password`

---

### 2. Backend (Laravel API)

1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```

2. Execute as migrations e carregue os dados de teste (Seeders):
   ```bash
   php artisan migrate:fresh --seed
   ```

3. Inicie o servidor da API:
   ```bash
   php artisan serve
   ```
   *A API estará disponível em `http://localhost:8000/api`.*

---

### 3. Frontend (React + Vite + TypeScript)

1. Acesse o diretório do frontend ou use o script da raiz:
   ```bash
   npm run dev:frontend
   # ou
   cd frontend
   npm run dev
   ```
2. Abra seu navegador em [http://localhost:5173](http://localhost:5173).

---

## 👤 Contas de Teste Pré-Configuradas

Para facilitar os testes de paywall e permissões na interface:

| Usuário | E-mail | Senha | Perfil |
|---|---|---|---|
| **Matheus Arruda** | `admin@dailynews.com` | `password123` | **Admin / Autor** (Acesso total + Criação de artigos) |
| **Lucas Silva** | `premium@dailynews.com` | `password123` | **Assinante PRO** (Acesso a todos artigos pagos) |
| **Camila Rocha** | `camila@example.com` | `password123` | **Usuário Free** (Artigos públicos + prévias) |

*Dica: Na tela de login, você pode clicar nos botões de **1-Clique Demo** para entrar instantaneamente com qualquer perfil.*

---

## 📋 Principais Recursos do Daily News

1. **Paywall Inteligente**:
   - Artigos com status *Exclusivo para Assinantes* exibem prévia elegante com gradiente blur e card de conversão para assinatura PRO.
   - Assinantes desbloqueiam imediatamente o conteúdo completo e recursos de comentários.
2. **Navegação Fluida SPA**:
   - Transições instantâneas entre Feed de Notícias, Leitor imersivo, Comparador de Planos, Painel do Assinante e Guia do Banco de Dados.
3. **Gerenciamento de Publicações**:
   - Painel para autores criarem e publicarem novos artigos com formatação Markdown, tempos de leitura e categorias.
4. **Interatividade em Tempo Real**:
   - Curtidas com feedback imediato, favoritos salvos no perfil do usuário e espaço para comentários técnicos.
5. **Painel de Controle de Assinaturas**:
   - Planos Mensal ($9.90/mês) e Anual ($95.00/ano), cancelamento com 1 clique e celebração com confetes visuais.
