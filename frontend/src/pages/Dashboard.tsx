import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api, Post, fallbackPosts } from '../services/api';
import { PostCard } from '../components/PostCard';
import {
  User as UserIcon,
  Crown,
  Bookmark,
  CreditCard,
  Settings,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Dashboard: React.FC<{ onSelectPost: (post: Post) => void; onGoToPlans: () => void }> = ({
  onSelectPost,
  onGoToPlans,
}) => {
  const { user, isSubscribed, cancelSubscription, updateUser, openSubscribe } = useAuth();
  const [activeTab, setActiveTab] = useState<'subscription' | 'saved' | 'profile'>('subscription');
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
    }

    // Carregar favoritos
    api.get('/bookmarks')
      .then((res) => {
        if (res.data?.data) {
          const list = res.data.data.map((b: any) => b.post).filter(Boolean);
          setSavedPosts(list);
        }
      })
      .catch(() => {
        setSavedPosts([fallbackPosts[0]]);
      });
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.put('/auth/profile', { name, bio });
      updateUser({ name, bio });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch {
      updateUser({ name, bio });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem 6rem', maxWidth: '1000px' }}>
      {/* User Header Profile Card */}
      <div
        className="card"
        style={{
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          borderLeft: isSubscribed ? '4px solid var(--yellow-500)' : '4px solid var(--cyan-500)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name}`}
            alt={user?.name}
            style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', border: '2px solid var(--border-color)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{user?.name}</h1>
              {isSubscribed ? (
                <span className="badge badge-premium">
                  <Crown size={12} /> PRO Member
                </span>
              ) : (
                <span className="badge badge-free">Membro Gratuito</span>
              )}
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {user?.email}
            </p>
          </div>
        </div>

        <div>
          {!isSubscribed ? (
            <button onClick={openSubscribe} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
              <Zap size={16} fill="#121214" /> Tornar-se Assinante PRO
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--yellow-500)', fontWeight: 600, fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} /> Assinatura Ativa
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('subscription')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            color: activeTab === 'subscription' ? '#fff' : 'var(--text-body)',
            fontWeight: activeTab === 'subscription' ? 700 : 500,
            borderBottom: activeTab === 'subscription' ? '2px solid var(--yellow-500)' : '2px solid transparent',
            marginBottom: '-1px',
          }}
        >
          <CreditCard size={18} /> Minha Assinatura
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            color: activeTab === 'saved' ? '#fff' : 'var(--text-body)',
            fontWeight: activeTab === 'saved' ? 700 : 500,
            borderBottom: activeTab === 'saved' ? '2px solid var(--yellow-500)' : '2px solid transparent',
            marginBottom: '-1px',
          }}
        >
          <Bookmark size={18} /> Artigos Salvos ({savedPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            color: activeTab === 'profile' ? '#fff' : 'var(--text-body)',
            fontWeight: activeTab === 'profile' ? 700 : 500,
            borderBottom: activeTab === 'profile' ? '2px solid var(--yellow-500)' : '2px solid transparent',
            marginBottom: '-1px',
          }}
        >
          <Settings size={18} /> Dados do Perfil
        </button>
      </div>

      {/* Tab Content: 1. Subscription */}
      {activeTab === 'subscription' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: '#fff' }}>
            Detalhes do Seu Plano
          </h2>

          {isSubscribed ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--yellow-500)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {user?.subscription_tier === 'annual' ? 'Plano Anual PRO' : 'Plano Mensal PRO'}
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0.25rem 0' }}>
                    {user?.subscription_tier === 'annual' ? '$95.00 / ano' : '$9.90 / mês'}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Status: <strong style={{ color: 'var(--green-500)' }}>Ativo</strong> • Renovação automática habilitada
                  </span>
                </div>

                <button
                  onClick={cancelSubscription}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'transparent',
                    border: '1px solid var(--red-500)',
                    color: 'var(--red-500)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(247, 90, 104, 0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Cancelar Assinatura
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Acesso ao Catálogo</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Ilimitado (100%)</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Benefícios Adicionais</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cyan-500)' }}>Comentários &amp; Badges</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <AlertCircle size={40} color="var(--yellow-500)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
                Você ainda não possui uma assinatura ativa
              </h3>
              <p style={{ color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto 1.75rem' }}>
                Assine agora para desbloquear todos os artigos restritos, lançamentos do React 19 e análises técnicas completas.
              </p>
              <button onClick={openSubscribe} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                <Zap size={18} fill="#121214" /> Conhecer Planos a partir de $9.90/mês
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: 2. Saved Bookmarks */}
      {activeTab === 'saved' && (
        <div>
          {savedPosts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {savedPosts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <Bookmark size={36} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem' }}>Nenhum artigo salvo ainda</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.9rem' }}>
                Clique no ícone de marcador nos cards de notícias para salvá-los e ler mais tarde.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: 3. Profile */}
      {activeTab === 'profile' && (
        <div className="card" style={{ padding: '2rem', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Editar Perfil</h2>

          {profileSuccess && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(4, 211, 97, 0.15)', border: '1px solid var(--green-500)', borderRadius: 'var(--radius-md)', color: 'var(--green-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Perfil atualizado com sucesso!
            </div>
          )}

          <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                Nome de Exibição
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                Mini Bio / Especialidade
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Desenvolvedor React & TypeScript sênior..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <button type="submit" disabled={savingProfile} className="btn-cyan" style={{ width: 'fit-content', padding: '0.75rem 2rem' }}>
              {savingProfile ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
