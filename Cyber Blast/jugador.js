let paso = 5; // Velocidad de movimiento del jugador

// Función para mover al jugador
function moverJugador() {
    if (gameover) return;
    let posicionXJugador = parseInt(jugador.style.left);
    let posicionYJugador = parseInt(jugador.style.bottom);

    // Actualización de posición según las teclas presionadas
    if ('w' in teclasPresionadas) posicionYJugador += paso;
    if ('s' in teclasPresionadas) posicionYJugador -= paso;
    if ('a' in teclasPresionadas) posicionXJugador -= paso;
    if ('d' in teclasPresionadas) posicionXJugador += paso;

    // Limitar la posición del jugador dentro del área de juego
    posicionXJugador = Math.max(0, Math.min(areaJuego.offsetWidth - anchoJugador, posicionXJugador));
    posicionYJugador = Math.max(0, Math.min(areaJuego.offsetHeight - altoJugador, posicionYJugador));

    // Actualizar posición en el DOM y comprobar colisión
    jugador.style.left = posicionXJugador + 'px';
    jugador.style.bottom = posicionYJugador + 'px';

    comprobarColision();
}

// Función para comprobar colisión del jugador con los enemigos
function comprobarColision() {
    if (jugadorOculto) return; // No comprobar colisiones si el jugador está oculto

    const rectJugador = jugador.getBoundingClientRect();
    enemigos.forEach(function(enemigo) {
        const rectEnemigo = enemigo.getBoundingClientRect();
        if (rectJugador.bottom >= rectEnemigo.top && rectJugador.top <= rectEnemigo.bottom &&
            rectJugador.right >= rectEnemigo.left && rectJugador.left <= rectEnemigo.right) {
            reducirVidasJugador(); // Reducir vidas del jugador y verificar GAME OVER
        }
    });
}

// Función para reducir las vidas del jugador y comprobar GAME OVER
function reducirVidasJugador() {
    muerte.play();
    vidas = Math.max(0, vidas - 1);
    // Mostrar pantalla de Game Over cuando las vidas llegan a 0
    if (vidas === 0) {
        gameover = true;
        gameoverMensaje.style.display = 'block';
        puntuacionFinal.textContent = puntuacion;
        imagencitaVidas.removeChild(vida1);
        jugador.style.display = 'none';
    } else {
        ocultarJugador(); // Ocultar al jugador y mostrarlo después de un tiempo
    }
}

// Función para ocultar al jugador y mostrarlo después de un tiempo
function ocultarJugador() {
    jugador.style.display = 'none';
    jugadorOculto = true;
    puntuacion = Math.max(0, puntuacion - 50);
    elementoPuntuacion.textContent = puntuacion;

    switch (vidas) {
      case vidas = 2:
          imagencitaVidas.removeChild(vida3);
          break;
      case vidas = 1:
          imagencitaVidas.removeChild(vida2);
          break;
  }
  
    setTimeout(mostrarJugador, 2000);
}

// Función para mostrar al jugador y restablecer su posición
function mostrarJugador() {
    if (gameover) return;
    jugador.style.display = 'block';
    jugadorOculto = false;
    posicionXJugador = (areaJuego.offsetWidth / 2) - (anchoJugador / 2);
    posicionYJugador = (areaJuego.offsetHeight / 2) - (altoJugador / 2);
    jugador.style.left = posicionXJugador + 'px';
    jugador.style.bottom = posicionYJugador + 'px';

    eliminarTodosLosDisparos();
    enemigos.forEach(enemigo => areaJuego.removeChild(enemigo));
    enemigos = [];
}

// Función para eliminar todos los disparos de la pantalla
function eliminarTodosLosDisparos() {
    const disparos = document.querySelectorAll('.disparo');
    disparos.forEach(disparo => disparo.remove());
}
