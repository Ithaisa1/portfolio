// Definición del array de adivinanzas
const adivinanzas = [
  { adivinanza: "Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.", respuesta: "pera" },
  { adivinanza: "Cuatro patas tiene un pato, cuatro tiene un gato y uno solo tiene un zapato. ¿Qué es?", respuesta: "zapato" },
  { adivinanza: "Tengo agujas y no se coser, tengo números y no sé leer", respuesta: "reloj"},
  { adivinanza: "Cuando llueve y sale el sol todos los colores los tengo yo", respuesta: "arcoiris"},
  { adivinanza: "¿Qué sale de noche pero por el día se va?", respuesta: "búho"},
  { adivinanza: "Tengo alas y pico. Hablo y hablo, pero no sé lo que digo. ¿Quién soy?", respuesta: "loro"},
  { adivinanza: "No es árbol, pero tiene hojas, tiene tapa sin ser olla. ¿Qué es?", respuesta: "libro"}
];

// Arreglo que almacena las adivinanzas ya mostradas
let adivinanzasMostradas = [];

// Puntuación del jugador
let puntuacion = 0;

// Número de intentos realizados
let intentos = 0;

/**
 * Función para mostrar una nueva adivinanza al usuario.
 */
function mostrarAdivinanza() {
  // Verifica si aún hay adivinanzas por mostrar
  if (intentos < adivinanzas.length) {
    // Obtiene una adivinanza no repetida
    const adivinanzaActual = obtenerAdivinanzaNoRepetida();
    
    // Muestra la adivinanza y obtiene la respuesta del usuario
    const respuestaUsuario = prompt(adivinanzaActual.adivinanza);

    // Comprueba si la respuesta es correcta
    if (respuestaUsuario && respuestaUsuario.toLowerCase() === adivinanzaActual.respuesta.toLowerCase()) {
      // Incrementa la puntuación en caso de respuesta correcta
      puntuacion += 10;
      alert("¡Correcto!");
    } else {
      // Decrementa la puntuación en caso de respuesta incorrecta
      puntuacion -= 5;
      alert(`Incorrecto. La respuesta correcta es: ${adivinanzaActual.respuesta}`);
    }

    // Incrementa el número de intentos
    intentos++;

    // Actualiza la tabla y la puntuación en la interfaz
    actualizarTabla(adivinanzaActual.adivinanza, adivinanzaActual.respuesta, puntuacion);

    // Muestra el mensaje final si es la última adivinanza
    if (intentos === adivinanzas.length) {
      mostrarMensajeFinal();
    }
  }
}

/**
 * Función para obtener una adivinanza no repetida.
 * @returns {Object} - Objeto que representa una adivinanza.
 */
function obtenerAdivinanzaNoRepetida() {
  let adivinanzaNoRepetida;
  do {
    // Selecciona una adivinanza al azar
    adivinanzaNoRepetida = adivinanzas[Math.floor(Math.random() * adivinanzas.length)];
  } while (adivinanzasMostradas.includes(adivinanzaNoRepetida));

  // Agrega la adivinanza al arreglo de adivinanzas mostradas
  adivinanzasMostradas.push(adivinanzaNoRepetida);
  
  // Devuelve la adivinanza seleccionada
  return adivinanzaNoRepetida;
}

/**
 * Función para actualizar la tabla de adivinanzas y la puntuación.
 * @param {string} adivinanza - La adivinanza actual.
 * @param {string} respuesta - La respuesta correcta de la adivinanza.
 * @param {number} puntuacion - La puntuación actual del jugador.
 */
function actualizarTabla(adivinanza, respuesta, puntuacion) {
  // Selecciona el cuerpo de la tabla en el documento HTML
  const tablaBody = document.querySelector("#adivinanzasTable tbody");
  
  // Crea una nueva fila en la tabla
  const fila = tablaBody.insertRow();
  
  // Añade celdas a la fila con la adivinanza, respuesta y puntuación
  const celdaAdivinanza = fila.insertCell(0);
  const celdaRespuesta = fila.insertCell(1);
  const celdaPuntuacion = fila.insertCell(2);

  // Asigna los valores a las celdas
  celdaAdivinanza.textContent = adivinanza;
  celdaRespuesta.textContent = respuesta;
  celdaPuntuacion.textContent = puntuacion;

  // Actualiza la puntuación en el mensaje
  document.getElementById("score").textContent = `Puntuación: ${puntuacion}`;
}

/**
 * Función para mostrar el mensaje final según la puntuación obtenida.
 */
function mostrarMensajeFinal() {
  let mensajeFinal;
  if (puntuacion >= 20) {
    mensajeFinal = "¡Felicidades! Eres un maestro de las adivinanzas.";
  } else if (puntuacion >= 0) {
    mensajeFinal = "Bien hecho, pero puedes mejorar.";
  } else {
    mensajeFinal = "¡Ups! Necesitas practicar más.";
  }

  // Muestra un mensaje final con la puntuación del jugador
  alert(`Juego terminado. ${mensajeFinal}`);
}

// Este código depende de la existencia de un elemento con id "adivinanzasTable" en el HTML para mostrar la tabla.
