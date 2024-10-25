const registroForm = document.getElementById('registro-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const registroMessage = document.getElementById('registro-message');
const loginForm = document.getElementById('login-form');
const usernameInput2 = document.getElementById('username2');
const passwordInput2 = document.getElementById('password2');
const usernameError2 = document.getElementById('username2-error');
const passwordError2 = document.getElementById('password2-error');
const loginMessage = document.getElementById('login-message');
const accederJuego = document.getElementById('acceder-juego');

// Función para validar el nombre de usuario
function validarNombreUsuario(input, error) {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
    const esValido = usernameRegex.test(input.value.trim());

    if (!esValido) {
        mostrarError(input, error, 'El nombre de usuario debe contener al menos 3 caracteres alfanuméricos.');
    } else {
        mostrarExito(input);
        error.textContent = '';
    }

    return esValido;
}

// Función para validar la contraseña
function validarContraseña(input, error) {
    const longitudContraseña = input.value.length;

    if (longitudContraseña < 6) {
        mostrarError(input, error, 'La contraseña debe tener al menos 6 caracteres.');
    } else {
        mostrarExito(input);
        error.textContent = '';
    }

    return longitudContraseña >= 6;
}

// Función para mostrar un mensaje de error
function mostrarError(input, errorElement, mensaje) {
    input.classList.add('error');
    input.style.borderColor = 'red';
    errorElement.textContent = mensaje;
}

// Función para mostrar un mensaje de éxito
function mostrarExito(input) {
    input.classList.remove('error');
    input.style.borderColor = 'green';
}

// Función para validar todo el formulario de registro
function validarFormularioRegistro() {
    let valid = true;

    if (!validarNombreUsuario(usernameInput, usernameError)) {
        valid = false;
    }

    if (!validarContraseña(passwordInput, passwordError)) {
        valid = false;
    }

    return valid;
}

// Agregar evento al formulario de registro
registroForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validarFormularioRegistro()) {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Verificar si el nombre de usuario ya está registrado
        if (localStorage.getItem(username)) {
            mostrarError(usernameInput, registroMessage, 'El nombre de usuario ya está registrado.');
        } else {
            // Guardar el nombre de usuario y la contraseña en LocalStorage
            localStorage.setItem(username, password);
            registroMessage.textContent = 'Registro completado con éxito.';
            registroMessage.classList.remove('error-message');
        }
    }
});

// Función para validar todo el formulario de login
function validarFormularioLogin() {
    let valid = true;

    if (!usernameInput2.value) {
        mostrarError(usernameInput2, usernameError2, 'El campo de usuario no puede estar vacío.');
        valid = false;
    } else {
        mostrarExito(usernameInput2);
        usernameError2.textContent = '';
    }

    if (!passwordInput2.value) {
        mostrarError(passwordInput2, passwordError2, 'El campo de contraseña no puede estar vacío.');
        valid = false;
    } else {
        mostrarExito(passwordInput2);
        passwordError2.textContent = '';
    }

    return valid;
}

// Agregar evento al formulario de login
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validarFormularioLogin()) {
        const username = usernameInput2.value;
        const password = passwordInput2.value;

        // Verificar si las credenciales son correctas
        if (localStorage.getItem(username) === password) {
            loginMessage.textContent = 'Bienvenido/a, ' + username + '.';
            loginMessage.classList.remove('error-message');

            // Redireccionar a la página del juego
            window.location.href = 'minijuego.html';
        } else {
            mostrarError(usernameInput2, loginMessage, 'Nombre de usuario o contraseña incorrectos.');
        }
    }
});
