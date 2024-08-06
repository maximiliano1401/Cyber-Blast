const pasoEnemigo = 2; // Velocidad de movimiento de los enemigos
const probabilidadDisparar = 0.1; // Probabilidad de que un enemigo dispare (10%)

// Función para crear un nuevo enemigo con posición y dirección aleatorias
function crearEnemigo() {
    if (gameover) return;
    const enemigo = document.createElement('div');
    enemigo.classList.add('enemigo');
    enemigo.id = new Date().getTime(); // Usar timestamp como ID único
    enemigo.disparos = []; // Almacenar disparos asociados al enemigo

    const direccion = obtenerDireccionAleatoria();
    let posicionInicialX, posicionInicialY;

    switch (direccion) {
        case 'arriba':
            posicionInicialX = obtenerPosicionAleatoria(50, areaJuego.offsetWidth - 50);
            posicionInicialY = areaJuego.offsetHeight + 50; // Aparece desde arriba
            break;
        case 'abajo':
            posicionInicialX = obtenerPosicionAleatoria(50, areaJuego.offsetWidth - 50);
            posicionInicialY = -50; // Aparece desde abajo
            break;
        case 'izquierda':
            posicionInicialX = areaJuego.offsetWidth + 50; // Aparece desde la izquierda
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            break;
        case 'derecha':
            posicionInicialX = -50; // Aparece desde la derecha
            posicionInicialY = obtenerPosicionAleatoria(50, areaJuego.offsetHeight - 50);
            break;
        default:
            break;
    }

    enemigo.style.left = posicionInicialX + 'px';
    enemigo.style.bottom = posicionInicialY + 'px';

    areaJuego.appendChild(enemigo);
    enemigos.push(enemigo);

    // Determinar si este enemigo puede disparar
    const puedeDisparar = Math.random() < probabilidadDisparar;
    let intervaloDisparar;

    if (puedeDisparar) {
        enemigo.classList.add('enemigo-disparador');
        // Comenzar a disparar a intervalos regulares
        intervaloDisparar = setInterval(function() {
            if (!gameover && document.contains(enemigo)) {
                disparar(enemigo);
            }
        }, 1000); // Dispara cada segundo
        enemigo.intervaloDisparar = intervaloDisparar; // Almacenar referencia del intervalo
    }

    // Movimiento del enemigo en la dirección aleatoria determinada
    const intervaloEnemigo = setInterval(function() {
        if (gameover) {
            clearInterval(intervaloEnemigo);
            if (enemigo.intervaloDisparar) {
                clearInterval(enemigo.intervaloDisparar); // Limpiar el intervalo de disparo
            }
            eliminarDisparosEnemigo(enemigo); // Limpiar los disparos del enemigo
            return;
        }
        switch (direccion) {
            case 'arriba':
                posicionInicialY -= pasoEnemigo;
                break;
            case 'abajo':
                posicionInicialY += pasoEnemigo;
                break;
            case 'izquierda':
                posicionInicialX -= pasoEnemigo;
                break;
            case 'derecha':
                posicionInicialX += pasoEnemigo;
                break;
            default:
                break;
        }

        enemigo.style.left = posicionInicialX + 'px';
        enemigo.style.bottom = posicionInicialY + 'px';

        // Eliminar el enemigo si sale del área de juego
        if (posicionInicialY < -50 || posicionInicialY > areaJuego.offsetHeight + 50 ||
            posicionInicialX < -50 || posicionInicialX > areaJuego.offsetWidth + 50) {
            clearInterval(intervaloEnemigo);
            if (enemigo.intervaloDisparar) {
                clearInterval(enemigo.intervaloDisparar); // Limpiar el intervalo de disparo
            }
            eliminarDisparosEnemigo(enemigo); // Limpiar los disparos del enemigo
            areaJuego.removeChild(enemigo);
            enemigos.splice(enemigos.indexOf(enemigo), 1);
        }
    }, 10);
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

// Función para que los enemigos disparen en las cuatro direcciones
function disparar(enemigo) {
    const direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
    direcciones.forEach(direccion => {
        const disparo = document.createElement('div');
        disparo.classList.add('disparo', `disparo-${direccion}`);
        disparo.style.left = enemigo.style.left;
        disparo.style.bottom = enemigo.style.bottom;

        areaJuego.appendChild(disparo);
        enemigo.disparos.push(disparo); // Almacenar el disparo en el enemigo

        const intervaloDisparo = setInterval(function() {
            let left = parseFloat(disparo.style.left);
            let bottom = parseFloat(disparo.style.bottom);

            switch (direccion) {
                case 'arriba':
                    bottom += pasoEnemigo;
                    break;
                case 'abajo':
                    bottom -= pasoEnemigo;
                    break;
                case 'izquierda':
                    left -= pasoEnemigo;
                    break;
                case 'derecha':
                    left += pasoEnemigo;
                    break;
                default:
                    break;
            }

            disparo.style.left = left + 'px';
            disparo.style.bottom = bottom + 'px';

            // Comprobar colisión del disparo con el jugador
            comprobarColisionDisparo(disparo);

            // Eliminar el disparo si sale del área de juego
            if (bottom < 0 || bottom > areaJuego.offsetHeight || 
                left < 0 || left > areaJuego.offsetWidth) {
                clearInterval(intervaloDisparo);
                if (disparo.parentElement) {
                    areaJuego.removeChild(disparo);
                }
                enemigo.disparos.splice(enemigo.disparos.indexOf(disparo), 1); // Eliminar del array del enemigo
            }
        }, 10);
        disparo.intervaloDisparo = intervaloDisparo; // Almacenar referencia del intervalo de disparo
    });
}

// Función para eliminar todos los disparos de un enemigo
function eliminarDisparosEnemigo(enemigo) {
    enemigo.disparos.forEach(disparo => {
        clearInterval(disparo.intervaloDisparo); // Limpiar el intervalo de disparo
        if (disparo.parentElement) {
            areaJuego.removeChild(disparo);
        }
    });
    enemigo.disparos = []; // Vaciar el array de disparos
}

// Función para comprobar colisión del disparo con el jugador
function comprobarColisionDisparo(disparo) {
    if (jugadorOculto) return; // No comprobar colisiones si el jugador está oculto

    const rectDisparo = disparo.getBoundingClientRect();
    const rectJugador = jugador.getBoundingClientRect();

    if (rectDisparo.bottom >= rectJugador.top && rectDisparo.top <= rectJugador.bottom &&
        rectDisparo.right >= rectJugador.left && rectDisparo.left <= rectJugador.right) {
        reducirVidasJugador(); // Reducir vidas del jugador y verificar GAME OVER
        eliminarDisparo(disparo); // Eliminar disparo tras colisión con el jugador
    }
}

// Función para eliminar un disparo del DOM
function eliminarDisparo(disparo) {
    if (disparo.parentElement) {
        clearInterval(disparo.intervaloDisparo); // Limpiar el intervalo de disparo
        areaJuego.removeChild(disparo);
    }
}

// Función para comprobar colisión del disparo del jugador con el enemigo
function comprobarColisionDisparoJugador(disparo, enemigo) {
    const rectDisparo = disparo.getBoundingClientRect();
    const rectEnemigo = enemigo.getBoundingClientRect();

    if (rectDisparo.bottom >= rectEnemigo.top && rectDisparo.top <= rectEnemigo.bottom &&
        rectDisparo.right >= rectEnemigo.left && rectDisparo.left <= rectEnemigo.right) {
        areaJuego.removeChild(enemigo);
        enemigos.splice(enemigos.indexOf(enemigo), 1); // Eliminar del array de enemigos
        eliminarDisparo(disparo); // Eliminar disparo tras colisión
    }
}
