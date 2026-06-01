import Mensaje from "./components/Mensaje";

function App() {
    return (
        <div>
            <h1>Mi Aplicacion</h1>
            <Mensaje />
        </div>
    );
}

export default App;


//----------------------------------------

// Tarjeta.jsx:
function Tarjeta(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>{props.titulo}</h2>
      <p>{props.descripcion}</p>
    </div>
  );
}

export default Tarjeta;

// Uso en App.jsx:
import Tarjeta from './Tarjeta';

function App() {
  return (
    <div>
      <Tarjeta titulo="React" descripcion="Una biblioteca para construir interfaces de usuario." />
      <Tarjeta titulo="JavaScript" descripcion="El lenguaje de la web." />
    </div>
  );
}

export default App;