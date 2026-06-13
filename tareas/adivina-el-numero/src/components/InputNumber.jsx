import React from 'react'

function InputNumber({ value, onChange, onSubmit }) {
  return (
    <div className="input-row">
      <input
        type="number"
        min="1"
        max="100"
        placeholder="Escribe tu número"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" onClick={onSubmit}>
        Probar
      </button>
    </div>
  )
}

export default InputNumber
