import { useState } from 'react';

export default function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) { 
      setError('Por favor ingresa tu clave de API.'); 
      return; 
    }
    if (!trimmed.startsWith('sk-or')) { 
      setError('La clave debe comenzar con "sk-or-..."'); 
      return; 
    }
    onSubmit(trimmed);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">🌱</div>
        <h2 className="modal-title">AgroExport Intelligence Agent</h2>
        <p className="modal-desc">
          Ingresa tu clave de API de OpenRouter para conectarte con el asistente especializado en exportación agrícola de Guatemala.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="api-key-input">Clave de API — OpenRouter</label>
            <input
              id="api-key-input"
              type="password"
              value={key}
              onChange={e => { setKey(e.target.value); setError(''); }}
              placeholder="sk-or-v1-..."
              autoFocus
              autoComplete="off"
            />
            {error && <span className="modal-error">{error}</span>}
          </div>
          <p className="modal-note">
            Tu clave se almacena únicamente de forma local en tu navegador y nunca se envía a servidores de terceros, excepto a OpenRouter para generar las respuestas.
          </p>
          <button type="submit" className="btn-primary btn-full">Acceder a Inteligencia AgroExport →</button>
        </form>
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          ¿No tienes una clave? Obtén una gratis en OpenRouter.ai ↗
        </a>
      </div>
    </div>
  );
}
