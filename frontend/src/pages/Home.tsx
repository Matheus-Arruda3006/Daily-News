import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { PostCard } from '../components/PostCard';
import { api, Post, Category, PlatformStats, fallbackPosts, fallbackCategories, fallbackStats } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Eye,
  BookOpen,
  Zap,
  Shield,
  Layers,
  Award
} from 'lucide-react';

interface HomeProps {
  onSelectPost: (post: Post) => void;
  onExplorePosts: (categorySlug?: string) => void;
  onGoToPlans: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectPost, onExplorePosts, onGoToPlans }) => {
  const { openSubscribe, isSubscribed } = useAuth();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>(fallbackPosts);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [stats, setStats] = useState<PlatformStats>(fallbackStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, catRes, postsRes] = await Promise.allSettled([
          api.get('/stats'),
          api.get('/categories'),
          api.get('/posts/featured'),
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value.data) {
          setStats(statsRes.value.data);
        }
        if (catRes.status === 'fulfilled' && catRes.value.data?.length) {
          setCategories(catRes.value.data);
        }
        if (postsRes.status === 'fulfilled' && postsRes.value.data?.length) {
          setFeaturedPosts(postsRes.value.data);
        }
      } catch {
        // Fallbacks já configurados no state inicial
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* 1. Hero Section */}
      <Hero onExplore={() => onExplorePosts()} priceAmount={stats.price_monthly || 9.90} />

      {/* 2. Live Stats Bar */}
      <section className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 30, 0.95) 0%, rgba(32, 32, 36, 0.95) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(97, 218, 251, 0.15)', color: 'var(--cyan-500)' }}>
              <Users size={24} />
            </div>
            <div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1.1 }}>
                +{stats.total_subscribers.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>Devs Assinantes Ativos</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(235, 164, 23, 0.15)', color: 'var(--yellow-500)' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1.1 }}>
                +{stats.total_posts.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>Artigos &amp; Guias Técnicos</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(4, 211, 97, 0.15)', color: 'var(--green-500)' }}>
              <Eye size={24} />
            </div>
            <div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1.1 }}>
                +{stats.total_views.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>Visualizações Mensais</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(130, 87, 229, 0.15)', color: 'var(--purple-500)' }}>
              <Award size={24} />
            </div>
            <div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1.1 }}>
                100%
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>Curadoria Especializada</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Publications */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span style={{ color: 'var(--yellow-500)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Destaques da Semana
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.25rem' }}>
              Publicações Mais Lidas
            </h2>
          </div>

          <button
            onClick={() => onExplorePosts()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--cyan-500)',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            Ver catálogo completo <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
          ))}
        </div>
      </section>

      {/* 4. Explore by Topics */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Explore por Categorias</h2>
          <p style={{ color: 'var(--text-body)', marginTop: '0.5rem' }}>
            Navegue pelos tópicos mais relevantes da engenharia de software frontend e fullstack
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onExplorePosts(category.slug)}
              className="card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                borderLeft: `4px solid ${category.color || 'var(--cyan-500)'}`,
              }}
            >
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{category.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                {category.description || 'Artigos e atualizações regulares.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', color: category.color || 'var(--cyan-500)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Explorar artigos</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Conversion Banner */}
      {!isSubscribed && (
        <section className="container">
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse at top right, rgba(97, 218, 251, 0.15) 0%, rgba(26, 26, 30, 0.95) 70%)',
              border: '1px solid rgba(97, 218, 251, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="badge badge-premium" style={{ width: 'fit-content' }}>
                <Sparkles size={12} /> Acesso Instantâneo
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', lineHeight: 1.15 }}>
                Pronto para elevar seu nível como desenvolvedor React?
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem' }}>
                Assine hoje e desbloqueie imediatamente todo o acervo de publicações exclusivas e releases comentadas.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={openSubscribe} className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.1rem' }}>
                <Zap size={20} fill="#121214" />
                Assinar por $9.90/mês
              </button>
              <button onClick={onGoToPlans} className="btn-secondary" style={{ padding: '1rem 1.75rem' }}>
                Comparar Planos
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
