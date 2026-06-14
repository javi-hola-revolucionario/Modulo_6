import { useReducer, useRef, useEffect, useState } from 'react'

const initialState = { count: 0, history: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'increment': {
      const amount = action.payload ?? 1
      const nextCount = state.count + amount
      const entry = {
        text: `+${amount} (Nuevo valor: ${nextCount})`,
        previousCount: state.count
      }
      return {
        count: nextCount,
        history: [...state.history, entry]
      }
    }
    case 'decrement': {
      const amount = action.payload ?? 1
      const nextCount = state.count - amount
      const entry = {
        text: `-${amount} (Nuevo valor: ${nextCount})`,
        previousCount: state.count
      }
      return {
        count: nextCount,
        history: [...state.history, entry]
      }
    }
    case 'undo': {
      if (state.history.length === 0) return state
      const historyCopy = [...state.history]
      const lastEntry = historyCopy.pop()
      return {
        count: lastEntry.previousCount,
        history: historyCopy
      }
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function init(initial) {
  try {
    const raw = localStorage.getItem('contadorState')
    if (!raw) return initial
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error cargando estado desde localStorage', error)
    return initial
  }
}

function CounterGame() {
  const [incrementValue, setIncrementValue] = useState(1)
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const incrementBtnRef = useRef(null)

  useEffect(() => {
    if (incrementBtnRef.current) incrementBtnRef.current.focus()
  }, [])

  useEffect(() => {
    localStorage.setItem('contadorState', JSON.stringify(state))
  }, [state])

  const handleIncrement = () => {
    const amount = Number(incrementValue) || 1
    dispatch({ type: 'increment', payload: amount })
  }

  return (
    <div className="counter-game">
      <h2>Contador: {state.count}</h2>
      <div className="counter-controls">
        <button ref={incrementBtnRef} onClick={handleIncrement}>
          +
        </button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'undo' })}>Deshacer</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>

      <div className="increment-input">
        <label>
          Incrementar en:
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(e.target.value)}
            min="1"
          />
        </label>
      </div>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default CounterGame