import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/ai';

export default function ChatWindow({ apiKey, user }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu **AgroExport Intelligence Agent**. Estoy diseñado para apoyar tus exportaciones agrícolas de Guatemala (café, cardamomo, banano, etc.).\n\nPara empezar, por favor cuéntame:\n1. ¿Qué producto agrícola deseas exportar?\n2. ¿Cuál es la región de origen en Guatemala?\n3. ¿Cuál es tu mercado de destino?\n\n*Recuerda que puedo asistirte en Trazabilidad y Cumplimiento ESG, Comunicación Internacional, Inteligencia de Precios y Logística.*'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // User/Demo query limit check
    if (user.role !== 'admin') {
      if (user.role === 'demo') {
        const stats = JSON.parse(localStorage.getItem('expo_demo_stats') || '{"sessions": 0, "queries": 0}');
        if (stats.queries >= 10) {
          setMessages([...messages, { role: 'assistant', content: '⚠️ Has alcanzado el límite de 10 consultas de la cuenta demo.' }]);
          return;
        }
        stats.queries += 1;
        localStorage.setItem('expo_demo_stats', JSON.stringify(stats));
      } else {
        const users = JSON.parse(localStorage.getItem('expo_users') || '[]');
        const userIdx = users.findIndex(u => u.username === user.username);
        if (userIdx !== -1) {
          if (users[userIdx].queries >= 30) {
            setMessages([...messages, { role: 'assistant', content: '⚠️ Has alcanzado el límite de 30 consultas. Para renovar tu cuota ($10 por 30 consultas), por favor contacta al administrador en mp@ufm.edu.' }]);
            return;
          }
          users[userIdx].queries += 1;
          localStorage.setItem('expo_users', JSON.stringify(users));
          
          if (users[userIdx].queries >= 30) {
             setMessages([...messages, { role: 'assistant', content: '✅ Consulta realizada. Esta fue tu última consulta disponible. Para renovar tu cuota ($10 por 30 consultas), contacta a mp@ufm.edu.' }]);
          }
        }
      }
    }

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseContent = await generateChatResponse(newMessages, apiKey);
      setMessages([...newMessages, { role: 'assistant', content: responseContent }]);
    } catch (error) {
      setMessages([
        ...newMessages, 
        { 
          role: 'assistant', 
          content: `**Error:** No se pudo comunicar con la API. Detalle: ${error.message}` 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-content">
      <div className="chat-header">
        <div className="chat-title">Asistente Virtual</div>
        <div className="chat-status">
          <div className="status-dot"></div>
          Conectado (OpenRouter)
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'agent'}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? '👤' : '🌱'}
            </div>
            <div className="message-content">
              {msg.role === 'user' ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message agent">
            <div className="message-avatar">🌱</div>
            <div className="message-content">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu consulta aquí..."
            rows={1}
            disabled={isLoading}
          />
          <button 
            className="btn-send" 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
