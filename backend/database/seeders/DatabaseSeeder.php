<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Subscription;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar Usuários
        $admin = User::create([
            'name' => 'Matheus Arruda',
            'email' => 'admin@dailynews.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            'bio' => 'Fullstack Developer e Editor Chefe do Daily News. Apaixonado por React, Laravel e PostgreSQL.',
            'role' => 'admin',
            'is_subscribed' => true,
            'subscription_tier' => 'annual',
        ]);

        $author = User::create([
            'name' => 'Diego Fernandes',
            'email' => 'author@dailynews.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            'bio' => 'CTO & Tech Lead. Escrevendo sobre inovação em Frontend, TypeScript e Arquitetura Web.',
            'role' => 'author',
            'is_subscribed' => true,
            'subscription_tier' => 'monthly',
        ]);

        $subscriber = User::create([
            'name' => 'Lucas Silva',
            'email' => 'premium@dailynews.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
            'bio' => 'Desenvolvedor Frontend júnior buscando aprender tudo sobre React moderno.',
            'role' => 'user',
            'is_subscribed' => true,
            'subscription_tier' => 'monthly',
        ]);

        $freeUser = User::create([
            'name' => 'Camila Rocha',
            'email' => 'camila@example.com',
            'password' => Hash::make('password123'),
            'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            'bio' => 'Entusiasta de tecnologia e design.',
            'role' => 'user',
            'is_subscribed' => false,
        ]);

        // Assinaturas ativas
        Subscription::create([
            'user_id' => $admin->id,
            'plan_name' => 'Plano Anual',
            'price_id' => 'price_annual',
            'amount' => 95.00,
            'interval' => 'year',
            'status' => 'active',
            'expires_at' => now()->addYear(),
        ]);

        Subscription::create([
            'user_id' => $subscriber->id,
            'plan_name' => 'Plano Mensal',
            'price_id' => 'price_monthly',
            'amount' => 9.90,
            'interval' => 'month',
            'status' => 'active',
            'expires_at' => now()->addMonth(),
        ]);

        // 2. Criar Categorias
        $catReact = Category::create([
            'name' => 'React Ecosystem',
            'slug' => 'react-ecosystem',
            'description' => 'Novidades, hooks, compilador React 19 e boas práticas modernas.',
            'color' => '#61dafb',
            'icon' => 'Atom',
        ]);

        $catNext = Category::create([
            'name' => 'Next.js & SSR',
            'slug' => 'nextjs-ssr',
            'description' => 'Server Components, Turbopack, App Router e estratégias de renderização.',
            'color' => '#ffffff',
            'icon' => 'Layers',
        ]);

        $catTypeScript = Category::create([
            'name' => 'TypeScript & Clean Code',
            'slug' => 'typescript-clean-code',
            'description' => 'Tipagem estrita, generics avançados e arquitetura resiliente no Frontend.',
            'color' => '#3178c6',
            'icon' => 'Code2',
        ]);

        $catBackend = Category::create([
            'name' => 'Laravel & PostgreSQL',
            'slug' => 'laravel-postgresql',
            'description' => 'Construção de APIs modernas, índices de alta performance e Docker.',
            'color' => '#ff2d20',
            'icon' => 'Database',
        ]);

        $catAI = Category::create([
            'name' => 'IA & Dev Tools',
            'slug' => 'ia-dev-tools',
            'description' => 'Modelos generativos, assistentes de código e automação de desenvolvimento.',
            'color' => '#eba417',
            'icon' => 'Cpu',
        ]);

        // 3. Criar Tags
        $tagReact19 = Tag::create(['name' => 'React 19', 'slug' => 'react-19']);
        $tagCompiler = Tag::create(['name' => 'React Compiler', 'slug' => 'react-compiler']);
        $tagRSC = Tag::create(['name' => 'RSC', 'slug' => 'rsc']);
        $tagLaravel = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $tagPostgres = Tag::create(['name' => 'PostgreSQL', 'slug' => 'postgresql']);
        $tagPerformance = Tag::create(['name' => 'Performance', 'slug' => 'performance']);

        // 4. Criar Posts
        $post1 = Post::create([
            'user_id' => $admin->id,
            'category_id' => $catReact->id,
            'title' => 'O Guia Definitivo do React 19: Adeus useMemo e useCallback!',
            'slug' => 'o-guia-definitivo-do-react-19-adeus-usememo-e-usecallback',
            'summary' => 'Descubra como o novo React Compiler elimina a necessidade de memoização manual e revoluciona o fluxo de renderização dos componentes.',
            'content' => "## A Revolução do React Compiler\n\nDurante anos, desenvolvedores React travaram batalhas constantes contra re-renderizações desnecessárias. O uso de `useMemo`, `useCallback` e `React.memo` se tornou um padrão quase obrigatório, embora frequentemente mal implementado.\n\nCom o lançamento oficial do **React 19**, essa dor de cabeça pertence ao passado.\n\n### O que muda na prática?\n\nO novo compilador do React analisa sua árvore de código estática e dinamicamente durante o build, injetando automaticamente as otimizações de dependência nos nós de cálculo e funções.\n\n```tsx\n// Antes: Código complexo com dependências manuais\nconst filteredItems = useMemo(() => {\n  return items.filter(item => item.price <= maxPrice);\n}, [items, maxPrice]);\n\n// Agora no React 19: Código puramente declarativo\nconst filteredItems = items.filter(item => item.price <= maxPrice);\n```\n\n### Novos Hooks no React 19\n- `useActionState`: Simplifica o tratamento de formulários assíncronos e status de pending.\n- `useOptimistic`: Permite atualizações otimistas instantâneas na interface antes mesmo da confirmação do servidor.\n- `use`: Novo operador de leitura de Promises e Contextos em qualquer nível do fluxo de controle.\n\n> **Conclusão:** O React 19 marca a transição de um ecossistema focado em micro-otimizações manuais para um ambiente onde a engine cuida da performance para você.",
            'cover_image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
            'read_time' => 6,
            'is_premium' => true,
            'views_count' => 1420,
            'likes_count' => 89,
            'status' => 'published',
            'published_at' => now()->subDays(2),
        ]);
        $post1->tags()->attach([$tagReact19->id, $tagCompiler->id, $tagPerformance->id]);

        $post2 = Post::create([
            'user_id' => $author->id,
            'category_id' => $catBackend->id,
            'title' => 'Dominando PostgreSQL com Laravel 11: Índices, JSONB e Full-Text Search',
            'slug' => 'dominando-postgresql-com-laravel-11-indices-jsonb-e-full-text-search',
            'summary' => 'Aprenda a extrair 10x mais performance do seu banco de dados relacional combinando o poder do Eloquent ORM com os recursos nativos do PostgreSQL.',
            'content' => "## Por que PostgreSQL é a escolha ideal para aplicações modernas?\n\nO PostgreSQL se consolidou como o banco de dados open-source mais avançado do mundo. Quando aliado à elegância do Laravel, temos uma das combinações mais produtivas e escaláveis do ecossistema de desenvolvimento.\n\n### 1. Índices GIN em Colunas JSONB\nO PostgreSQL permite consultar dados semi-estruturados com tempo de resposta em milissegundos utilizando o operador de containment `@>`:\n\n```sql\nCREATE INDEX idx_posts_metadata ON posts USING GIN (metadata);\n```\n\nNo Laravel Eloquent, você pode consultar diretamente:\n```php\nPost::whereJsonContains('metadata->tags', 'laravel')->get();\n```\n\n### 2. Full-Text Search Nativo\nEsqueça a necessidade de manter clusters caros de Elasticsearch para buscas simples. Com `tsvector` e `tsquery`, o PostgreSQL entrega resultados ponderados por relevância em tempo recorde.\n\n```php\nPost::whereRaw(\"to_tsvector('portuguese', title || ' ' || summary) @@ to_tsquery('portuguese', ?)\", [\$query])->get();\n```\n\n### 3. Gerenciamento com pgAdmin 4\nIntegrar o **pgAdmin 4** no seu fluxo diário de desenvolvimento permite monitorar queries lentas (via `EXPLAIN ANALYZE`), inspecionar índices e visualizar diagramas relacionais com extrema facilidade.",
            'cover_image' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
            'read_time' => 8,
            'is_premium' => true,
            'views_count' => 980,
            'likes_count' => 64,
            'status' => 'published',
            'published_at' => now()->subDays(4),
        ]);
        $post2->tags()->attach([$tagLaravel->id, $tagPostgres->id, $tagPerformance->id]);

        $post3 = Post::create([
            'user_id' => $admin->id,
            'category_id' => $catNext->id,
            'title' => 'Next.js 15 e Server Actions: Arquitetura sem boilerplate de API',
            'slug' => 'nextjs-15-e-server-actions-arquitetura-sem-boilerplate-de-api',
            'summary' => 'Como as Server Actions transformaram a forma como interagimos com formulários e mutações de dados no Next.js.',
            'content' => "## A Nova Era das Aplicações Fullstack\n\nHistoricamente, uma operação simples de salvar um registro envolvia:\n1. Criar uma rota de API (`/api/posts`);\n2. Fazer requisições `fetch` com `try/catch` no cliente;\n3. Controlar estados de loading e erro manualmente.\n\nCom o **Next.js 15** e Server Actions com tipagem de ponta a ponta, mutações ocorrem como simples chamadas de função com segurança de tipos garantida em tempo de compilação.\n\n### Exemplo Prático\n\n```tsx\n// app/actions/create-post.ts\n'use server'\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get('title') as string;\n  await db.post.create({ data: { title } });\n  revalidatePath('/posts');\n}\n```\n\nA interface permanece limpa e fluida, sem a necessidade de centenas de linhas de código de transporte HTTP.",
            'cover_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
            'read_time' => 5,
            'is_premium' => false, // Post gratuito para atrair leitores!
            'views_count' => 2310,
            'likes_count' => 145,
            'status' => 'published',
            'published_at' => now()->subDays(6),
        ]);
        $post3->tags()->attach([$tagRSC->id, $tagReact19->id]);

        $post4 = Post::create([
            'user_id' => $author->id,
            'category_id' => $catTypeScript->id,
            'title' => 'Tipos Utilitários Avançados que Todo Desenvolvedor Sênior Deveria Conhecer',
            'slug' => 'tipos-utilitarios-avancados-que-todo-desenvolvedor-senior-deveria-conhecer',
            'summary' => 'Vá além do Partial e Pick. Domine Conditional Types, Template Literal Types e Inferencia avançada com infer.',
            'content' => "## O Sistema de Tipos Turing-Complete do TypeScript\n\nO TypeScript não é apenas uma ferramenta de verificação estática; seu sistema de tipos é um compilador funcional de altíssimo nível.\n\n### Desvendando o `infer`\n\nO operador `infer` permite extrair tipos de dentro de outras estruturas genéricas com facilidade:\n\n```typescript\ntype UnpackPromise<T> = T extends Promise<infer U> ? U : T;\n\ntype Result = UnpackPromise<Promise<{ user: string }>>; // { user: string }\n```\n\nAo dominar essas abstrações, sua base de código ganha segurança máxima contra erros em runtime.",
            'cover_image' => 'https://images.unsplash.com/photo-1516116211227-bbc141a029ee?w=1200&auto=format&fit=crop&q=80',
            'read_time' => 7,
            'is_premium' => true,
            'views_count' => 1120,
            'likes_count' => 78,
            'status' => 'published',
            'published_at' => now()->subDays(8),
        ]);
        $post4->tags()->attach([$tagPerformance->id]);

        // 5. Adicionar comentários
        Comment::create([
            'post_id' => $post1->id,
            'user_id' => $subscriber->id,
            'content' => 'Excelente artigo! O React Compiler realmente transformou a produtividade do nosso time aqui. Muito bom ver a explicação tão clara.',
            'likes_count' => 4,
        ]);

        Comment::create([
            'post_id' => $post1->id,
            'user_id' => $freeUser->id,
            'content' => 'Fiquei impressionado com o fim do useMemo. Mal posso esperar para migrar meu projeto!',
            'likes_count' => 2,
        ]);

        Comment::create([
            'post_id' => $post2->id,
            'user_id' => $subscriber->id,
            'content' => 'A dica de Full-Text Search no PostgreSQL salvou nossa infraestrutura. Muito top a qualidade do conteúdo!',
            'likes_count' => 5,
        ]);
    }
}
