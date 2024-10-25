 // Obtener preferencias almacenadas
 const nombreUsuario = localStorage.getItem('nombreUsuario');
 const colorFondo = localStorage.getItem('colorFondo');
 const colorLetra = localStorage.getItem('colorLetra');

 if (nombreUsuario && colorFondo && colorLetra) {
     document.getElementById('nombreUsuario').innerText = nombreUsuario;
     document.getElementById('colorFondo').innerText = colorFondo;
     document.getElementById('colorLetra').innerText = colorLetra;
 } else {
     // Redirigir a la página de preferencias si no hay preferencias almacenadas
     window.location.href = 'index.html';
 }

 // Función para borrar preferencias
 function borrarPreferencias() {
     localStorage.clear();
     window.location.href = 'index.html';
 }