  // Evento que se ejecuta cuando la página se carga completamente
  document.addEventListener("DOMContentLoaded", function () {
    // Abre la base de datos 'biblioteca' con versión 1
    var solicitudDB = indexedDB.open('biblioteca', 1);

    // Manejador de éxito al abrir la base de datos
    solicitudDB.onsuccess = function (event) {
        var db = event.target.result;

        // Muestra los libros en la lista
        mostrarLibrosEnLista(db, 'listaLibros');
    };

    // Manejador de error al abrir la base de datos
    solicitudDB.onerror = function (event) {
        console.error("Error al abrir la base de datos:", event.target.error);
    };

    // Manejador de actualización de la base de datos (se ejecuta si cambia la versión)
    solicitudDB.onupgradeneeded = function (event) {
        var db = event.target.result;

        // Crea un almacén de objetos 'libros' si no existe
        if (!db.objectStoreNames.contains('libros')) {
            db.createObjectStore('libros', { keyPath: 'id', autoIncrement: true });
        }
    };
});

// Función para mostrar libros en una lista HTML
function mostrarLibrosEnLista(db, listaId) {
    // Abre una transacción para acceder al almacén de objetos 'libros' con permisos de solo lectura
    var transaccion = db.transaction(['libros'], 'readonly');

    // Accede al almacén de objetos
    var almacenLibros = transaccion.objectStore('libros');

    // Abre un cursor para recorrer todos los objetos en el almacén
    var cursor = almacenLibros.openCursor();

    // Referencia al elemento de lista en el DOM
    var lista = document.getElementById(listaId);

    // Manejador que se llama para cada libro en el almacén
    cursor.onsuccess = function (event) {
        var cursorActual = event.target.result;
        if (cursorActual) {
            // Crea un elemento de lista para cada libro y lo agrega a la lista en el DOM
            var libroElement = document.createElement('li');
            libroElement.textContent = `Título: ${cursorActual.value.titulo}, Autor: ${cursorActual.value.autor}, Género: ${cursorActual.value.genero}`;
            lista.appendChild(libroElement);

            // Continúa con el siguiente libro en el almacén
            cursorActual.continue();
        } else {
            // Cierra la transacción
            transaccion.oncomplete = function () {
                console.log('Fin de la lista de libros.');
            };
        }
    };
}

// Función para agregar un libro al hacer clic en el botón
function agregarLibro() {
    // Obtén los valores del formulario
    var titulo = document.getElementById('titulo').value;
    var autor = document.getElementById('autor').value;
    var genero = document.getElementById('genero').value;

    // Validaciones adicionales si es necesario...

    // Crea un objeto de libro con los valores del formulario
    var libro = { titulo: titulo, autor: autor, genero: genero };

    // Abre la base de datos 'biblioteca' con versión 1
    var solicitudDB = indexedDB.open('biblioteca', 1);

    // Manejador de éxito al abrir la base de datos
    solicitudDB.onsuccess = function (event) {
        var db = event.target.result;

        // Agrega el libro a la base de datos
        agregarLibroEnDB(db, libro);

        // Muestra los libros actualizados en la lista
        mostrarLibrosEnLista(db, 'listaLibros');
    };

    // Manejador de error al abrir la base de datos
    solicitudDB.onerror = function (event) {
        console.error("Error al abrir la base de datos:", event.target.error);
    };
}

// Función para agregar un libro a la base de datos
function agregarLibroEnDB(db, libro) {
    // Abre una transacción para acceder al almacén de objetos 'libros' con permisos de lectura y escritura
    var transaccion = db.transaction(['libros'], 'readwrite');

    // Accede al almacén de objetos
    var almacenLibros = transaccion.objectStore('libros');

    // Agrega el libro al almacén de objetos
    var agregarLibro = almacenLibros.add(libro);

    // Manejador de éxito al agregar el libro al almacén
    agregarLibro.onsuccess = function () {
        console.log('Libro agregado correctamente a la base de datos.');
    };

    // Manejador de error al agregar el libro al almacén
    agregarLibro.onerror = function () {
        console.error('Error al agregar el libro a la base de datos.');
    };

    // Cierra la transacción
    transaccion.oncomplete = function () {
        db.close();
    };
}