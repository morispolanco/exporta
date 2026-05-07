import React from 'react';

export default function LandingPage({ onGetStarted }) {
  const features = [
    {
      title: "Cumplimiento ESG y EUDR",
      desc: "Generación automática de declaraciones de Due Diligence y checklists para Rainforest Alliance y GlobalGAP.",
      icon: "🌿"
    },
    {
      title: "Comunicación Global",
      desc: "Traducción y redacción de contratos, proformas y RFQs en inglés, francés, alemán y japonés.",
      icon: "🌍"
    },
    {
      title: "Inteligencia de Mercados",
      desc: "Análisis de precios spot y simuladores de margen FOB basados en datos reales de Guatemala.",
      icon: "📊"
    },
    {
      title: "Logística Optimizada",
      desc: "Calendarios de cosecha por región y recomendaciones de contenedores (Dry/Reefer).",
      icon: "🚢"
    }
  ];

  return (
    <div className="landing-container" style={{ 
      background: 'var(--color-dark-bg)', 
      minHeight: '100vh', 
      color: '#fff',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(11, 17, 16, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-icon">🇬🇹</div>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>AgroExport <span style={{ color: 'var(--color-primary)' }}>Agent</span></span>
        </div>
        <button className="btn-primary" onClick={onGetStarted}>Entrar al Portal</button>
      </nav>

      <header style={{ padding: '120px 48px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(18, 201, 129, 0.1) 0%, transparent 70%)',
          zIndex: -1
        }}></div>
        <h1 style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px' }}>
          Lleva el campo de Guatemala <br/>
          <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>al mundo entero</span>
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto 40px' }}>
          La primera inteligencia artificial especializada en exportaciones de café, cardamomo y banano. Cumplimiento legal, logística y mercados en un solo lugar.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }} onClick={onGetStarted}>Empezar ahora — 10 consultas gratis</button>
        </div>
      </header>

      {/* Partners */}
      <section style={{ padding: '40px 48px', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
        <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>Alineado con estándares de</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', opacity: 0.6, flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '20px' }}>AGEXPORT</strong>
          <strong style={{ fontSize: '20px' }}>ANACAFÉ</strong>
          <strong style={{ fontSize: '20px' }}>MAGA</strong>
          <strong style={{ fontSize: '20px' }}>BANGUAT</strong>
          <strong style={{ fontSize: '20px' }}>SAT</strong>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 48px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '40px', marginBottom: '64px' }}>Potencia tu capacidad exportadora</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} className="module-item" style={{ padding: '40px', background: 'var(--color-dark-surface-elevated)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '40px', marginBottom: '24px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '22px', marginBottom: '16px', color: '#fff' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 48px', textAlign: 'center', background: 'linear-gradient(rgba(18, 201, 129, 0.05), transparent)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px', borderRadius: '40px', background: 'var(--color-dark-surface)', border: '1px solid var(--color-border)', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>¿Listo para tu próximo embarque?</h2>
          <p style={{ marginBottom: '40px', color: 'var(--color-text-muted)', fontSize: '18px' }}>Únete a los exportadores guatemaltecos que ya están optimizando sus procesos con inteligencia artificial.</p>
          <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }} onClick={onGetStarted}>Crear mi cuenta gratuita</button>
        </div>
      </section>

      <footer style={{ padding: '64px 48px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px', borderTop: '1px solid var(--color-border)' }}>
        <p>© 2026 AgroExport Intelligence Agent. Desarrollado para el mercado guatemalteco.</p>
        <p style={{ marginTop: '12px' }}>Soporte: mp@ufm.edu</p>
      </footer>
    </div>
  );
}
