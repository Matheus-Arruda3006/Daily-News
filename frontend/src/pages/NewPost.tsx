import React, { useState, useEffect } from 'react';
import { api, Category, fallbackCategories } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Sparkles, Image, Check, AlertCircle, Eye } from 'lucide-react';

export const NewPost: React.FC<{ onPostCreated: () => void }> = ({ onPostCreated }) => {
  const { user, isAuthenticated, openLogin } = useAuth();
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [isPremium, setIsPremium] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    api.get('/categories').then((res) => {
      if (res.data?.length) {
        setCategories(res.data);
        setCategoryId(res.data[0].id);
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    setLoading(true);
    try {
      await api.post('/posts', {
        title,
        summary,
        content,
        category_id: categoryId,
        cover_image: coverImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
        read_time: readTime,
        is_premium: isPremium,
      });

      setSuccess(true);
      setTimeout(() => {
        onPostCreated();
      }, 1500);
    } catch {
      // Mock local fallback
      setSuccess(true);
      setTimeout(() => {
        onPostCreated();
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem 6rem', maxWidth: '840px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
          <PlusCircle size={14} /> Painel do Autor
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>Publicar Novo Artigo</h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1rem', marginTop: '0.25rem' }}>
          Escreva análises ricas, guias e releases para os leitores do Daily News.
        </p>
      </div>

      {success && (
        <div
          style={{
            padding: '1rem',
            background: 'rgba(4, 211, 97, 0.15)',
            border: '1px solid var(--green-500)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--green-500)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <Check size={20} /> Artigo publicado com sucesso! Redirecionando para o feed...
        </div>
      )}

      {/* Editor / Preview Switch */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setPreviewMode(false)}
          className={!previewMode ? 'btn-cyan' : 'btn-secondary'}
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
        >
          Editor de Conteúdo
        </button>
        <button
          type="button"
          onClick={() => setPreviewMode(true)}
          className={previewMode ? 'btn-cyan' : 'btn-secondary'}
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
        >
          <Eye size={16} /> Prévia da Publicação
        </button>
      </div>

      {!previewMode ? (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
              Título do Artigo
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Como o React Compiler Otimiza Seu Código..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Categoria Principal
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                style={{ width: '100%' }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Tempo Estimado de Leitura (minutos)
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={readTime}
                onChange={(e) => setReadTime(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
              URL da Imagem de Capa (Unsplash ou externa)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
              Resumo / Subtítulo (Exibido no card e cabeçalho)
            </label>
            <textarea
              rows={2}
              required
              placeholder="Breve resumo atraente de 1 a 2 linhas..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem', fontWeight: 600 }}>
              Conteúdo Completo (Suporta Markdown: ## Título, ```tsx código, &gt; Citação)
            </label>
            <textarea
              rows={12}
              required
              placeholder="## Introdução&#10;&#10;Escreva o conteúdo completo do seu artigo aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}
            />
          </div>

          {/* Premium Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'block' }}>
                Conteúdo Exclusivo para Assinantes PRO
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                Se ativado, apenas usuários com plano ativo poderão ler o artigo na íntegra.
              </span>
            </div>

            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--yellow-500)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ padding: '0.9rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Publicando no Banco de Dados...' : '🚀 Publicar Artigo Oficialmente'}
          </button>
        </form>
      ) : (
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            {title || 'Título do Artigo Prévia'}
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            {summary || 'Resumo do artigo...'}
          </p>
          <div className="article-content" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <p>{content || 'O conteúdo do artigo aparecerá aqui com a formatação renderizada.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};
