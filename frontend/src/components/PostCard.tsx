import React, { useState } from 'react';
import { Post, api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Clock, Bookmark, Lock, Sparkles, Heart } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const { isAuthenticated, isSubscribed, openLogin } = useAuth();
  const [bookmarked, setBookmarked] = useState(post.is_bookmarked || false);
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const formattedDate = new Date(post.published_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    setBookmarked(!bookmarked);
    try {
      await api.post(`/posts/${post.id}/bookmark`);
    } catch {
      // Falha silenciosa em mock
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      try {
        await api.post(`/posts/${post.id}/like`);
      } catch {
        // Falha silenciosa em mock
      }
    }
  };

  const isRestricted = post.is_premium && !isSubscribed;

  return (
    <article
      className="card"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Cover Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          backgroundColor: '#1a1a1e',
        }}
      >
        <img
          src={post.cover_image || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80'}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(32, 32, 36, 0.95) 0%, transparent 60%)',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '0.875rem',
            left: '0.875rem',
            right: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          {post.category && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(18, 18, 20, 0.85)',
                color: post.category.color || 'var(--cyan-500)',
                border: `1px solid ${post.category.color || 'var(--cyan-500)'}40`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {post.category.name}
            </span>
          )}

          {post.is_premium ? (
            <span className="badge badge-premium" style={{ backdropFilter: 'blur(8px)' }}>
              <Lock size={12} /> Exclusivo
            </span>
          ) : (
            <span className="badge badge-free" style={{ backdropFilter: 'blur(8px)' }}>
              <Sparkles size={12} /> Gratuito
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
        {/* Meta info: Read time and date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={13} /> {post.read_time} min de leitura
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Post Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--text-white)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h3>

        {/* Post Summary */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-body)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {post.summary}
        </p>

        {/* Footer: Author info, likes & bookmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.875rem',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={post.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={post.user?.name}
              style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-title)' }}>
              {post.user?.name?.split(' ')[0]}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: hasLiked ? 'var(--red-500)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                padding: '0.25rem',
              }}
              title="Curtir artigo"
            >
              <Heart size={16} fill={hasLiked ? 'var(--red-500)' : 'transparent'} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleBookmark}
              style={{
                color: bookmarked ? 'var(--yellow-500)' : 'var(--text-muted)',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Salvar artigo"
            >
              <Bookmark size={17} fill={bookmarked ? 'var(--yellow-500)' : 'transparent'} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
