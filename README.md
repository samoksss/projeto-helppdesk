# 🛡️ Help Desk - Sistema de Gestão de Chamados

![Badge em Desenvolvimento](https://img.shields.io/badge/Status-Concluído-green)
![Angular](https://img.shields.io/badge/Frontend-Angular%2012-red)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%202.3-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

Um sistema completo de Help Desk desenvolvido para otimizar a gestão de chamados técnicos, com controle de técnicos, clientes e tickets de suporte. O projeto destaca-se pelo seu design **"Midnight Gold"**, focado em experiência de usuário (UX) premium e visual moderno (Dark Mode & Glassmorphism).

---

## 🌐 Demonstração Online (Live Demo)

O sistema está implantado e rodando 100% na nuvem. Você pode acessá-lo de qualquer dispositivo (PC ou Celular):

- **🖥️ Site (Frontend):** [https://projeto-helppdesk.vercel.app](https://projeto-helppdesk.vercel.app)
- **⚙️ API (Backend):** [https://helpdesk-api-srv.onrender.com](https://helpdesk-api-srv.onrender.com) *(Link da API apenas para referência)*

> **Credenciais de Acesso (Teste):**
> - **E-mail:** `bill@mail.com`
> - **Senha:** `123`

---

## 🎨 Design System & UI/UX

Diferente dos sistemas administrativos tradicionais, este projeto implementa uma identidade visual própria:
- **Tema Midnight Gold:** Fundo preto profundo (`#000000`) com acentos em Dourado Metálico (`#D4AF37`).
- **Glassmorphism:** Cards e tabelas com efeito de vidro translúcido para modernidade.
- **Responsividade Total:** Layout fluido que se adapta a desktops e dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

### Frontend (Cliente)
- **Angular 12:** Framework principal.
- **Angular Material:** Componentes de UI (Tabelas, Formulários, Cards).
- **Ngx-Mask:** Formatação de inputs (CPF, Telefone).
- **Toastr:** Alertas e notificações visuais.

### Backend (Servidor)
- **Java 11 (LTS):** Linguagem base.
- **Spring Boot 2.3.12:** Framework para API REST.
- **Spring Security + JWT:** Autenticação e Autorização segura.
- **JPA / Hibernate:** Persistência de dados.
- **Maven:** Gerenciamento de dependências.

### Banco de Dados
- **H2 Database:** Banco em memória para testes rápidos (Perfil `test`).
- **MySQL:** Banco para desenvolvimento local (Perfil `dev`).
- **PostgreSQL:** Banco robusto para produção na nuvem (Perfil `prod`).

### Infraestrutura & Deploy
- **Vercel:** Hospedagem do Frontend.
- **Render:** Hospedagem da API e Banco de Dados PostgreSQL.
- **Docker:** Containerização da aplicação Java.

---

## ✨ Funcionalidades Principais

1.  **Dashboard Interativo:** Visão geral de chamados (Abertos, Em Andamento, Encerrados).
2.  **Gestão de Técnicos:** Cadastro completo com validação de CPF e perfil de acesso.
3.  **Gestão de Clientes:** CRUD completo de clientes.
4.  **Controle de Chamados:**
    - Abertura de tickets com prioridade (Baixa, Média, Alta).
    - Status de acompanhamento.
    - Associação automática de Técnico e Cliente.
5.  **Segurança:**
    - Login com Token JWT (Expiração automática).
    - Proteção de rotas (Guards do Angular).
    - Senhas criptografadas (BCrypt).

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v14 ou superior compatível com Angular 12)
- Java JDK 11
- Maven
- MySQL (opcional, se usar perfil `dev`)

### 1. Backend (API)
```bash
# Clone o repositório
git clone [https://github.com/samoksss/projeto-helppdesk.git](https://github.com/samoksss/projeto-helppdesk.git)

# Entre na pasta do backend
cd helpdeskturmaa

# Execute com Maven
mvn spring-boot:run
````

*A API iniciará em `http://localhost:8080`*

### 2\. Frontend (App)

```bash
# Entre na pasta do frontend
cd frontend/helpdeskprojectfrontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```

*O site estará disponível em `http://localhost:4200`*

-----

## 📂 Estrutura de Pastas

```
projeto-helppdesk/
├── frontend/               # Código Angular
│   ├── src/app/
│   │   ├── components/     # Telas (Login, Home, CRUDs)
│   │   ├── services/       # Comunicação com API
│   │   └── shared/         # Material Design modules
│   └── environments/       # Configuração Dev/Prod
│
├── helpdeskturmaa/         # Código Java Spring Boot
│   ├── src/main/java/
│   │   ├── config/         # Configurações de Segurança/CORS
│   │   ├── controllers/    # Endpoints REST
│   │   ├── models/         # Entidades do Banco
│   │   └── services/       # Regras de Negócio
│   └── Dockerfile          # Configuração de Deploy
└── README.md
```

-----

## 📄 Documentação da API

O Backend possui documentação automática das rotas. Com o projeto rodando localmente, acesse:

  - **H2 Console:** `http://localhost:8080/h2-console` (no perfil `test`)

-----

## 👨‍💻 Autor

Desenvolvido por **Samuel Brito** e **Leticia Pimentel** como parte da disciplina de Estágio Supervisionado II.

-----
