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

// Función de actualización del juego
function actualizarJuego() {
    if (gameover) {
        return;
    }

    moverJugador();
    dispararProyectil();

    // Solicitar el próximo frame
    requestAnimationFrame(actualizarJuego);
}

// Función para gestionar la creación de enemigos
function gestionarCreacionDeEnemigos() {
    setInterval(crearEnemigo, 1000); // Crear un nuevo enemigo cada 0.1 segundos
    setInterval(crearEnemigo2, 3800); // Crear un nuevo enemigo2 cada 0.1 segundo
    setInterval(crearEnemigo3, 5000); // Crear un nuevo enemigo3 cada 0.2 segundos
}

// Inicia la gestión de creación de enemigos
gestionarCreacionDeEnemigos();

// Inicia la actualización del juego
requestAnimationFrame(actualizarJuego);