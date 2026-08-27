import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'author' | 'admin';
  is_subscribed: boolean;
  subscription_tier?: 'month' | 'year' | 'monthly' | 'annual' | null;
  activeSubscription?: Subscription;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  posts_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  likes_count: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  cover_image?: string;
  read_time: number;
  is_premium: boolean;
  views_count: number;
  likes_count: number;
  published_at: string;
  category?: Category;
  user?: {
    id: number;
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags?: Tag[];
  comments?: Comment[];
  is_locked?: boolean;
  is_bookmarked?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
  popular: boolean;
  features: string[];
}

export interface Subscription {
  id: number;
  plan_name: string;
  price_id: string;
  amount: number;
  currency: string;
  interval: string;
  status: string;
  expires_at?: string;
}

export interface PlatformStats {
  total_posts: number;
  total_subscribers: number;
  total_views: number;
  total_categories: number;
  price_monthly: number;
}

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para injetar token Sanctum
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@DailyNews:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback data para visualização offline / demonstração imediata se a porta da API não estiver rodando no momento
export const fallbackStats: PlatformStats = {
  total_posts: 4,
  total_subscribers: 1420,
  total_views: 84200,
  total_categories: 5,
  price_monthly: 9.90,
};

export const fallbackCategories: Category[] = [
  { id: 1, name: 'React Ecosystem', slug: 'react-ecosystem', color: '#61dafb', icon: 'Atom', posts_count: 12 },
  { id: 2, name: 'Next.js & SSR', slug: 'nextjs-ssr', color: '#ffffff', icon: 'Layers', posts_count: 8 },
  { id: 3, name: 'TypeScript & Clean Code', slug: 'typescript-clean-code', color: '#3178c6', icon: 'Code2', posts_count: 15 },
  { id: 4, name: 'Laravel & PostgreSQL', slug: 'laravel-postgresql', color: '#ff2d20', icon: 'Database', posts_count: 9 },
  { id: 5, name: 'IA & Dev Tools', slug: 'ia-dev-tools', color: '#eba417', icon: 'Cpu', posts_count: 6 },
];

export const fallbackPosts: Post[] = [
  {
    id: 1,
    title: 'O Guia Definitivo do React 19: Adeus useMemo e useCallback!',
    slug: 'o-guia-definitivo-do-react-19-adeus-usememo-e-usecallback',
    summary: 'Descubra como o novo React Compiler elimina a necessidade de memoização manual e revoluciona o fluxo de renderização dos componentes.',
    content: `## A Revolução do React Compiler\n\nDurante anos, desenvolvedores React travaram batalhas constantes contra re-renderizações desnecessárias. O uso de \`useMemo\`, \`useCallback\` e \`React.memo\` se tornou um padrão quase obrigatório, embora frequentemente mal implementado.\n\nCom o lançamento oficial do **React 19**, essa dor de cabeça pertence ao passado.\n\n### O que muda na prática?\n\nO novo compilador do React analisa sua árvore de código estática e dinamicamente durante o build, injetando automaticamente as otimizações de dependência nos nós de cálculo e funções.\n\n\`\`\`tsx\n// Antes: Código complexo com dependências manuais\nconst filteredItems = useMemo(() => {\n  return items.filter(item => item.price <= maxPrice);\n}, [items, maxPrice]);\n\n// Agora no React 19: Código puramente declarativo\nconst filteredItems = items.filter(item => item.price <= maxPrice);\n\`\`\`\n\n### Novos Hooks no React 19\n- \`useActionState\`: Simplifica o tratamento de formulários assíncronos e status de pending.\n- \`useOptimistic\`: Permite atualizações otimistas instantâneas na interface antes mesmo da confirmação do servidor.\n- \`use\`: Novo operador de leitura de Promises e Contextos em qualquer nível do fluxo de controle.\n\n> **Conclusão:** O React 19 marca a transição de um ecossistema focado em micro-otimizações manuais para um ambiente onde a engine cuida da performance para você.`,
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    read_time: 6,
    is_premium: true,
    views_count: 1420,
    likes_count: 89,
    published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    category: { id: 1, name: 'React Ecosystem', slug: 'react-ecosystem', color: '#61dafb', icon: 'Atom' },
    user: { id: 1, name: 'Matheus Arruda', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', bio: 'Fullstack Developer e Editor Chefe do Daily News.' },
    tags: [{ id: 1, name: 'React 19', slug: 'react-19' }, { id: 2, name: 'React Compiler', slug: 'react-compiler' }, { id: 3, name: 'Performance', slug: 'performance' }],
  },
  {
    id: 2,
    title: 'Dominando PostgreSQL com Laravel 11: Índices, JSONB e Full-Text Search',
    slug: 'dominando-postgresql-com-laravel-11-indices-jsonb-e-full-text-search',
    summary: 'Aprenda a extrair 10x mais performance do seu banco de dados relacional combinando o poder do Eloquent ORM com os recursos nativos do PostgreSQL.',
    content: `## Por que PostgreSQL é a escolha ideal para aplicações modernas?\n\nO PostgreSQL se consolidou como o banco de dados open-source mais avançado do mundo. Quando aliado à elegância do Laravel, temos uma das combinações mais produtivas e escaláveis do ecossistema de desenvolvimento.\n\n### 1. Índices GIN em Colunas JSONB\nO PostgreSQL permite consultar dados semi-estruturados com tempo de resposta em milissegundos utilizando o operador de containment \`@>\`:\n\n\`\`\`sql\nCREATE INDEX idx_posts_metadata ON posts USING GIN (metadata);\n\`\`\`\n\nNo Laravel Eloquent, você pode consultar diretamente:\n\`\`\`php\nPost::whereJsonContains('metadata->tags', 'laravel')->get();\n\`\`\`\n\n### 2. Full-Text Search Nativo\nEsqueça a necessidade de manter clusters caros de Elasticsearch para buscas simples. Com \`tsvector\` e \`tsquery\`, o PostgreSQL entrega resultados ponderados por relevância em tempo recorde.\n\n### 3. Gerenciamento com pgAdmin 4\nIntegrar o **pgAdmin 4** no seu fluxo diário de desenvolvimento permite monitorar queries lentas (via \`EXPLAIN ANALYZE\`), inspecionar índices e visualizar diagramas relacionais com extrema facilidade.`,
    cover_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
    read_time: 8,
    is_premium: true,
    views_count: 980,
    likes_count: 64,
    published_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    category: { id: 4, name: 'Laravel & PostgreSQL', slug: 'laravel-postgresql', color: '#ff2d20', icon: 'Database' },
    user: { id: 2, name: 'Diego Fernandes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', bio: 'CTO & Tech Lead.' },
    tags: [{ id: 4, name: 'Laravel', slug: 'laravel' }, { id: 5, name: 'PostgreSQL', slug: 'postgresql' }],
  },
  {
    id: 3,
    title: 'Next.js 15 e Server Actions: Arquitetura sem boilerplate de API',
    slug: 'nextjs-15-e-server-actions-arquitetura-sem-boilerplate-de-api',
    summary: 'Como as Server Actions transformaram a forma como interagimos com formulários e mutações de dados no Next.js.',
    content: `## A Nova Era das Aplicações Fullstack\n\nHistoricamente, uma operação simples de salvar um registro envolvia criar rotas manuais, estados repetitivos de loading e serialização manual.\n\nCom o **Next.js 15** e Server Actions com tipagem de ponta a ponta, mutações ocorrem como simples chamadas de função com segurança de tipos garantida em tempo de compilação.`,
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    read_time: 5,
    is_premium: false,
    views_count: 2310,
    likes_count: 145,
    published_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    category: { id: 2, name: 'Next.js & SSR', slug: 'nextjs-ssr', color: '#ffffff', icon: 'Layers' },
    user: { id: 1, name: 'Matheus Arruda', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    tags: [{ id: 6, name: 'RSC', slug: 'rsc' }],
  },
  {
    id: 4,
    title: 'Tipos Utilitários Avançados que Todo Desenvolvedor Sênior Deveria Conhecer',
    slug: 'tipos-utilitarios-avancados-que-todo-desenvolvedor-senior-deveria-conhecer',
    summary: 'Vá além do Partial e Pick. Domine Conditional Types, Template Literal Types e Inferencia avançada com infer.',
    content: `## O Sistema de Tipos Turing-Complete do TypeScript\n\nO TypeScript não é apenas uma ferramenta de verificação estática; seu sistema de tipos é um compilador funcional de altíssimo nível.\n\n### Desvendando o \`infer\`\n\nO operador \`infer\` permite extrair tipos de dentro de outras estruturas genéricas com facilidade.`,
    cover_image: 'https://images.unsplash.com/photo-1516116211227-bbc141a029ee?w=1200&auto=format&fit=crop&q=80',
    read_time: 7,
    is_premium: true,
    views_count: 1120,
    likes_count: 78,
    published_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    category: { id: 3, name: 'TypeScript & Clean Code', slug: 'typescript-clean-code', color: '#3178c6', icon: 'Code2' },
    user: { id: 2, name: 'Diego Fernandes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    tags: [{ id: 3, name: 'Performance', slug: 'performance' }],
  },
];
