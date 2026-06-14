import './App.css'
import CounterGame from './CounterGame'

function App() {
  return (
    <div className="app-root">
      <header>
        <h1>Adivina el Número - Contador</h1>
        <p>Usa el contador con deshacer, incremento personalizado y historial persistente.</p>
      </header>
      <main>
        <CounterGame />
      </main>
    </div>
  )
}

export default App
