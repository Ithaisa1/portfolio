// Espera a que todo el DOM se cargue antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el formulario y evita su envío predeterminado
    var formulario = document.getElementById("miFormulario");

    // Agrega un evento de escucha al formulario para evitar su envío predeterminado
    formulario.addEventListener('submit', function(event) {
        // Evita el envío predeterminado del formulario
        event.preventDefault();

        // Agrega un setTimeout después de enviar el formulario
        setTimeout(function() {
            // Restablece el formulario utilizando el método reset()
            formulario.reset();

            // Limpia los mensajes de validación y estilos
            limpiarMensajes();
        }, 1000);
    });

    // Define los campos del formulario con sus respectivas expresiones regulares y elementos de mensaje
    var campos = [
        { id: 'nombre', regex: /^[a-zA-Z ]+$/, mensajeId: 'nombreMensaje' },
        { id: 'email', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensajeId: 'emailMensaje' },
        { id: 'mensaje', regex: /.+/, mensajeId: 'mensajeMensaje' }
    ];

    // Itera sobre cada campo para agregar eventos de escucha a las teclas presionadas (keyup)
    campos.forEach(function(campo) {
        // Obtiene el elemento de entrada y el elemento de mensaje
        var input = document.getElementById(campo.id);
        var mensaje = document.getElementById(campo.mensajeId);

        // Agrega un evento de escucha a las teclas presionadas en el campo de entrada
        input.addEventListener('keyup', function() {
            // Llama a la función validarCampo con el campo actual
            validarCampo(input, campo.regex, mensaje);
        });
    });
});

// Función para validar y dar retroalimentación visual sobre un campo específico
function validarCampo(input, regex, mensaje) {
    // Verifica si el valor del campo cumple con la expresión regular
    if (regex.test(input.value)) {
        // Si es válido, muestra una marca de verificación y aplica estilos de "correcto"
        mensaje.textContent = '✔';
        mensaje.classList.remove('error');
        mensaje.classList.add('correcto');
    } else {
        // Si no es válido, muestra una marca de equis y aplica estilos de "error"
        mensaje.textContent = '✖';
        mensaje.classList.remove('correcto');
        mensaje.classList.add('error');
    }

    // Agrega un setTimeout para borrar el mensaje y los estilos después de 2 segundos
    setTimeout(function() {
        mensaje.textContent = '';
        mensaje.classList.remove('correcto', 'error');
    }, 2000);
}

// Función para limpiar los mensajes de validación y estilos
function limpiarMensajes() {
    // Selecciona todos los elementos con la clase 'mensaje'
    var mensajes = document.querySelectorAll('.mensaje');
    
    // Itera sobre cada mensaje y los limpia
    mensajes.forEach(function(mensaje) {
        mensaje.textContent = '';
        mensaje.classList.remove('correcto', 'error');
    });
}
