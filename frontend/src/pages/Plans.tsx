import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Zap, Crown, Shield, Sparkles, HelpCircle } from 'lucide-react';

export const Plans: React.FC = () => {
  const { isSubscribed, user, openSubscribe, subscribe, cancelSubscription, isAuthenticated, openLogin } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="container" style={{ padding: '3rem 2rem 6rem' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
        <div className="badge badge-premium" style={{ marginBottom: '1rem' }}>
          <Crown size={14} /> Planos Flexíveis
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
          Invista no seu crescimento como Desenvolvedor
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1.15rem' }}>
          Acesso sem limites a todos os artigos, releases traduzidas, guias arquiteturais e comunidade exclusiva.
        </p>

        {/* Billing Switch */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            marginTop: '2rem',
            gap: '0.25rem',
          }}
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: billingCycle === 'monthly' ? 'var(--yellow-500)' : 'transparent',
              color: billingCycle === 'monthly' ? '#121214' : 'var(--text-title)',
            }}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: billingCycle === 'annual' ? 'var(--cyan-500)' : 'transparent',
              color: billingCycle === 'annual' ? '#121214' : 'var(--text-title)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Anual <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#121214', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>20% OFF</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1080px',
          margin: '0 auto 5rem',
        }}
      >
        {/* 1. Free Plan */}
        <div
          className="card"
          style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Plano Free
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '1rem 0 1.5rem' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>$0</span>
              <span style={{ color: 'var(--text-muted)' }}>/sempre</span>
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Ideal para quem está conhecendo a plataforma e quer ler conteúdos introdutórios.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Acesso a artigos públicos/gratuitos',
                'Prévia dos primeiros parágrafos dos artigos premium',
                'Newsletter semanal gratuita',
              ].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-title)', fontSize: '0.9rem' }}>
                  <Check size={16} color="var(--green-500)" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              if (!isAuthenticated) openLogin();
            }}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '2.5rem' }}
          >
            {isAuthenticated ? 'Plano Atual' : 'Criar Conta Gratuita'}
          </button>
        </div>

        {/* 2. Monthly PRO */}
        <div
          className="card"
          style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: billingCycle === 'monthly' ? '2px solid var(--yellow-500)' : '1px solid var(--border-color)',
            position: 'relative',
          }}
        >
          {billingCycle === 'monthly' && (
            <span
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--yellow-500)',
                color: '#121214',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
              }}
            >
              Mais Popular
            </span>
          )}

          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--yellow-500)', textTransform: 'uppercase' }}>
              Plano Mensal PRO
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '1rem 0 1.5rem' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>$9.90</span>
              <span style={{ color: 'var(--text-muted)' }}>/mês</span>
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Acesso irrestrito a todo o catálogo com a flexibilidade de cancelar quando desejar.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Acesso 100% ilimitado a todos os artigos',
                'Lançamentos antecipados do ecossistema React 19',
                'Espaço para comentários e debates técnicos',
                'Salvar artigos favoritos para leitura offline',
                'Cancele a qualquer momento com 1 clique',
              ].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-title)', fontSize: '0.9rem' }}>
                  <Check size={16} color="var(--yellow-500)" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              if (isSubscribed) {
                // Já é assinante
              } else if (!isAuthenticated) {
                openLogin();
              } else {
                subscribe('price_monthly');
              }
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '2.5rem' }}
          >
            {isSubscribed ? 'Você já é PRO' : 'Assinar Plano Mensal'}
          </button>
        </div>

        {/* 3. Annual PRO */}
        <div
          className="card"
          style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: billingCycle === 'annual' ? '2px solid var(--cyan-500)' : '1px solid var(--border-color)',
            position: 'relative',
          }}
        >
          {billingCycle === 'annual' && (
            <span
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--cyan-500)',
                color: '#121214',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
              }}
            >
              Melhor Custo-Benefício
            </span>
          )}

          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cyan-500)', textTransform: 'uppercase' }}>
              Plano Anual PRO
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '1rem 0 1.5rem' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>$95.00</span>
              <span style={{ color: 'var(--text-muted)' }}>/ano</span>
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Equivalente a <strong>$7.90/mês</strong>. Pague uma vez e aproveite 12 meses completos.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Tudo incluso no Plano Mensal PRO',
                '2 meses inteiramente grátis',
                'Badge exclusivo de Assinante Anual no perfil',
                'Acesso prioritário a releases e novidades',
              ].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-title)', fontSize: '0.9rem' }}>
                  <Check size={16} color="var(--cyan-500)" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              if (isSubscribed) {
                //
              } else if (!isAuthenticated) {
                openLogin();
              } else {
                subscribe('price_annual');
              }
            }}
            className="btn-cyan"
            style={{ width: '100%', marginTop: '2.5rem' }}
          >
            {isSubscribed ? 'Você já é PRO' : 'Assinar Plano Anual (20% OFF)'}
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
          Perguntas Frequentes
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              q: 'Como funciona a cobrança e o cancelamento?',
              a: 'A assinatura é renovada automaticamente de acordo com o plano escolhido (mensal ou anual). Você pode cancelar a qualquer momento diretamente pelo seu painel sem burocracia.',
            },
            {
              q: 'Quais métodos de pagamento são aceitos?',
              a: 'Integramos via Stripe com suporte a cartões de crédito internacionais, Apple Pay e Google Pay.',
            },
            {
              q: 'Qual é a frequência de novas publicações?',
              a: 'Lançamos novas análises e notícias aprofundadas todos os dias úteis, cobrindo o ecossistema React, TypeScript, Next.js, arquitetura backend com Laravel e PostgreSQL.',
            },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="var(--cyan-500)" /> {item.q}
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
