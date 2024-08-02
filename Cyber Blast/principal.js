// Obtener referencias a elementos y configuración inicial
const jugador = document.getElementById('jugador');
const areaJuego = document.getElementById('area-juego');
const elementoPuntuacion = document.getElementById('valor-puntuacion');
const gameoverMensaje = document.getElementById('game-over');
const puntuacionFinal = document.getElementById('puntuacion-final');
const anchoJugador = jugador.offsetWidth;
const altoJugador = jugador.offsetHeight;

const imagencitaVidas = document.getElementById('vidas');
const vida3 = document.getElementById('imagen-vida3');
const vida2 = document.getElementById('imagen-vida2');
const vida1 = document.getElementById('imagen-vida1');

let teclasPresionadas = {};
let proyectiles = [];
let enemigos = [];
let puntuacion = 0;
let vidas = 3;
let jugadorOculto = false;
let gameover = false;

jugador.style.left = (areaJuego.offsetWidth / 2 - anchoJugador / 2) + 'px';
jugador.style.bottom = (areaJuego.offsetHeight / 2 - altoJugador / 2) + 'px';

// Event listeners para teclas presionadas y liberadas
document.addEventListener('keydown', function(event) {
    teclasPresionadas[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    delete teclasPresionadas[event.key];
});

// Ejecutar funciones de movimiento, disparo y creación de enemigos cada cierto intervalo
setInterval(moverJugador, 10);
setInterval(dispararProyectil, 10);
setInterval(crearEnemigo, 500); // Crear un nuevo enemigo cada 0.5 segundos
setInterval(crearEnemigo2, 5000); // Crear un nuevo enemigo2 cada 5 segundo
setInterval(crearEnemigo3, 10000); // Crear un nuevo enemigo3 cada 10 segundo

