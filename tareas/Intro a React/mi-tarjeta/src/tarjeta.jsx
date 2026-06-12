function Tarjeta() {
  // Definimos la información estática de la tarjeta
  const nombre = "Ana Pérez";
  const profesion = "Desarrolladora Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";

  // Retornamos el JSX que representa la tarjeta
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center' }}>
      {ReactDOM.createRoot(container).render(div);}
      <h2>{nombre}</h2>
      <h4>{profesion}</h4>
      <p>{mensaje}</p>
    </div>
  );
}

export default Tarjeta;