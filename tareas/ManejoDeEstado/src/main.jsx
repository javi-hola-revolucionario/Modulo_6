import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import ListaCompras from './ListaCompras.jsx'

function App() {
  return (
    <div>
      <ListaCompras />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)
