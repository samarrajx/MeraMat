import React from 'react'
import ReactDOM from 'react-dom/client'
import LogoMark from './LogoMark'
import '../styles/variables.css'
import '../styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40, display: 'flex', gap: 20, alignItems: 'center' }}>
    <LogoMark size={24} />
    <LogoMark size={32} />
    <LogoMark size={40} />
    <LogoMark size={56} />
  </div>
)
