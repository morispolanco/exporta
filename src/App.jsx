import { useState } from 'react'
import ApiKeyModal from './components/ApiKeyModal'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'

import VoiceGuideBot from './components/VoiceGuideBot'

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '')

  return (
    <>
      <VoiceGuideBot />
      {!apiKey && <ApiKeyModal onSubmit={setApiKey} />}
      {apiKey && (
        <div className="app-container">
          <Sidebar />
          <ChatWindow apiKey={apiKey} />
        </div>
      )}
    </>
  )
}

export default App
