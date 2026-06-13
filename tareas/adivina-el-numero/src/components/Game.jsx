import { useState, useEffect } from 'react'
import InputNumber from './InputNumber.jsx'
import Message from './Message.jsx'
import RestartButton from './RestartButton.jsx'

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1

function Game() {
  const [targetNumber, setTargetNumber] = useState(() => getRandomNumber())
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('Adivina un número entre 1 y 100')
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    setTargetNumber(getRandomNumber())
  }, [])

  const handleGuess = () => {
    const value = Number(guess)
    if (!value || value < 1 || value > 100) {
      setMessage('Ingresa un número válido entre 1 y 100')
      return
    }

    if (value === targetNumber) {
      setMessage('¡Correcto!')
      setGameWon(true)
    } else if (value < targetNumber) {
      setMessage('El número es mayor')
    } else {
      setMessage('El número es menor')
    }
  }

  const handleRestart = () => {
    setTargetNumber(getRandomNumber())
    setGuess('')
    setMessage('Adivina un número entre 1 y 100')
    setGameWon(false)
  }

  return (
    <section className="game-card">
      <h1>Adivina el Número</h1>
      <p>Intenta adivinar el número secreto.</p>

      <InputNumber value={guess} onChange={(value) => setGuess(value)} onSubmit={handleGuess} />
      <Message message={message} won={gameWon} />
      <RestartButton onRestart={handleRestart} />
    </section>
  )
}

export default Game
