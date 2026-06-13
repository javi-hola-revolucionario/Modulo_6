import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [duracion, setDuracion] = useState('')
  const [minDuracion, setMinDuracion] = useState('')
  const [recentOnly, setRecentOnly] = useState(false)

  // Cargar tareas desde localStorage al montar
  useEffect(() => {
    const raw = localStorage.getItem('tareas')
    if (raw) {
      try {
        setTareas(JSON.parse(raw))
      } catch (e) {
        console.error('Error parseando tareas desde localStorage', e)
      }
    }
  }, [])

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  // Cálculo de tiempo total
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + (tarea.duracion || 0), 0)
  }, [tareas])

  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion, 10),
        createdAt: Date.now()
      }
      setTareas((prev) => [...prev, nuevaTareaObj])
      setNuevaTarea('')
      setDuracion('')
    }
  }

  const eliminarTarea = (createdAt) => {
    setTareas((prev) => prev.filter((t) => t.createdAt !== createdAt))
  }

  const filteredTareas = tareas.filter((t) => {
    if (minDuracion !== '' && Number(minDuracion) > 0) {
      if (t.duracion < Number(minDuracion)) return false
    }
    if (recentOnly) {
      const oneDay = 24 * 60 * 60 * 1000
      if (Date.now() - t.createdAt > oneDay) return false
    }
    return true
  })

  return (
    <div className="app-container">
      <h1>Contador de Tareas</h1>

      <div className="controls">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración en minutos"
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <div className="filters">
        <label>
          Min duración:
          <input
            type="number"
            min="0"
            value={minDuracion}
            onChange={(e) => setMinDuracion(e.target.value)}
            placeholder="Ej: 10"
          />
        </label>
        <label className="recent-label">
          <input
            type="checkbox"
            checked={recentOnly}
            onChange={(e) => setRecentOnly(e.target.checked)}
          />
          Mostrar solo recientes (24h)
        </label>
        <button className="clear-filter" onClick={() => { setMinDuracion(''); setRecentOnly(false) }}>
          Limpiar filtro
        </button>
      </div>

      <h2>Tareas</h2>
      <ul className="task-list">
        {filteredTareas.map((t) => (
          <li key={t.createdAt} className="task-item">
            <span className="task-name">{t.nombre}</span>
            <span className="task-duration">{t.duracion} min</span>
            <button className="delete" onClick={() => eliminarTarea(t.createdAt)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  )
}

export default App
