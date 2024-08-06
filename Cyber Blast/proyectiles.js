const velocidadProyectil = 5; // Velocidad del proyectil
const frecuenciaDisparo = 300; // Tiempo en milisegundos entre cada disparo del jugador
let ultimoDisparoJugador = 0;

// Función para disparar un proyectil desde la posición actual del jugador
function dispararProyectil() {
    if (gameover) return;
    const tiempoActual = new Date().getTime();
    if (('ArrowUp' in teclasPresionadas || 'ArrowDown' in teclasPresionadas || 'ArrowLeft' in teclasPresionadas || 'ArrowRight' in teclasPresionadas) && !jugadorOculto && tiempoActual - ultimoDisparoJugador > frecuenciaDisparo) {
        disparo2.load();
        disparo2.play();
        const proyectil = document.createElement('div');
        proyectil.classList.add('proyectil');
        proyectil.style.left = (parseInt(jugador.style.left) + anchoJugador / 2 - 5) + 'px'; // Posición inicial del proyectil en el centro del jugador
        proyectil.style.bottom = (parseInt(jugador.style.bottom) + altoJugador / 2 - 5) + 'px';
        areaJuego.appendChild(proyectil);
        proyectiles.push(proyectil);

        const direccionDisparo = obtenerDireccionDisparo(); // Obtener la dirección del disparo

        const intervaloProyectil = setInterval(function() {
            const posicionYProyectil = parseInt(proyectil.style.bottom);
            const posicionXProyectil = parseInt(proyectil.style.left);

            // Mover el proyectil en la dirección determinada por la función obtenerDireccionDisparo
            switch (direccionDisparo) {
                case 'arriba':
                    proyectil.style.bottom = (posicionYProyectil + velocidadProyectil) + 'px';
                    break;
                case 'abajo':
                    proyectil.style.bottom = (posicionYProyectil - velocidadProyectil) + 'px';
                    break;
                case 'izquierda':
                    proyectil.style.left = (posicionXProyectil - velocidadProyectil) + 'px';
                    break;
                case 'derecha':
                    proyectil.style.left = (posicionXProyectil + velocidadProyectil) + 'px';
                    break;
                default:
                    break;
            }

            // Detectar colisión del proyectil con los enemigos
            enemigos.forEach(function(enemigo) {
                const rectEnemigo = enemigo.getBoundingClientRect();
                const rectProyectil = proyectil.getBoundingClientRect();
                if (rectProyectil.bottom >= rectEnemigo.top && rectProyectil.top <= rectEnemigo.bottom &&
                    rectProyectil.right >= rectEnemigo.left && rectProyectil.left <= rectEnemigo.right) {
                    clearInterval(intervaloProyectil);
                    areaJuego.removeChild(proyectil);
                    proyectiles.splice(proyectiles.indexOf(proyectil), 1);
                    areaJuego.removeChild(enemigo);
                    enemigos.splice(enemigos.indexOf(enemigo), 1);
                    puntuacion += 10;
                    elementoPuntuacion.textContent = puntuacion;
                    explosion.load();
                    explosion.play();
                }
            });

            // Eliminar el proyectil si sale del área de juego
            if (posicionYProyectil > areaJuego.offsetHeight || posicionYProyectil < 0 ||
                posicionXProyectil > areaJuego.offsetWidth || posicionXProyectil < 0) {
                clearInterval(intervaloProyectil);
                areaJuego.removeChild(proyectil);
                proyectiles.splice(proyectiles.indexOf(proyectil), 1);
            }
        }, 10);

        ultimoDisparoJugador = tiempoActual;
    }
}

// Función para obtener la dirección del disparo según las teclas presionadas
function obtenerDireccionDisparo() {
    if ('ArrowUp' in teclasPresionadas) return 'arriba';
    if ('ArrowDown' in teclasPresionadas) return 'abajo';
    if ('ArrowLeft' in teclasPresionadas) return 'izquierda';
    if ('ArrowRight' in teclasPresionadas) return 'derecha';
}
