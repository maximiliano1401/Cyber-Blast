// ESTE ENEMIGO APARECE REGULARMENTE Y VA A SUPER VELOCIDAD

const pasoEnemigo2 = 8; // Velocidad de movimiento del enemigo2

// Función para crear un nuevo enemigo2
function crearEnemigo2() {
    if (gameover) return;

    const enemigo2 = document.createElement('div');
    enemigo2.classList.add( 'enemigo-verde'); // Añadir clase para el enemigo verde
    enemigo2.id = new Date().getTime(); // Usar timestamp como ID único

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

    enemigo2.style.left = posicionInicialX + 'px';
    enemigo2.style.bottom = posicionInicialY + 'px';

    areaJuego.appendChild(enemigo2);
    enemigos.push(enemigo2);

    // Movimiento del enemigo en la dirección aleatoria determinada
    const intervaloEnemigo2 = setInterval(function() {
        if (gameover) {
            clearInterval(intervaloEnemigo2);
            areaJuego.removeChild(enemigo2);
            enemigos.splice(enemigos.indexOf(enemigo2), 1);
            return;
        }
        switch (direccion) {
            case 'arriba':
                posicionInicialY -= pasoEnemigo2;
                break;
            case 'abajo':
                posicionInicialY += pasoEnemigo2;
                break;
            case 'izquierda':
                posicionInicialX -= pasoEnemigo2;
                break;
            case 'derecha':
                posicionInicialX += pasoEnemigo2;
                break;
            default:
                break;
        }

        enemigo2.style.left = posicionInicialX + 'px';
        enemigo2.style.bottom = posicionInicialY + 'px';

        // Comprobar colisión del enemigo con el jugador
        comprobarColisionEnemigo2(enemigo2);

        // Eliminar el enemigo si sale del área de juego
        if (posicionInicialY < -50 || posicionInicialY > areaJuego.offsetHeight + 50 ||
            posicionInicialX < -50 || posicionInicialX > areaJuego.offsetWidth + 50) {
            clearInterval(intervaloEnemigo2);
            areaJuego.removeChild(enemigo2);
            enemigos.splice(enemigos.indexOf(enemigo2), 1);
        }
    }, 10);
}

// Función para comprobar colisión del enemigo2 con el jugador
function comprobarColisionEnemigo2(enemigo2) {
    if (jugadorOculto) return; // No comprobar colisiones si el jugador está oculto

    const rectEnemigo2 = enemigo2.getBoundingClientRect();
    const rectJugador = jugador.getBoundingClientRect();

    if (rectEnemigo2.bottom >= rectJugador.top && rectEnemigo2.top <= rectJugador.bottom &&
        rectEnemigo2.right >= rectJugador.left && rectEnemigo2.left <= rectJugador.right) {
        reducirVidasJugador(); // Reducir vidas del jugador y verificar GAME OVER
        areaJuego.removeChild(enemigo2); // Eliminar enemigo2 tras colisión
        enemigos.splice(enemigos.indexOf(enemigo2), 1); // Eliminar del array de enemigos
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
