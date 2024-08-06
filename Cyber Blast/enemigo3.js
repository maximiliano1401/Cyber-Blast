const pasoEnemigo3 = 4; // Velocidad de movimiento del enemigo3

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
            enemigo3.style.transform = 'rotate(270deg)';
            break;
        case 'abajo':
            posicionInicialX = obtenerPosicionAleatoria(50, areaJuego.offsetWidth - 50);
            posicionInicialY = -50; // Aparece desde abajo
            enemigo3.style.transform = 'rotate(90deg)';
            break;
        case 'izquierda':
            posicionInicialX = areaJuego.offsetWidth + 50; // Aparece desde la izquierda
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            break;
        case 'derecha':
            posicionInicialX = -50; // Aparece desde la derecha
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            enemigo3.style.transform = 'rotate(180deg)';
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
        if (comprobarColisionEnemigo3(enemigo3)) {
            clearInterval(intervaloEnemigo3); // Detener el movimiento del enemigo3
            areaJuego.removeChild(enemigo3); // Eliminar enemigo3 del área de juego
            enemigos.splice(enemigos.indexOf(enemigo3), 1); // Eliminar enemigo3 del arreglo enemigos
        }

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
    if (jugadorOculto) return false; // No comprobar colisiones si el jugador está oculto

    const rectEnemigo3 = enemigo3.getBoundingClientRect();
    const rectJugador = jugador.getBoundingClientRect();

    if (rectJugador.bottom >= rectEnemigo3.top && rectJugador.top <= rectEnemigo3.bottom &&
        rectJugador.right >= rectEnemigo3.left && rectJugador.left <= rectEnemigo3.right) {
        reducirVelocidadJugador(); // Reducir la velocidad del jugador al colisionar con el enemigo3
        return true; // Indica que hubo una colisión
    }

    return false; // No hubo colisión
}

// Función para obtener una dirección aleatoria para el enemigo
function obtenerDireccionAleatoria() {
    const direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
    const indiceAleatorio = Math.floor(Math.random() * direcciones.length);
    return direcciones[indiceAleatorio];
}

// Función para obtener una posición aleatoria dentro de un rango
function obtenerPosicionAleatoria(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar enemigo3 cada 3 segundos
setInterval(crearEnemigo3, 3000);
