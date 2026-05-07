export default function Sidebar({ user, onAdminClick, onLogout }) {
  const modules = [
    {
      id: 1,
      title: "Trazabilidad y ESG",
      desc: "EUDR, Rainforest, GlobalGAP, Cadena de Custodia.",
      icon: "📋"
    },
    {
      id: 2,
      title: "Comunicación Internacional",
      desc: "Proformas, Contratos, RFQ, Traducciones Multi-idioma.",
      icon: "🌍"
    },
    {
      id: 3,
      title: "Inteligencia de Precios",
      desc: "Análisis spot, Simuladores FOB, Fletes, Estrategia.",
      icon: "📈"
    },
    {
      id: 4,
      title: "Logística y Exportación",
      desc: "Calendarios, Contenedores, Documentos aduanales.",
      icon: "🚢"
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">🇬🇹</div>
        <div className="logo-text">
          <h1>AgroExport Agent</h1>
          <span>Inteligencia v1.0</span>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="module-list">
          {modules.map(mod => (
            <div key={mod.id} className="module-item">
              <div className="module-item-header">
                <span className="module-icon">{mod.icon}</span>
                <span className="module-title">{mod.title}</span>
              </div>
              <div className="module-desc">{mod.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
          Usuario: <strong style={{ color: '#fff' }}>{user.username}</strong>
          {user.role === 'demo' && <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)' }}>Cuenta Demo</span>}
        </div>
        {user.role === 'admin' && (
          <button className="btn-primary" style={{ padding: '8px', fontSize: '13px' }} onClick={onAdminClick}>⚙️ Administración</button>
        )}
        <button className="btn-primary" style={{ padding: '8px', fontSize: '13px', background: 'transparent', border: '1px solid var(--color-border)', boxShadow: 'none' }} onClick={onLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}
