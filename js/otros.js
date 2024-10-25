
    // Espera a que el DOM esté listo
    $(document).ready(function() {
        // Asocia el evento clic a todos los botones dentro de los elementos <button>
        $('button').on('click', function() {
            // Realiza una animación simple al cambiar el color de fondo
            $(this).animate({backgroundColor: '#FFFF00'}, 500, function() {
                // Luego, vuelve al color original (puedes personalizar esto)
                $(this).animate({backgroundColor: ''}, 500);
            });
        });
    });

    $(document).ready(function () {
        $(".animated-button").hover(
            function () {
                $(this).animate({ fontSize: "18px" }, 200);
            },
            function () {
                $(this).animate({ fontSize: "16px" }, 200);
            }
        );
    });
