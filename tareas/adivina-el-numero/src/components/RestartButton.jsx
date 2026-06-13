import React from 'react'

function RestartButton({ onRestart }) {
  return (
    <button className="restart-button" type="button" onClick={onRestart}>
      Reiniciar juego
    </button>
  )
}

export default RestartButton
