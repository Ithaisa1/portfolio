let menuVisible = false;

// Función para mostrar u ocultar el menú
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList = ""; // Oculta el menú
        menuVisible = false;
    } else {
        nav.classList = "responsive"; // Muestra el menú
        menuVisible = true;
    }
}

// Oculta el menú cuando se selecciona una opción
function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Función de animación para la barra de habilidades
function efect_habilidades() {
    const skills = document.getElementById("skills");
    const distance_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if (distance_skills >= 300) {
        const habilidades = document.getElementsByClassName("progreso");
        const habilidadesClasses = [
            "javascript", "htmlcss", "bootstrap", "tailwindCss", 
            "baseDeDatos", "photoshop", "illustrator", 
            "indesign", "corelDraw","comunicacion", "trabajoEnEquipo", 
            "creatividad", "disponibilidadHoraria", "altoAprendizaje"
        ];

        for (let i = 0; i < habilidades.length; i++) {
            if (habilidadesClasses[i]) {
                habilidades[i].classList.add(habilidadesClasses[i]);
            }
        }
    }
}

// Detecta el scroll para aplicar la animación de la barra de habilidades
window.onscroll = function() {
    efect_habilidades();
};

// Envío de mensajes a través de emailJS
const btn = document.getElementById('button');
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_7w5dvaq';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar mensaje';
            alert('¡Mensaje enviado!');
        }, (err) => {
            btn.value = 'Enviar mensaje';
            alert(JSON.stringify(err));
        });
});

// Funcionalidad para cambiar el idioma
const idiomas = {
    español: {
        inicio: 'INICIO',
        sobreMi: 'SOBRE MI',
        skills: 'HABILIDADES',
        curriculum: 'CURRICULUM',
        portfolio: 'PORTAFOLIO',
        contacto: 'CONTACTO',
        nombre: 'Nombre',
        mensaje: 'Mensaje',
        email: 'Email',
        enviarMensaje: 'Enviar mensaje',
        mensajeEnviado: '¡Mensaje enviado!',
        comunicacion: 'Comunicación',
        trabajoEnEquipo: 'Trabajo en equipo',
        creatividad: 'Creatividad',
        disponibilidadHoraria: 'Disponibilidad horaria',
        altoAprendizaje: 'Alto aprendizaje',
    },
    ingles: {
        inicio: 'HOME',
        sobreMi: 'ABOUT ME',
        skills: 'SKILLS',
        curriculum: 'RESUME',
        portfolio: 'PORTFOLIO',
        contacto: 'CONTACT',
        nombre: 'Name',
        mensaje: 'Message',
        email: 'Email',
        enviarMensaje: 'Send message',
        mensajeEnviado: 'Message sent!',
        comunicacion: 'Communication',
        trabajoEnEquipo: 'Teamwork',
        creatividad: 'Creativity',
        disponibilidadHoraria: 'Availability',
        altoAprendizaje: 'High learning ability',
    },
};

let idiomaActual = 'español';

// Función para cambiar el idioma
function cambiarIdioma() {
    idiomaActual = idiomaActual === 'español' ? 'ingles' : 'español';

    // Cambiar texto del menú
    const menuItems = document.querySelectorAll('#nav ul li a');
    menuItems.forEach((item, index) => {
        item.textContent = idiomas[idiomaActual][Object.keys(idiomas[idiomaActual])[index]];
    });

    // Cambiar etiquetas y botón del formulario de contacto
    document.querySelector('label[for="from_name"]').textContent = idiomas[idiomaActual].nombre;
    document.querySelector('label[for="message"]').textContent = idiomas[idiomaActual].mensaje;
    document.querySelector('label[for="email_id"]').textContent = idiomas[idiomaActual].email;
    btn.value = idiomas[idiomaActual].enviarMensaje;

    // Cambiar la sección "Sobre mí"
    document.querySelector('#sobremi h2').textContent = idiomas[idiomaActual].sobreMi;

    // Cambiar los textos de habilidades técnicas
    const habilidadesTecnicas = document.querySelectorAll('.col h3')[0].nextElementSibling.querySelectorAll('.skill span');
    const habilidadesTecnicasKeys = ['javascript', 'htmlcss', 'Bootstrap', 'TailwindCss', 'baseDeDatos', 'photoshop', 'illustrator', 'indesign', 'corelDraw', 'bootstrap', 'tailwindCss'];

    habilidadesTecnicasKeys.forEach((skill, index) => {
        habilidadesTecnicas[index].textContent = idiomas[idiomaActual][skill];
    });

    // Cambiar los textos de habilidades profesionales
    const habilidadesProfesionales = document.querySelectorAll('.col h3')[1].nextElementSibling.querySelectorAll('.skill span');
    const habilidadesProfesionalesKeys = ['comunicacion', 'trabajoEnEquipo', 'creatividad', 'disponibilidadHoraria', 'altoAprendizaje'];

    habilidadesProfesionalesKeys.forEach((skill, index) => {
        habilidadesProfesionales[index].textContent = idiomas[idiomaActual][skill];
    });
}

// Evento para validar campos del formulario
document.addEventListener('DOMContentLoaded', function () {
    const camposValidar = [
        { nombre: 'telefono', expresionRegular: /^\d{9}$/, mensajeId: 'telefonoMensaje' },
        { nombre: 'email', expresionRegular: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensajeId: 'emailMensaje' },
        { nombre: 'cargo', expresionRegular: /^[a-zA-Z\s]+$/, mensajeId: 'cargoMensaje' }
    ];

    camposValidar.forEach(function (campo) {
        const input = document.getElementById(campo.nombre);
        input.addEventListener('keyup', function () {
            validarCampo(input, campo.expresionRegular, campo.mensajeId);
        });
    });

    function validarCampo(input, expresionRegular, mensajeId) {
        const valor = input.value.trim();
        const mensajeDiv = document.getElementById(mensajeId);

        if (expresionRegular.test(valor)) {
            mostrarMensaje(mensajeDiv, 'correcto', '✔ Correcto');
        } else {
            mostrarMensaje(mensajeDiv, 'error', '✘ Incorrecto');
        }
    }

    function mostrarMensaje(elemento, clase, texto) {
        elemento.textContent = texto;
        elemento.className = `mensaje ${clase}`;
    }
});
