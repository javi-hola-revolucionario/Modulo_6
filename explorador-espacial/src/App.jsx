import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Planeta from './Planeta'
import Bitacora from './Bitacora'

function App() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [estadoNave, setEstadoNave] = useState('En órbita')
  const [planetasVisitados, setPlanetasVisitados] = useState([])
  const [nuevoPlaneta, setNuevoPlaneta] = useState('')

  // Montaje: mensaje y simulación de vuelo
  useEffect(() => {
    console.log('¡El panel de control está listo!')

    const intervalo = setInterval(() => {
      setDistancia((d) => d + 10)
      setCombustible((c) => Math.max(0, c - 1))
    }, 1000)

    return () => {
      clearInterval(intervalo)
      console.log('El panel de control se ha apagado.')
    }
  }, [])

  // Actualización: combustible
  useEffect(() => {
    console.log('¡Combustible actualizado!')
  }, [combustible])

  // Mensaje memoizado según estado
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`
  }, [estadoNave])

  const aterrizar = () => setEstadoNave('Aterrizando')

  const agregarPlaneta = () => {
    if (nuevoPlaneta.trim() === '') return
    setPlanetasVisitados((prev) => [...prev, nuevoPlaneta.trim()])
    setNuevoPlaneta('')
  }

  const eliminarPlaneta = (index) => {
    setPlanetasVisitados((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="panel">
      <h1>Panel de Control</h1>
      <div className="estado">
        <p>Distancia: {distancia} km</p>
        <p>Combustible: {combustible}%</p>
        <p>{mensajeEstado}</p>
        <button onClick={aterrizar}>Aterrizar</button>
      </div>

      <div className="visitados">
        <h2>Planetas visitados</h2>
        <div className="add-planet">
          <input
            type="text"
            placeholder="Nombre del planeta"
            value={nuevoPlaneta}
            onChange={(e) => setNuevoPlaneta(e.target.value)}
          />
          <button onClick={agregarPlaneta}>Añadir planeta</button>
        </div>
        <ul>
          {planetasVisitados.map((p, idx) => (
            <li key={p + idx} className="planet-row">
              <Planeta nombre={p} />
              <button onClick={() => eliminarPlaneta(idx)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Bitácora de Exploración */}
      <Bitacora />
    </div>
  )
}

export default App