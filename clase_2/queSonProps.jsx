// Las props son la forma en que los componentes reciben datos. Son como los parámetros de una función, pero para componentes. Las props se pasan a los componentes como atributos en el JSX.
// Por ejemplo, si tenemos un componente Tarjeta que muestra información sobre un tema, podríamos pasarle el título y la descripción como props:
// Los props son inmutables, lo que significa que un componente no puede cambiar sus propias props. Si necesitas cambiar los datos, debes hacerlo en el componente padre y pasar los nuevos datos como props al componente hijo.    


function Mensaje(props) {
  return <h2>{props.texto}</h2>;
}
export default Mensaje;

import Mensaje from './Mensaje';
function App() {
  return (
    <div>
      <h1>Ejemplo de Props en React</h1>
      <Mensaje texto="¡Hola, mundo!" />
      <Mensaje texto="Bienvenido a React" />
    </div>
  );
}
export default App;