import { useState } from 'react'
import ApiKeyModal from './components/ApiKeyModal'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'

import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'
import VoiceGuideBot from './components/VoiceGuideBot'

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '')
  const [user, setUser] = useState(null)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleRegister = (username, password) => {
    const users = JSON.parse(localStorage.getItem('expo_users') || '[]')
    if (users.find(u => u.username === username) || username === 'mp' || username === 'demo') {
      return false
    }
    const updated = [...users, { username, password, role: 'user', queries: 0 }]
    localStorage.setItem('expo_users', JSON.stringify(updated))
    return true
  }

  const handleLogin = (username, password) => {
    // Admin check
    if (username === 'mp' && password === 'Mita1962') {
      setUser({ username, role: 'admin' })
      return { success: true }
    }

    // Demo check
    if (username === 'demo' && password === 'demo') {
      const stats = JSON.parse(localStorage.getItem('expo_demo_stats') || '{"sessions": 0, "queries": 0}')
      if (stats.sessions < 10 && stats.queries < 10) {
        stats.sessions += 1
        localStorage.setItem('expo_demo_stats', JSON.stringify(stats))
        setUser({ username, role: 'demo' })
        return { success: true }
      }
      return { success: false, message: 'Cuenta demo agotada (máx 10 sesiones/consultas).' }
    }

    // Authorized users check
    const users = JSON.parse(localStorage.getItem('expo_users') || '[]')
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      if (found.queries < 30) {
        setUser(found)
        return { success: true }
      } else {
        return { success: false, message: 'Has agotado tus 30 consultas. Para renovar tu cuota ($10 por 30 consultas), contacta a mp@ufm.edu.' }
      }
    }

    return { success: false, message: 'Credenciales incorrectas.' }
  }

  const logout = () => {
    setUser(null)
    setIsAdminMode(false)
    setShowLogin(false)
  }

  if (!user && !showLogin) {
    return <LandingPage onGetStarted={() => setShowLogin(true)} />
  }

  if (!user && showLogin) {
    return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
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
