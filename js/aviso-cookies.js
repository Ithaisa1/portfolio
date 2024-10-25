document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('cookies-aceptadas')) {
        mostrarAvisoCookies();
    }
});

function mostrarAvisoCookies() {
    const avisoCookies = document.getElementById('aviso-cookies');
    avisoCookies.style.display = 'block';
}

function aceptarCookies() {
    const avisoCookies = document.getElementById('aviso-cookies');
    avisoCookies.style.display = 'none';
    localStorage.setItem('cookies-aceptadas', 'true');
}
