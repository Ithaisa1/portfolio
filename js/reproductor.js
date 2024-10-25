// Lista de videos
let allVideos = [
    {
        name: "Introduccion al curso de Javascript",
        src: "/videos/introduccion-al-curso-clase0-curso-de-javascript-gratis-by-programee.mp4",
        id: "vid_1"
    },
    {
        name: "Sintaxis básica",
        src: "/videos/sintaxis-basica-clase1-curso-de-javascript-gratis-by-programee.mp4",
        id: "vid_2"
    },
    {
        name: "Control de flujos y bucles",
        src: "/videos/Control de Flujos y Bucles .mp4",
        id: "vid_3"
    },
    {
        name: "Operadores",
        src: "/videos/Operadores .mp4 ",
        id: "vid_4"
    },
];

// Selección de elementos del DOM
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');
const customProgressBar = document.getElementById('custom-progress-bar');
const progress = document.getElementById('progress');

const ulTag = document.querySelector("ul");
AllLessons.innerHTML = `${allVideos.length} Lecciones`

let musicIndex = 1;

// Cargar el primer video al cargar la página
window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
});

// Función para reproducir el video
function playMusic() {
    mainVideo.play();
    playlist.classList.add('active');
}

// Función para cargar un video específico
function loadMusic(indexNumb) {
    mainVideo.src = `${allVideos[indexNumb - 1].src}`;
    videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`;
}

// Crear elementos de la lista de reproducción
for (let i = 0; i < allVideos.length; i++) {
    let liTag = `<li li-index="${i + 1}">
        <div class="row">
            <span>${i + 1}. ${allVideos[i].name}</span>
        </div>
        <span id="${allVideos[i].id}" class="duration"></span>
    </li>`;
    playlist.insertAdjacentHTML('beforeend', liTag);
}

// Obtener todos los elementos li de la lista de reproducción
const allLiTags = playlist.querySelectorAll('li');

// Función para resaltar el video que se está reproduciendo actualmente
function playingNow() {
    for (let j = 0; j < allVideos.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove("playing");
        }
        if (allLiTags[j].getAttribute('li-index') == musicIndex) {
            allLiTags[j].classList.add('playing');
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

// Función para manejar el clic en un elemento de la lista de reproducción
function clicked(element) {
    let getIndex = element.getAttribute("li-index");
    musicIndex = getIndex;
    loadMusic(musicIndex);
    playingNow();
}

// Función para manejar el clic en la barra de progreso personalizada
function seek(event) {
    const progressBar = customProgressBar.getBoundingClientRect();
    const clickPosition = event.clientX - progressBar.left;
    const clickPercentage = clickPosition / progressBar.width;

    const newPosition = clickPercentage * mainVideo.duration;
    mainVideo.currentTime = newPosition;

    // Actualiza la posición del control deslizante
    seekBar.value = (newPosition / mainVideo.duration) * 100;
}

// Maneja el evento de error para mostrar un mensaje en caso de problemas de reproducción
mainVideo.addEventListener('error', function () {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Hubo un problema al reproducir el video. Por favor, intente con otro navegador o formato.';
    mainVideo.parentNode.insertBefore(errorMessage, mainVideo.nextSibling);
    mainVideo.style.display = 'none';  // Oculta el reproductor en caso de error
});

// Escucha el evento timeupdate para actualizar la posición de la barra de progreso durante la reproducción
mainVideo.addEventListener('timeupdate', updateProgressBar);

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const percentage = (mainVideo.currentTime / mainVideo.duration) * 100;
    progress.style.width = `${percentage}%`;
}
