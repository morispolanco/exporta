import { useState, useEffect } from 'react';

export default function AdminPage({ onBack }) {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('expo_users') || '[]');
    setUsers(storedUsers);
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;
    const updated = [...users, { username: newUsername, password: newPassword }];
    localStorage.setItem('expo_users', JSON.stringify(updated));
    setUsers(updated);
    setNewUsername('');
    setNewPassword('');
  };

  const removeUser = (username) => {
    const updated = users.filter(u => u.username !== username);
    localStorage.setItem('expo_users', JSON.stringify(updated));
    setUsers(updated);
  };

  const demoStats = JSON.parse(localStorage.getItem('expo_demo_stats') || '{"sessions": 0, "queries": 0}');

  return (
    <div className="app-container" style={{ padding: '40px', overflowY: 'auto', display: 'block' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 className="modal-title" style={{ textAlign: 'left', margin: 0 }}>Administración de Usuarios</h2>
          <button className="btn-primary" onClick={onBack}>Volver al Chat</button>
        </div>

        <div className="module-item" style={{ marginBottom: '32px', background: 'var(--color-dark-surface-elevated)' }}>
          <h3 style={{ color: '#fff', marginBottom: '16px' }}>Estado Cuenta Demo</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Sesiones usadas: <strong>{demoStats.sessions}/10</strong></p>
          <p style={{ color: 'var(--color-text-muted)' }}>Consultas usadas: <strong>{demoStats.queries}/10</strong></p>
          <progress value={Math.max(demoStats.sessions, demoStats.queries)} max="10" style={{ width: '100%', marginTop: '10px' }}></progress>
        </div>

        <div className="module-item" style={{ marginBottom: '32px' }}>
          <h3 style={{ color: '#fff', marginBottom: '16px' }}>Agregar Usuario Autorizado</h3>
          <form onSubmit={addUser} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="chat-input" 
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              placeholder="Usuario"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
            />
            <input 
              type="password" 
              className="chat-input" 
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              placeholder="Contraseña"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button type="submit" className="btn-primary">Agregar</button>
          </form>
        </div>

        <div className="module-item">
          <h3 style={{ color: '#fff', marginBottom: '16px' }}>Usuarios Registrados</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-text-muted)' }}>Usuario</th>
                <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-text-muted)' }}>Consultas</th>
                <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-text-muted)' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.username} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px' }}>{u.username}</td>
                  <td style={{ padding: '12px' }}>{u.queries || 0}/30</td>
                  <td style={{ padding: '12px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }} onClick={() => removeUser(u.username)}>Dar de baja</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
