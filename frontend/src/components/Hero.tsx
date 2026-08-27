import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  priceAmount?: number;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, priceAmount = 9.90 }) => {
  const { isSubscribed, openSubscribe } = useAuth();

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0 3rem' }}>
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97, 218, 251, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(235, 164, 23, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Text & CTAs */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Tag pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(235, 164, 23, 0.1)',
                border: '1px solid rgba(235, 164, 23, 0.25)',
                color: 'var(--yellow-500)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
                width: 'fit-content',
              }}
            >
              <span>👏 Hey, welcome!</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fff' }}>
                <Flame size={14} color="var(--yellow-500)" /> Edição Diária 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: '3.6rem',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}
            >
              News about the <span className="gradient-text-cyan">React</span> world &amp; Architecture.
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--text-body)',
                lineHeight: 1.6,
                maxWidth: '520px',
              }}
            >
              Tenha acesso ilimitado a análises profundas, guias de migração, novas releases e tutoriais avançados por apenas{' '}
              <span style={{ color: 'var(--cyan-500)', fontWeight: 700 }}>
                ${priceAmount.toFixed(2)} / mês
              </span>
              .
            </p>

            {/* CTA Group */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
              {isSubscribed ? (
                <button onClick={onExplore} className="btn-cyan" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
                  <Sparkles size={18} /> Explorar Artigos Exclusivos
                </button>
              ) : (
                <button onClick={openSubscribe} className="btn-primary">
                  <Zap size={18} fill="#121214" />
                  Subscribe Now
                </button>
              )}

              <button onClick={onExplore} className="btn-secondary">
                Ver Feed de Notícias <ArrowRight size={16} />
              </button>
            </div>

            {/* Feature Checkmarks */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-body)', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} color="var(--green-500)" /> Sem anúncios
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-body)', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} color="var(--green-500)" /> Curadoria sênior
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-body)', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="var(--cyan-500)" /> Cancele quando quiser
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration & Interactive Cards */}
          <div
            className="animate-fade-in"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer decorative ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px dashed rgba(97, 218, 251, 0.2)',
                  animation: 'spin 40s linear infinite',
                }}
              />

              {/* Main Avatar SVG */}
              <img
                src="/images/avatar.svg"
                alt="Girl coding React"
                style={{
                  width: '90%',
                  height: 'auto',
                  zIndex: 2,
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))',
                }}
                onError={(e) => {
                  // Fallback se o SVG não renderizar
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80';
                }}
              />

              {/* Floating Floating Badge 1: React 19 */}
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '-5%',
                  background: 'rgba(26, 26, 30, 0.95)',
                  border: '1px solid rgba(97, 218, 251, 0.4)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--cyan-500)', boxShadow: '0 0 8px var(--cyan-500)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>React 19 Ready</span>
              </div>

              {/* Floating Badge 2: PostgreSQL & Laravel */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  right: '-5%',
                  background: 'rgba(26, 26, 30, 0.95)',
                  border: '1px solid rgba(235, 164, 23, 0.4)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--yellow-500)', boxShadow: '0 0 8px var(--yellow-500)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Laravel + PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
