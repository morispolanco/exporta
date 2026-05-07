import { useState } from 'react'
import ApiKeyModal from './components/ApiKeyModal'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'

import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'
import VoiceGuideBot from './components/VoiceGuideBot'

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '')
  const [user, setUser] = useState(null)
  const [isAdminMode, setIsAdminMode] = useState(false)

  const handleLogin = (username, password) => {
    // Admin check
    if (username === 'mp' && password === 'Mita1962') {
      setUser({ username, role: 'admin' })
      return true
    }

    // Demo check
    if (username === 'demo' && password === 'demo') {
      const stats = JSON.parse(localStorage.getItem('expo_demo_stats') || '{"sessions": 0, "queries": 0}')
      if (stats.sessions < 10 && stats.queries < 10) {
        stats.sessions += 1
        localStorage.setItem('expo_demo_stats', JSON.stringify(stats))
        setUser({ username, role: 'demo' })
        return true
      }
      return false
    }

    // Authorized users check
    const users = JSON.parse(localStorage.getItem('expo_users') || '[]')
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      setUser({ username, role: 'user' })
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsAdminMode(false)
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (isAdminMode && user.role === 'admin') {
    return <AdminPage onBack={() => setIsAdminMode(false)} />
  }

  return (
    <>
      <VoiceGuideBot />
      {!apiKey && <ApiKeyModal onSubmit={setApiKey} />}
      {apiKey && (
        <div className="app-container">
          <Sidebar onAdminClick={() => user.role === 'admin' && setIsAdminMode(true)} onLogout={logout} user={user} />
          <ChatWindow apiKey={apiKey} user={user} />
        </div>
      )}
    </>
  )
}

export default App
