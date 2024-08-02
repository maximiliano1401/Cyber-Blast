function comprobarGameOver() {
    if (vidas === 0) {
        gameover = true;
        gameoverMensaje.style.display = 'block';
        puntuacionFinal.textContent = puntuacion;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    location.reload();
}