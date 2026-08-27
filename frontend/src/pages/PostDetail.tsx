import React, { useState, useEffect } from 'react';
import { api, Post, Comment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Clock,
  Heart,
  Bookmark,
  Lock,
  Zap,
  Send,
  Sparkles,
  Share2,
  Check,
  MessageSquare
} from 'lucide-react';

interface PostDetailProps {
  postSlug: string;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postSlug, onBack }) => {
  const { isSubscribed, isAuthenticated, openSubscribe, openLogin, user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/${postSlug}`);
        if (res.data?.post) {
          const p = res.data.post;
          setPost(p);
          setBookmarked(p.is_bookmarked || false);
          setLikes(p.likes_count || 0);
          setComments(p.comments || []);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postSlug, isSubscribed]);

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      if (post) {
        try {
          await api.post(`/posts/${post.id}/like`);
        } catch {
          // Ignora erro em mock
        }
      }
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    setBookmarked(!bookmarked);
    if (post) {
      try {
        await api.post(`/posts/${post.id}/bookmark`);
      } catch {
        // Ignora erro em mock
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    setSubmittingComment(true);
    const tempComment: Comment = {
      id: Date.now(),
      post_id: post?.id || 1,
      user_id: user?.id || 1,
      content: newComment,
      likes_count: 0,
      created_at: new Date().toISOString(),
      user: {
        id: user?.id || 1,
        name: user?.name || 'Você',
        avatar: user?.avatar,
      },
    };

    setComments([tempComment, ...comments]);
    setNewComment('');

    if (post) {
      try {
        await api.post(`/posts/${post.id}/comments`, { content: newComment });
      } catch {
        // Mock
      }
    }
    setSubmittingComment(false);
  };

  if (loading && !post) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="animate-pulse-glow" style={{ fontSize: '1.2rem' }}>Carregando artigo completo...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Artigo não encontrado</h2>
        <button onClick={onBack} className="btn-secondary" style={{ marginTop: '1.5rem' }}>
          <ArrowLeft size={16} /> Voltar ao Feed
        </button>
      </div>
    );
  }

  const isLocked = post.is_premium && !isSubscribed;
  const formattedDate = new Date(post.published_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="container" style={{ maxWidth: '860px', padding: '3rem 1.5rem 6rem' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-body)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan-500)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
        >
          <ArrowLeft size={18} /> Voltar para Artigos
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleShare}
            className="btn-outline"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            title="Copiar link"
          >
            {copied ? <Check size={14} color="var(--green-500)" /> : <Share2 size={14} />}
            <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </button>

          <button
            onClick={handleBookmark}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: bookmarked ? 'var(--yellow-500)' : 'var(--text-muted)',
            }}
            title="Salvar artigo"
          >
            <Bookmark size={18} fill={bookmarked ? 'var(--yellow-500)' : 'transparent'} />
          </button>
        </div>
      </div>

      {/* Header Info */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {post.category && (
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `${post.category.color || 'var(--cyan-500)'}20`,
                color: post.category.color || 'var(--cyan-500)',
                border: `1px solid ${post.category.color || 'var(--cyan-500)'}50`,
              }}
            >
              {post.category.name}
            </span>
          )}

          {post.is_premium ? (
            <span className="badge badge-premium">
              <Lock size={12} /> Exclusivo para Assinantes
            </span>
          ) : (
            <span className="badge badge-free">
              <Sparkles size={12} /> Conteúdo Gratuito
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: 'auto' }}>
            <Clock size={14} /> {post.read_time} min de leitura • {formattedDate}
          </div>
        </div>

        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          {post.title}
        </h1>

        {/* Author Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <img
            src={post.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
            alt={post.user?.name}
            style={{ width: '3rem', height: '3rem', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'block' }}>
              {post.user?.name}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
              {post.user?.bio || 'Autor técnico e membro da comunidade Daily News.'}
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div
          style={{
            width: '100%',
            maxHeight: '440px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <img
            src={post.cover_image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Article Body Content */}
      <div className="article-content" style={{ position: 'relative' }}>
        <p style={{ fontSize: '1.25rem', color: '#e1e1e6', fontWeight: 500, lineHeight: 1.7, marginBottom: '2rem' }}>
          {post.summary}
        </p>

        {/* Render markdown-like sections */}
        <div
          dangerouslySetInnerHTML={{
            __html: (post.content || '')
              .replace(/### (.*?)\n/g, '<h3>$1</h3>')
              .replace(/## (.*?)\n/g, '<h2>$1</h2>')
              .replace(/> (.*?)\n/g, '<blockquote>$1</blockquote>')
              .replace(/```tsx([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/```typescript([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/```php([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/```sql([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/`([^`]+)`/g, '<code>$1</code>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br />'),
          }}
        />

        {/* PAYWALL / LOCK OVERLAY IF RESTRICTED */}
        {isLocked && (
          <div
            style={{
              position: 'relative',
              marginTop: '-3rem',
              paddingTop: '6rem',
              background: 'linear-gradient(to top, var(--bg-primary) 60%, transparent 100%)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(32, 32, 36, 0.98) 0%, rgba(26, 26, 30, 0.98) 100%)',
                border: '1px solid rgba(235, 164, 23, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: 'rgba(235, 164, 23, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Lock size={32} color="var(--yellow-500)" />
              </div>

              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                  Quer continuar lendo este artigo?
                </h2>
                <p style={{ color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
                  Inscreva-se no <strong style={{ color: '#fff' }}>Daily News PRO</strong> por apenas{' '}
                  <span style={{ color: 'var(--yellow-500)', fontWeight: 700 }}>$9.90 / mês</span> e tenha acesso irrestrito a todas as publicações.
                </p>
              </div>

              <button
                onClick={openSubscribe}
                className="btn-primary"
                style={{ padding: '0.95rem 2.5rem', fontSize: '1.1rem', marginTop: '0.5rem' }}
              >
                <Zap size={20} fill="#121214" />
                Subscribe Now 👏
              </button>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Já é assinante?{' '}
                <button onClick={openLogin} style={{ color: 'var(--cyan-500)', fontWeight: 600 }}>
                  Faça login para desbloquear
                </button>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Post Footer Actions: Likes & Tags */}
      <div
        style={{
          marginTop: '3.5rem',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: hasLiked ? 'rgba(247, 90, 104, 0.15)' : 'var(--bg-card)',
            border: hasLiked ? '1px solid var(--red-500)' : '1px solid var(--border-color)',
            color: hasLiked ? 'var(--red-500)' : 'var(--text-title)',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          <Heart size={18} fill={hasLiked ? 'var(--red-500)' : 'transparent'} />
          <span>{hasLiked ? 'Você curtiu' : 'Curtir este artigo'} ({likes})</span>
        </button>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Real-time Comments Section */}
      <section style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <MessageSquare size={22} color="var(--cyan-500)" />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
            Comentários ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleAddComment} style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <textarea
              rows={3}
              placeholder={
                isAuthenticated
                  ? 'Deixe seu comentário técnico ou dúvida sobre o artigo...'
                  : 'Faça login para participar da discussão...'
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!isAuthenticated}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                resize: 'vertical',
                color: '#fff',
                fontSize: '0.95rem',
                boxShadow: 'none',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="btn-cyan"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Send size={15} /> Publicar Comentário
              </button>
            </div>
          </div>
        </form>

        {/* Comments Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <img
                  src={comment.user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${comment.user?.name}`}
                  alt={comment.user?.name}
                  style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{comment.user?.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p style={{ color: 'var(--text-title)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '2.75rem' }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
