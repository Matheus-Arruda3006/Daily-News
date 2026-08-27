import React, { useState, useEffect } from 'react';
import { api, Post, Category, fallbackPosts, fallbackCategories } from '../services/api';
import { PostCard } from '../components/PostCard';
import { Search, Filter, BookOpen, Layers, X } from 'lucide-react';

interface PostsProps {
  onSelectPost: (post: Post) => void;
  initialCategory?: string;
}

export const Posts: React.FC<PostsProps> = ({ onSelectPost, initialCategory }) => {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (selectedCategory) params.category = selectedCategory;
        if (searchQuery) params.search = searchQuery;

        const res = await api.get('/posts', { params });
        if (res.data?.data) {
          setPosts(res.data.data);
        } else if (Array.isArray(res.data)) {
          setPosts(res.data);
        }
      } catch {
        // Filtro local em caso de fallback
        let filtered = [...fallbackPosts];
        if (selectedCategory) {
          filtered = filtered.filter((p) => p.category?.slug === selectedCategory);
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
          );
        }
        setPosts(filtered);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchPosts, 300);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    api.get('/categories').then((res) => {
      if (res.data?.length) setCategories(res.data);
    }).catch(() => {});
  }, []);

  return (
    <div className="container" style={{ padding: '3rem 2rem 5rem' }}>
      {/* Header Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--yellow-500)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <BookOpen size={16} /> Feed &amp; Publicações
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginTop: '0.25rem' }}>
          Explore Todas as Publicações
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Artigos aprofundados, releases comentadas e as melhores práticas da comunidade técnica.
        </p>
      </div>

      {/* Search and Category Filters Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Buscar por artigos, tecnologias (ex: React 19, PostgreSQL, Zustand)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 2.85rem',
              fontSize: '1rem',
              backgroundColor: 'var(--bg-card)',
              borderColor: searchQuery ? 'var(--cyan-500)' : 'var(--border-color)',
            }}
          />
          <Search
            size={18}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                padding: '0.25rem',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid',
              borderColor: selectedCategory === '' ? 'var(--yellow-500)' : 'var(--border-color)',
              background: selectedCategory === '' ? 'rgba(235, 164, 23, 0.15)' : 'var(--bg-card)',
              color: selectedCategory === '' ? 'var(--yellow-500)' : 'var(--text-title)',
            }}
          >
            Todos os Tópicos
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? '' : cat.slug)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: isSelected ? cat.color || 'var(--cyan-500)' : 'var(--border-color)',
                  background: isSelected ? `${cat.color || 'var(--cyan-500)'}25` : 'var(--bg-card)',
                  color: isSelected ? '#fff' : 'var(--text-title)',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Posts */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          <div className="animate-pulse-glow" style={{ fontSize: '1.2rem' }}>Carregando publicações...</div>
        </div>
      ) : posts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-color)',
          }}
        >
          <BookOpen size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>Nenhum artigo encontrado</h3>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
            Tente buscar por outros termos ou remover os filtros aplicados.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="btn-secondary"
            style={{ marginTop: '1.25rem' }}
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
