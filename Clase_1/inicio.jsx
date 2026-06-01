import React from "react";
import { de } from "zod/locales";

function Saludo() {
    return <h1>¡Hola, mundo!</h1>
}

export default Saludo;

function boton() {
    return <button>Haz clic aquí</button>
}

const mensaje = <h1>Bienvenido a React</h1>;

const nombre = "Carlos";
const saludo = <h1>Hola, {nombre}!</h1>;

// Props: Son datos que se pasan de un componente padre a un hijo.

// State: Es un objeto interno del componente que almacena información que puede cambiar con el tiempo

function Usuario(props) {
    return <h1>Hola, {props.nombre}!</h1>
}

<Usuario nombre="Ana" />

// -----ejemplo de state con useState-----

import { useState } from "react";

function Contador() {
    const [contador, setContador] = useState(0);
    return (
        <div>
            <p>Valor: {contador}</p>
            <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        </div> 
    );
}