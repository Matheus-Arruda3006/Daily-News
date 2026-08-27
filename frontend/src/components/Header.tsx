import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  BookOpen,
  CreditCard,
  PlusCircle,
  Database,
  LogOut,
  User as UserIcon,
  Crown,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { user, isAuthenticated, isSubscribed, openLogin, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="glass-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }}>
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #61dafb 0%, #eba417 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(97, 218, 251, 0.4)',
            }}
          >
            <Sparkles size={22} color="#121214" strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', color: '#fff' }}>
              daily<span style={{ color: 'var(--cyan-500)' }}>.news</span>
            </span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '-2px' }}>
              React & Fullstack Hub
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button
            onClick={() => setCurrentTab('home')}
            style={{
              color: currentTab === 'home' ? 'var(--text-white)' : 'var(--text-body)',
              fontWeight: currentTab === 'home' ? 700 : 500,
              fontSize: '0.95rem',
              position: 'relative',
              padding: '0.5rem 0',
            }}
          >
            Home
            {currentTab === 'home' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                  background: 'var(--yellow-500)',
                  boxShadow: '0 0 8px var(--yellow-500)',
                }}
              />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('posts')}
            style={{
              color: currentTab === 'posts' ? 'var(--text-white)' : 'var(--text-body)',
              fontWeight: currentTab === 'posts' ? 700 : 500,
              fontSize: '0.95rem',
              position: 'relative',
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <BookOpen size={16} />
            Publicações
            {currentTab === 'posts' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                  background: 'var(--yellow-500)',
                  boxShadow: '0 0 8px var(--yellow-500)',
                }}
              />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('plans')}
            style={{
              color: currentTab === 'plans' ? 'var(--text-white)' : 'var(--text-body)',
              fontWeight: currentTab === 'plans' ? 700 : 500,
              fontSize: '0.95rem',
              position: 'relative',
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <CreditCard size={16} />
            Planos
            {currentTab === 'plans' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                  background: 'var(--yellow-500)',
                  boxShadow: '0 0 8px var(--yellow-500)',
                }}
              />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('database')}
            style={{
              color: currentTab === 'database' ? 'var(--text-white)' : 'var(--text-body)',
              fontWeight: currentTab === 'database' ? 700 : 500,
              fontSize: '0.95rem',
              position: 'relative',
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Database size={16} color="var(--cyan-500)" />
            pgAdmin & DB
            {currentTab === 'database' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                  background: 'var(--cyan-500)',
                  boxShadow: '0 0 8px var(--cyan-500)',
                }}
              />
            )}
          </button>
        </nav>

        {/* Right Actions / Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'var(--bg-card)',
                  padding: '0.4rem 0.8rem 0.4rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name}`}
                  alt={user?.name}
                  style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#29292e' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
                  {user?.name?.split(' ')[0]}
                </span>
                {isSubscribed && (
                  <span className="badge badge-premium" style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}>
                    <Crown size={11} /> PRO
                  </span>
                )}
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '220px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <button
                    onClick={() => {
                      setCurrentTab('dashboard');
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-title)',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <UserIcon size={16} /> Meu Perfil & Salvos
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('new-post');
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-title)',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <PlusCircle size={16} color="var(--cyan-500)" /> Criar Novo Artigo
                  </button>

                  <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.25rem 0' }} />

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--red-500)',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(247, 90, 104, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={16} /> Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-card)',
                color: 'var(--text-white)',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid var(--border-color)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--yellow-500)';
                e.currentTarget.style.color = 'var(--yellow-500)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-white)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--yellow-500)">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
