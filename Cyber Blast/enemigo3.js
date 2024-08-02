const pasoEnemigo3 = 4; // Velocidad de movimiento del enemigo3
const duracionCongelado = 5000; // Duración en milisegundos para el efecto de congelación
let jugadorCongelado = false; // Estado de congelación del jugador

// Función para crear un nuevo enemigo3
function crearEnemigo3() {
    if (gameover) return;

    const enemigo3 = document.createElement('div');
    enemigo3.classList.add('enemigo-azul'); // Añadir clase para el enemigo azul
    enemigo3.id = new Date().getTime(); // Usar timestamp como ID único

    const direccion = obtenerDireccionAleatoria();
    let posicionInicialX, posicionInicialY;

    switch (direccion) {
        case 'arriba':
            posicionInicialX = obtenerPosicionAleatoria(50, areaJuego.offsetWidth - 50);
            posicionInicialY = areaJuego.offsetHeight + 50; // Aparece desde arriba
            enemigo2.style.transform = 'rotate(270deg)';
            break;
        case 'abajo':
            posicionInicialX = obtenerPosicionAleatoria(50, areaJuego.offsetWidth - 50);
            posicionInicialY = -50; // Aparece desde abajo
            enemigo2.style.transform = 'rotate(90deg)';
            break;
        case 'izquierda':
            posicionInicialX = areaJuego.offsetWidth + 50; // Aparece desde la izquierda
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            break;
        case 'derecha':
            posicionInicialX = -50; // Aparece desde la derecha
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            enemigo2.style.transform = 'rotate(180deg)';
            break;
        default:
            break;
    }

    enemigo3.style.left = posicionInicialX + 'px';
    enemigo3.style.top = posicionInicialY + 'px';

    areaJuego.appendChild(enemigo3);
    enemigos.push(enemigo3);

    // Movimiento del enemigo en la dirección aleatoria determinada
    const intervaloEnemigo3 = setInterval(function() {
        if (gameover) {
            clearInterval(intervaloEnemigo3);
            areaJuego.removeChild(enemigo3);
            enemigos.splice(enemigos.indexOf(enemigo3), 1);
            return;
        }
        switch (direccion) {
            case 'arriba':
                posicionInicialY -= pasoEnemigo3;
                break;
            case 'abajo':
                posicionInicialY += pasoEnemigo3;
                break;
            case 'izquierda':
                posicionInicialX -= pasoEnemigo3;
                break;
            case 'derecha':
                posicionInicialX += pasoEnemigo3;
                break;
            default:
                break;
        }

        enemigo3.style.left = posicionInicialX + 'px';
        enemigo3.style.top = posicionInicialY + 'px';

        // Comprobar colisión del enemigo con el jugador
        comprobarColisionEnemigo3(enemigo3);

        // Eliminar el enemigo si sale del área de juego
        if (posicionInicialY < -50 || posicionInicialY > areaJuego.offsetHeight + 50 ||
            posicionInicialX < -50 || posicionInicialX > areaJuego.offsetWidth + 50) {
            clearInterval(intervaloEnemigo3);
            areaJuego.removeChild(enemigo3);
            enemigos.splice(enemigos.indexOf(enemigo3), 1);
        }
    }, 10);
}

// Función para comprobar colisión del enemigo3 con el jugador
function comprobarColisionEnemigo3(enemigo3) {
    if (jugadorOculto) return; // No comprobar colisiones si el jugador está oculto

    const rectEnemigo3 = enemigo3.getBoundingClientRect();
    const rectJugador = jugador.getBoundingClientRect();

    if (rectEnemigo3.bottom >= rectJugador.top && rectEnemigo3.top <= rectJugador.bottom &&
        rectEnemigo3.right >= rectJugador.left && rectEnemigo3.left <= rectJugador.right) {
        if (!jugadorCongelado) {
            congelarJugador(); // Congelar al jugador por 5 segundos
            eliminarEnemigo3(enemigo3); // Eliminar enemigo3 tras colisión
        }
    }
}

// Función para congelar al jugador
function congelarJugador() {
    jugadorCongelado = true;

    // Desactivar el movimiento del jugador
    document.removeEventListener('keydown', manejarMovimientoJugador);
    document.removeEventListener('keyup', manejarMovimientoJugador);

    // Mostrar mensaje de congelación
    const mensajeCongelado = document.createElement('div');
    mensajeCongelado.id = 'mensajeCongelado';
    mensajeCongelado.innerHTML = `<div>ESTÁ CONGELADO</div><div id="cuentaRegresiva">5</div>`;
    mensajeCongelado.style.position = 'fixed';
    mensajeCongelado.style.bottom = '10px';
    mensajeCongelado.style.right = '10px';
    mensajeCongelado.style.backgroundColor = 'blue';
    mensajeCongelado.style.color = 'white';
    mensajeCongelado.style.padding = '10px';
    mensajeCongelado.style.borderRadius = '5px';
    mensajeCongelado.style.fontSize = '16px';
    document.body.appendChild(mensajeCongelado);

    // Contador regresivo para el efecto de congelación
    let tiempoRestante = 5;
    const intervaloCuentaRegresiva = setInterval(() => {
        tiempoRestante--;
        document.getElementById('cuentaRegresiva').textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloCuentaRegresiva);
            document.body.removeChild(mensajeCongelado);
            jugadorCongelado = false;
            
            // Reactivar el movimiento del jugador
            document.addEventListener('keydown', manejarMovimientoJugador);
            document.addEventListener('keyup', manejarMovimientoJugador);
        }
    }, 1000);
}

// Función para eliminar el enemigo3
function eliminarEnemigo3(enemigo3) {
    if (enemigos.includes(enemigo3)) {
        areaJuego.removeChild(enemigo3);
        enemigos.splice(enemigos.indexOf(enemigo3), 1);
    }
}

// Función para obtener una posición aleatoria entre min y max para el enemigo
function obtenerPosicionAleatoria(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para obtener una dirección de movimiento aleatoria del enemigo
function obtenerDireccionAleatoria() {
    const direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
    const indiceAleatorio = Math.floor(Math.random() * direcciones.length);
    return direcciones[indiceAleatorio];
}

// Función para manejar el movimiento del jugador (suponiendo que ya la tienes implementada)
function manejarMovimientoJugador(event) {
    // Aquí va la lógica para el movimiento del jugador
    if (jugadorCongelado) return; // No permitir movimiento si el jugador está congelado

    // Ejemplo básico de movimiento
    switch (event.key) {
        case 'ArrowUp':
            jugador.style.top = (parseInt(jugador.style.top) - 5) + 'px';
            break;
        case 'ArrowDown':
            jugador.style.top = (parseInt(jugador.style.top) + 5) + 'px';
            break;
        case 'ArrowLeft':
            jugador.style.left = (parseInt(jugador.style.left) - 5) + 'px';
            break;
        case 'ArrowRight':
            jugador.style.left = (parseInt(jugador.style.left) + 5) + 'px';
            break;
        default:
            break;
    }
}