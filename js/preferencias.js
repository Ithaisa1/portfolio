document.addEventListener("DOMContentLoaded", function() {
    var nombre = localStorage.getItem("nombre");
    var fondo = localStorage.getItem("fondo");
    var letra = localStorage.getItem("letra");

    if (nombre && fondo && letra) {
        mostrarSeccion("preferencias");
        setTimeout(function() {
            mostrarSeccion("saludo");
            actualizarSaludo();
        }, 500); // Mostrar la sección de saludo después de 500 milisegundos (0.5 segundos)
    } else {
        mostrarSeccion("preferencias");
    }
});

function mostrarSeccion(seccionId) {
    var secciones = document.querySelectorAll("section");
    for (var i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }

    document.getElementById(seccionId).style.display = "block";
}



function guardarPreferencias() {
    var nombre = document.getElementById("nombre").value;
    var fondo = document.getElementById("fondo").value;
    var letra = document.getElementById("letra").value;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("fondo", fondo);
    localStorage.setItem("letra", letra);

    // Actualizar color de letra en la sección de saludo
    actualizarSaludo();

    mostrarSeccion("saludo");
}

function borrarPreferencias() {
    mostrarSeccion("preferencias");

    setTimeout(function() {
        var nombreOriginal = localStorage.getItem("nombre");
        var fondoOriginal = localStorage.getItem("fondo");
        var letraOriginal = localStorage.getItem("letra");

        localStorage.removeItem("nombre");
        localStorage.removeItem("fondo");
        localStorage.removeItem("letra");

        mostrarSeccion("preferencias");

        // Restablecer preferencias después de 500 milisegundos (0.5 segundos)
        setTimeout(function() {
            localStorage.setItem("nombre", nombreOriginal);
            localStorage.setItem("fondo", fondoOriginal);
            localStorage.setItem("letra", letraOriginal);
            mostrarSeccion("preferencias");
            actualizarSaludo();
        }, 500);
    }, 500);
}

function actualizarSaludo() {
    var nombre = localStorage.getItem("nombre");
    var fondo = localStorage.getItem("fondo");
    var letra = localStorage.getItem("letra");

    if (nombre && fondo && letra) {
        document.body.style.backgroundColor = fondo;
        document.body.style.color = letra;
        document.getElementById("saludoTexto").innerHTML = "¡Hola, " + nombre + "!";
        document.getElementById("saludoTexto").style.backgroundColor = fondo;
        document.getElementById("saludoTexto").style.color = letra;
    } else {
        mostrarSeccion("saludo");
    }
}
