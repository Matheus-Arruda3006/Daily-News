import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Check, Zap, Sparkles, Shield, Crown } from 'lucide-react';

export const SubscribeModal: React.FC = () => {
  const { subscribeModalOpen, setSubscribeModalOpen, subscribe, isAuthenticated, openLogin } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'price_monthly' | 'price_annual'>('price_monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!subscribeModalOpen) return null;

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      setSubscribeModalOpen(false);
      openLogin();
      return;
    }

    setIsProcessing(true);
    try {
      await subscribe(selectedPlan);
    } finally {
      setIsProcessing(false);
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
      onClick={() => setSubscribeModalOpen(false)}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '560px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSubscribeModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-muted)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              background: 'rgba(235, 164, 23, 0.15)',
              border: '1px solid rgba(235, 164, 23, 0.3)',
              marginBottom: '1rem',
            }}
          >
            <Crown size={28} color="var(--yellow-500)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
            Desbloqueie o <span className="gradient-text-yellow">Daily News PRO</span>
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
            Acesso ilimitado a todas as publicações técnicas, guias práticos e bastidores do ecossistema React.
          </p>
        </div>

        {/* Plans Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Monthly */}
          <div
            onClick={() => setSelectedPlan('price_monthly')}
            style={{
              border: selectedPlan === 'price_monthly' ? '2px solid var(--yellow-500)' : '1px solid var(--border-color)',
              background: selectedPlan === 'price_monthly' ? 'rgba(235, 164, 23, 0.08)' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mensal</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>$9.90</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>/mês</span>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Cobrado mensalmente
            </span>
          </div>

          {/* Annual */}
          <div
            onClick={() => setSelectedPlan('price_annual')}
            style={{
              border: selectedPlan === 'price_annual' ? '2px solid var(--cyan-500)' : '1px solid var(--border-color)',
              background: selectedPlan === 'price_annual' ? 'rgba(97, 218, 251, 0.08)' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '12px',
                background: 'var(--cyan-500)',
                color: '#121214',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
              }}
            >
              20% OFF
            </span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--cyan-500)' }}>Anual</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>$95.00</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>/ano</span>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Economize 2 meses inteiros
            </span>
          </div>
        </div>

        {/* Benefits List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
          {[
            'Acesso total e instantâneo a todos os artigos do catálogo',
            'Novidades em primeira mão sobre React 19, Next.js e TypeScript',
            'Discussões técnicas e área de comentários exclusiva',
            'Sem anúncios e com cancelamento fácil a qualquer momento',
          ].map((benefit, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-title)' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'rgba(4, 211, 97, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={12} color="var(--green-500)" strokeWidth={3} />
              </div>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
        >
          {isProcessing ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} className="animate-pulse-glow" /> Ativando Assinatura...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} fill="#121214" />
              {isAuthenticated ? 'Confirmar Assinatura Agora' : 'Entrar e Assinar'}
            </span>
          )}
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
          }}
        >
          <Shield size={14} /> Pagamento seguro simulado para demonstração imediata
        </div>
      </div>
    </div>
  );
};
