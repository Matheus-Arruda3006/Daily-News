import React, { useState } from 'react';
import { Database, Server, Terminal, Copy, Check, ExternalLink, ShieldCheck, Table } from 'lucide-react';

export const DatabaseGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tables = [
    { name: 'users', desc: 'Usuários, roles (user/author/admin), avatar, status de assinatura e credenciais' },
    { name: 'posts', desc: 'Artigos técnicos, slug, resumo, markdown, capa, tempo de leitura e paywall flag' },
    { name: 'categories', desc: 'Tópicos principais (React 19, Next.js, TypeScript, Laravel, IA) e cores' },
    { name: 'tags & post_tag', desc: 'Tags e relacionamento Many-to-Many com publicações' },
    { name: 'subscriptions', desc: 'Histórico de pagamentos, plano mensal/anual, datas de expiração e status' },
    { name: 'comments', desc: 'Comentários da comunidade vinculados aos posts com contagem de likes' },
    { name: 'bookmarks', desc: 'Artigos salvos na biblioteca pessoal de cada usuário' },
    { name: 'newsletters', desc: 'Inscrições na newsletter semanal da plataforma' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 2rem 6rem', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
          <Database size={14} /> PostgreSQL &amp; pgAdmin 4
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>
          Guia de Gerenciamento do Banco de Dados
        </h1>
        <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Instruções completas para inspecionar, conectar e gerenciar seu banco relacional PostgreSQL através do pgAdmin 4.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* 1. pgAdmin 4 Web Interface Box */}
        <div className="card" style={{ padding: '2rem', borderTop: '4px solid var(--cyan-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(97, 218, 251, 0.15)', color: 'var(--cyan-500)' }}>
              <Server size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>pgAdmin 4 (Interface Web)</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Porta: 5050</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>URL de Acesso:</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '0.25rem' }}>
                <code style={{ color: 'var(--cyan-500)' }}>http://localhost:5050</code>
                <a href="http://localhost:5050" target="_blank" rel="noreferrer" style={{ color: 'var(--text-body)' }}>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>E-mail de Login:</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '0.25rem' }}>
                <code>admin@dailynews.com</code>
                <button onClick={() => copyToClipboard('admin@dailynews.com', 'pg-email')} style={{ color: 'var(--text-body)' }}>
                  {copiedKey === 'pg-email' ? <Check size={16} color="var(--green-500)" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Senha de Login:</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '0.25rem' }}>
                <code>admin</code>
                <button onClick={() => copyToClipboard('admin', 'pg-pass')} style={{ color: 'var(--text-body)' }}>
                  {copiedKey === 'pg-pass' ? <Check size={16} color="var(--green-500)" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PostgreSQL Direct Connection */}
        <div className="card" style={{ padding: '2rem', borderTop: '4px solid var(--yellow-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(235, 164, 23, 0.15)', color: 'var(--yellow-500)' }}>
              <Database size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Credenciais do PostgreSQL</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Porta: 5432</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Host:</span>
              <strong style={{ color: '#fff' }}>localhost / 127.0.0.1</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Database:</span>
              <strong style={{ color: 'var(--cyan-500)' }}>daily_news</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Username:</span>
              <strong style={{ color: '#fff' }}>postgres</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Password:</span>
              <strong style={{ color: 'var(--yellow-500)' }}>password</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Docker Compose Command Section */}
      <div className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} color="var(--green-500)" />
          Inicialização via Docker Compose (1 Comando)
        </h3>
        <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          Se desejar rodar o container oficial do PostgreSQL junto com o pgAdmin no seu ambiente Docker, basta executar na raiz do projeto:
        </p>

        <div style={{ background: '#0a0a0c', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)' }}>
          <code style={{ color: 'var(--cyan-500)', fontSize: '1rem' }}>docker compose up -d</code>
          <button onClick={() => copyToClipboard('docker compose up -d', 'cmd-docker')} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
            {copiedKey === 'cmd-docker' ? <Check size={14} color="var(--green-500)" /> : <Copy size={14} />}
            <span>{copiedKey === 'cmd-docker' ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* 4. Database Schema Tables List */}
      <div>
        <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Table size={20} color="var(--cyan-500)" />
          Tabelas Criadas no PostgreSQL
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {tables.map((t, idx) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--yellow-500)', fontSize: '1rem', display: 'block', marginBottom: '0.35rem' }}>
                public.{t.name}
              </span>
              <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: 1.5 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
