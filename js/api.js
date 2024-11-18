let speed = 0;
let steeringWheel = document.getElementById('steering-wheel');
let speedValue = document.getElementById('speed-value');

// Variables de orientación
let lastAlpha = 0;  // ángulo en grados de giro en Z (giro del dispositivo)
let speedInterval = null;

// Función para manejar la orientación del dispositivo
function handleOrientation(event) {
    let alpha = event.alpha; // ángulo de rotación del dispositivo en Z (giro en el eje vertical)

    // Rango del ángulo del volante, de -30 a 30 grados
    let rotation = (alpha - lastAlpha) * 0.5; // Control de la velocidad del movimiento del volante
    lastAlpha = alpha;

    // Aplicamos la rotación al volante
    steeringWheel.style.transform = `rotate(${rotation}deg)`;

    // Simulamos una velocidad aumentando lentamente
    speed += 0.05; // Aumentamos la velocidad
    speedValue.innerText = Math.round(speed); // Mostramos la velocidad en pantalla

    // Puedes ajustar la velocidad a tus preferencias, o hacerla variar más rápidamente en función de otros eventos.
}

// Detectamos la orientación del dispositivo
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, false);
} else {
    alert("Tu dispositivo no soporta la API de orientación.");
}