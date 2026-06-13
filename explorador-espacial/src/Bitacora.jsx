import React, { useState, useEffect, useRef } from 'react'

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function Bitacora() {
  const [planetas, setPlanetas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('planetas')) || []
    } catch (e) {
      return []
    }
  })
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagenFile, setImagenFile] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const inputImagenRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas))
  }, [planetas])

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    let imagenData = null
    if (imagenFile) {
      try {
        imagenData = await readFileAsDataURL(imagenFile)
      } catch (err) {
        console.error('Error leyendo imagen', err)
      }
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      imagen: imagenData,
    }

    if (editingIndex !== null) {
      setPlanetas((prev) => {
        const copy = [...prev]
        copy[editingIndex] = { ...copy[editingIndex], ...nuevo }
        return copy
      })
      setEditingIndex(null)
    } else {
      setPlanetas((prev) => [...prev, nuevo])
    }

    setNombre('')
    setDescripcion('')
    setImagenFile(null)
    if (inputImagenRef.current) inputImagenRef.current.value = ''
  }

  const handleEdit = (index) => {
    const p = planetas[index]
    setNombre(p.nombre)
    setDescripcion(p.descripcion)
    setEditingIndex(index)
    setSelectedIndex(index)
  }

  const handleDelete = (index) => {
    if (editingIndex === index) setEditingIndex(null)
    setPlanetas((prev) => prev.filter((_, i) => i !== index))
    if (selectedIndex === index) setSelectedIndex(null)
  }

  return (
    <div className="bitacora">
      <h2>Bitácora de Exploración</h2>

      <form onSubmit={handleSubmit} className="bitacora-form">
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción detallada"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenFile(e.target.files[0] || null)}
          ref={inputImagenRef}
        />
        <div className="form-actions">
          <button type="submit">{editingIndex !== null ? 'Guardar cambios' : 'Guardar'}</button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingIndex(null)
                setNombre('')
                setDescripcion('')
                setImagenFile(null)
                if (inputImagenRef.current) inputImagenRef.current.value = ''
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bitacora-list">
        <h3>Planetas Registrados</h3>
        {planetas.length === 0 && <p>No hay planetas registrados.</p>}
        <ul>
          {planetas.map((p, index) => (
            <li key={p.id} className="bitacora-item">
              <button className="item-name" onClick={() => setSelectedIndex(index)}>{p.nombre}</button>
              <div className="item-actions">
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bitacora-detail">
        {selectedIndex !== null && planetas[selectedIndex] && (
          <div>
            <h4>{planetas[selectedIndex].nombre}</h4>
            <p>{planetas[selectedIndex].descripcion}</p>
            {planetas[selectedIndex].imagen && (
              <img src={planetas[selectedIndex].imagen} alt={planetas[selectedIndex].nombre} style={{maxWidth: '100%', height: 'auto'}} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bitacora
