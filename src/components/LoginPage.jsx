import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setError('');
    } else {
      setError('Credenciales incorrectas o cuenta de demo agotada.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">🔒</div>
        <h2 className="modal-title">Acceso AgroExport</h2>
        <p className="modal-desc">Ingresa tus credenciales para acceder a la plataforma de inteligencia exportadora.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="modal-field">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="modal-error" style={{ marginBottom: '16px' }}>{error}</p>}
          <button type="submit" className="btn-primary btn-full">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
