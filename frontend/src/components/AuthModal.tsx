import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    loginWithGithub,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch {
      setErrorMessage('Falha ao autenticar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'admin' | 'premium' | 'free') => {
    setLoading(true);
    try {
      if (role === 'admin') {
        await login('admin@dailynews.com', 'password123');
      } else if (role === 'premium') {
        await login('premium@dailynews.com', 'password123');
      } else {
        await login('camila@example.com', 'password123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={() => setAuthModalOpen(false)}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '460px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-muted)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
            {authModalMode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.9rem' }}>
            {authModalMode === 'login'
              ? 'Acesse sua conta para continuar suas leituras'
              : 'Junte-se à comunidade de desenvolvedores do Daily News'}
          </p>
        </div>

        {/* Quick GitHub Login */}
        <button
          onClick={() => loginWithGithub()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#24292e',
            color: '#fff',
            fontWeight: 700,
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #3c444d',
            marginBottom: '1.25rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2f363d')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#24292e')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--yellow-500)">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Continuar com GitHub</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ou com e-mail</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        {errorMessage && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(247, 90, 104, 0.1)',
              border: '1px solid rgba(247, 90, 104, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--red-500)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {authModalMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                Nome Completo
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                />
                <UserIcon size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem' }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem' }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-cyan"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Processando...' : authModalMode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
          {authModalMode === 'login' ? (
            <span>
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                style={{ color: 'var(--cyan-500)', fontWeight: 600 }}
              >
                Cadastre-se grátis
              </button>
            </span>
          ) : (
            <span>
              Já possui conta?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                style={{ color: 'var(--cyan-500)', fontWeight: 600 }}
              >
                Faça login
              </button>
            </span>
          )}
        </div>

        {/* Quick Demo Test Buttons */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px dashed var(--border-subtle)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            ⚡ Contas de Teste Rápido (1 clique):
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="badge badge-cyan"
              style={{ cursor: 'pointer' }}
            >
              <Sparkles size={11} /> Admin / Autor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('premium')}
              className="badge badge-premium"
              style={{ cursor: 'pointer' }}
            >
              Assinante PRO
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('free')}
              className="badge badge-free"
              style={{ cursor: 'pointer' }}
            >
              Usuário Grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
