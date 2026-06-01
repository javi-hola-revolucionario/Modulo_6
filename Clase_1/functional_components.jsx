// Ejemplo de un Class component

class Saludo extends React.Component {
    render() {
        return <h1>¡Hola, mundo!</h1>;
    }
}

// Los Functional Components son simplemente funciones que devuelven JSX. Veamos un ejemplo:

function Mensaje() {
    return <p>Este mensaje dentro de un Functional Component.</p>
}

export default Mensaje;

// Para usar este componente en una aplicación, lo importamos en App.jsx:

