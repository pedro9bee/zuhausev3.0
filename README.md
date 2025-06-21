# Zuhaus v3.0

Uma aplicação de imóveis desenvolvida originalmente no Replit com React + Express + Node.js + Airtable.

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta Airtable (gratuita)

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd zuhausev3.0
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e configure as credenciais do Airtable:
```env
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
SESSION_SECRET=your_session_secret
```

4. Configure o banco de dados Airtable:

Crie uma base no Airtable com as seguintes tabelas:
- `Properties` (id, title, description, price, location, bedrooms, bathrooms, area, type, status, images, features, isForSale, isForRent, rentPrice, isFeatured)
- `Contacts` (id, name, email, phone, interest, message, createdAt)
- `Testimonials` (id, name, location, rating, message, avatar)
- `Users` (id, username, password)

### Executando o projeto

#### Modo de desenvolvimento
```bash
npm run dev
```
Este comando inicia tanto o servidor backend quanto o frontend em modo de desenvolvimento.

#### Build e produção
```bash
# Build do projeto
npm run build

# Executar em produção
npm run start
```

### Scripts disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run start` - Executa o servidor em modo produção
- `npm run check` - Verifica tipos TypeScript

### Estrutura do projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Código compartilhado (schemas)
├── attached_assets/ # Assets e imagens
└── dist/           # Build de produção
```

### Tecnologias utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Banco de dados**: Airtable (custo zero)
- **Autenticação**: Passport.js
- **UI**: Radix UI, Lucide React

## 🐳 Deploy com Docker

### Executar localmente com Docker

```bash
# Configure as variáveis no arquivo .env primeiro
docker-compose up -d

# Ou use o arquivo específico
docker-compose -f docker-compose.airtable.yml up -d

# Para parar os containers
docker-compose down
```

### Deploy no Oracle Cloud Infrastructure

#### Pré-requisitos para Oracle CI

1. **Oracle Cloud Instance**: Uma instância compute com Docker instalado
2. **Oracle Container Registry**: Para armazenar as imagens Docker
3. **Secrets do GitHub**: Configure os seguintes secrets no seu repositório:

```
# Oracle Cloud & Container Registry
ORACLE_REGISTRY_URL=<seu-registry-url>
ORACLE_USERNAME=<seu-username>
ORACLE_PASSWORD=<seu-password>
ORACLE_HOST=<ip-da-instancia>
ORACLE_SSH_USERNAME=<usuario-ssh>
ORACLE_SSH_KEY=<chave-privada-ssh>

# Airtable (Custo Zero)
AIRTABLE_API_KEY=<sua-airtable-api-key>
AIRTABLE_BASE_ID=<sua-airtable-base-id>
SESSION_SECRET=<secret-para-sessoes>
```

#### Pipeline de Deploy

O arquivo `.github/workflows/oracle-ci.yml` configura o deploy automático com **Airtable (custo zero)**:

1. Build da imagem Docker
2. Push para Oracle Container Registry  
3. Deploy na instância Oracle Cloud via SSH
4. Usa Airtable como banco de dados (sem custos adicionais)

#### Deploy manual

```bash
# Build da imagem
docker build -t zuhaus .

# Executar em produção com Airtable
docker-compose -f docker-compose.airtable.yml up -d
```

## 🎯 Configuração do Airtable (Custo Zero)

### 1. Criar conta no Airtable
- Acesse [airtable.com](https://airtable.com) e crie uma conta gratuita
- Limite: 1.200 registros por base (suficiente para maioria dos projetos)

### 2. Criar a Base de Dados
Crie uma nova base com as seguintes tabelas:

#### Tabela: Properties
- title (Single line text)
- description (Long text)
- price (Number)
- location (Single line text)
- bedrooms (Number)
- bathrooms (Number)
- area (Number)
- type (Single select)
- status (Single select: available, sold, rented)
- images (Multiple attachments)
- features (Multiple select)
- isForSale (Checkbox)
- isForRent (Checkbox)
- rentPrice (Number)
- isFeatured (Checkbox)

#### Tabela: Contacts
- name (Single line text)
- email (Email)
- phone (Phone number)
- interest (Single select)
- message (Long text)
- createdAt (Date)

#### Tabela: Testimonials
- name (Single line text)
- location (Single line text)
- rating (Number)
- message (Long text)
- avatar (Attachment)

#### Tabela: Users
- username (Single line text)
- password (Single line text)

### 3. Obter Credenciais
- API Key: Conta → API → Generate API key
- Base ID: URL da base (app...)

### Portas

- Aplicação em produção: 80 (mapeada para 3000 do container)
- Frontend em desenvolvimento: 5173 (Vite)
- Backend em desenvolvimento: Integrado com o frontend