import React, { useState } from 'react';
import { api } from '../services/api';
import { Sparkles, Send, CheckCircle2, Heart, Database, Server, Code, Shield } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #61dafb 0%, #eba417 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="#121214" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>
                daily<span style={{ color: 'var(--cyan-500)' }}>.news</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A plataforma premium de notícias e publicações técnicas para desenvolvedores que respiram inovação no ecossistema React e arquitetura Fullstack moderna.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                <Code size={11} /> React 19 + TS
              </span>
              <span className="badge" style={{ fontSize: '0.7rem', background: 'rgba(255, 45, 32, 0.15)', color: '#ff2d20', border: '1px solid rgba(255, 45, 32, 0.3)' }}>
                <Server size={11} /> Laravel 11
              </span>
              <span className="badge" style={{ fontSize: '0.7rem', background: 'rgba(49, 120, 198, 0.15)', color: '#3178c6', border: '1px solid rgba(49, 120, 198, 0.3)' }}>
                <Database size={11} /> PostgreSQL + pgAdmin
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>
              Navegação Rápida
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-body)' }}>
              <li>
                <button onClick={() => onNavigate('home')} style={{ color: 'inherit' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan-500)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('posts')} style={{ color: 'inherit' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan-500)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                  Todas as Publicações
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} style={{ color: 'inherit' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan-500)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                  Planos de Assinatura
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('database')} style={{ color: 'inherit' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan-500)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                  Guia pgAdmin &amp; Banco de Dados
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Newsletter Semanal
            </h4>
            <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Receba os melhores resumos técnicos e novidades direto no seu e-mail toda segunda-feira.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(4, 211, 97, 0.1)',
                  border: '1px solid rgba(4, 211, 97, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--green-500)',
                  fontSize: '0.85rem',
                }}
              >
                <CheckCircle2 size={18} /> Inscrição confirmada com sucesso!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
                />
                <button type="submit" disabled={loading} className="btn-cyan" style={{ padding: '0.65rem 1rem' }}>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>© 2026 Daily News. Todos os direitos reservados.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Construído com <Heart size={14} color="var(--red-500)" fill="var(--red-500)" /> para desenvolvedores React &amp; Laravel.
          </div>
        </div>
      </div>
    </footer>
  );
};
