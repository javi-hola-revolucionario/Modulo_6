import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'

const citasData = [
  {
    id: '1',
    paciente: 'Ana Pérez',
    medico: 'Dr. López',
    fecha: '2026-06-20',
    hora: '10:00',
    motivo: 'Chequeo general',
    notas: 'Traer resultados de laboratorio recientes.'
  },
  {
    id: '2',
    paciente: 'Carlos Ramírez',
    medico: 'Dra. García',
    fecha: '2026-06-22',
    hora: '14:30',
    motivo: 'Consulta de cardiología',
    notas: 'Control de presión y revisión de medicamentos.'
  },
  {
    id: '3',
    paciente: 'María López',
    medico: 'Dr. Sánchez',
    fecha: '2026-06-24',
    hora: '09:15',
    motivo: 'Vacunación',
    notas: 'Aplicar vacuna de refuerzo de influenza.'
  }
]

function Home() {
  return (
    <div className="page home-page">
      <h1>Bienvenido a Citas Médicas</h1>
      <p>Consulta tu agenda y revisa detalles de las citas programadas.</p>
      <Link to="/citas" className="button">
        Ver citas
      </Link>
    </div>
  )
}

function Citas() {
  return (
    <div className="page citas-page">
      <h1>Lista de Citas</h1>
      <ul className="cita-list">
        {citasData.map((cita) => (
          <li key={cita.id} className="cita-card">
            <div>
              <strong>{cita.paciente}</strong>
              <p>{cita.medico}</p>
              <p>{cita.fecha} · {cita.hora}</p>
            </div>
            <Link to={`/cita/${cita.id}`} className="link-button">
              Ver detalles
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CitaDetalle() {
  const { id } = useParams()
  const cita = citasData.find((item) => item.id === id)

  if (!cita) {
    return (
      <div className="page notfound-page">
        <h1>Cita no encontrada</h1>
        <p>No existe una cita con el identificador {id}.</p>
        <Link to="/citas" className="button">
          Volver a citas
        </Link>
      </div>
    )
  }

  return (
    <div className="page cita-detail-page">
      <h1>Detalle de la cita</h1>
      <div className="detail-card">
        <p><strong>Paciente:</strong> {cita.paciente}</p>
        <p><strong>Médico:</strong> {cita.medico}</p>
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Motivo:</strong> {cita.motivo}</p>
        <p><strong>Notas:</strong> {cita.notas}</p>
      </div>
      <Link to="/citas" className="button">
        Volver a la lista
      </Link>
    </div>
  )
}

function NotFound() {
  return (
    <div className="page notfound-page">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta a la que intentas acceder no existe.</p>
      <Link to="/" className="button">
        Ir al inicio
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/citas">Citas</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/cita/:id" element={<CitaDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
