# ConsorcioCRM

Um CRM moderno e completo desenvolvido especificamente para consultores de consórcio, construído com **Next.js**, **Supabase** e **shadcn/ui**.

## 🚀 Funcionalidades

- **Gestão de Clientes**: Centralize todas as informações dos seus clientes
- **Pipeline de Vendas**: Acompanhe oportunidades de forma visual e organizada
- **Tarefas e Atividades**: Gerencie lembretes e atividades com seus clientes
- **Relatórios e Analytics**: Insights em tempo real sobre seu desempenho
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Backend & Database**: Supabase (PostgreSQL)
- **State Management**: React Query
- **Form Validation**: React Hook Form + Zod

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/WillBraga22/consorciocrm.git
cd consorciocrm
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Adicione suas credenciais do Supabase no arquivo `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=seu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Estrutura do Projeto

```
consorciocrm/
├── app/                      # App Router do Next.js
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página inicial
│   ├── dashboard/           # Dashboard
│   ├── clients/             # Gestão de clientes
│   ├── deals/               # Pipeline de vendas
│   ├── tasks/               # Tarefas
│   └── auth/                # Autenticação
├── components/              # Componentes React
│   ├── ui/                  # Componentes shadcn/ui
│   └── layout/              # Componentes de layout
├── lib/                     # Funções utilitárias
│   └── supabase.ts         # Cliente Supabase
├── types/                   # Definições de tipos
│   └── database.ts         # Tipos do banco de dados
├── public/                  # Arquivos estáticos
├── styles/                  # Estilos globais
└── .env.example            # Exemplo de variáveis de ambiente
```

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

- **profiles**: Informações dos usuários
- **clients**: Clientes e prospects
- **deals**: Oportunidades de venda
- **activities**: Atividades (chamadas, emails, reuniões)
- **tasks**: Tarefas e lembretes

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 💬 Suporte

Se tiver dúvidas ou encontrar problemas, abra uma issue no GitHub.

## 🎯 Roadmap

- [ ] Autenticação com Supabase Auth
- [ ] CRUD completo de clientes
- [ ] Dashboard com gráficos e analytics
- [ ] Sistema de tarefas e lembretes
- [ ] Integração com calendário
- [ ] Exportação de relatórios
- [ ] Sincronização com WhatsApp
- [ ] Aplicativo mobile

---

Desenvolvido com ❤️ para consultores de consórcio
