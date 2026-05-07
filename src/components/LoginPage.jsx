import { useState } from 'react';

export default function LoginPage({ onLogin, onRegister }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (onRegister(username, password)) {
        setIsRegistering(false);
        setError('');
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        setError('El usuario ya existe o no es válido.');
      }
    } else {
      const result = onLogin(username, password);
      if (result.success) {
        setError('');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">{isRegistering ? '📝' : '🔒'}</div>
        <h2 className="modal-title">{isRegistering ? 'Registro de Usuario' : 'Acceso AgroExport'}</h2>
        <p className="modal-desc">
          {isRegistering 
            ? 'Regístrate para obtener 10 consultas gratuitas de inteligencia exportadora.' 
            : 'Ingresa tus credenciales para acceder a la plataforma.'}
        </p>
        
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
          <button type="submit" className="btn-primary btn-full">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <button 
          onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
          className="modal-link"
          style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
        </button>
      </div>
    </div>
  );
}
