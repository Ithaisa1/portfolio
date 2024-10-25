// Verificamos si el navegador soporta la geolocalización
if ("geolocation" in navigator) {
    // Solicitamos la geolocalización
    navigator.geolocation.getCurrentPosition(function(position) {
        // Extraemos las coordenadas
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Mostramos las coordenadas en la consola
        console.log("Latitud: " + latitude + ", Longitud: " + longitude);
    }, function(error) {
        // Manejamos posibles errores
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("Permiso denegado para obtener la ubicación.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Información de ubicación no disponible.");
                break;
            case error.TIMEOUT:
                console.log("Tiempo de espera agotado al intentar obtener la ubicación.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("Ocurrió un error desconocido al intentar obtener la ubicación.");
                break;
        }
    });
} else {
    console.log("La geolocalización no es compatible con este navegador.");
}
