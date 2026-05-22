import { useState } from "react";
//------------------------------//
// El hook es una caracteristica para tener componentes que tengan dentro de estados, funcionalidad 
// Es una reacion un desencadenante de una accion, es decir, es una funcion que se ejecuta cada vez que se cumple una condicion
//------------------------------//


const { set } = require("zod");

function Contador() {
    cosnt [count, setCount] = useState(0);

    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
}


functionPerfilSimple () {
    const[nombre, setNombre]
}