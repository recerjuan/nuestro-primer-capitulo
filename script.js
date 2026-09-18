// Cambiar de pantallas
function cambiarPantalla(num) {
    var pantallas = document.querySelectorAll('.pantalla');
    for (var i = 0; i < pantallas.length; i++) {
        pantallas[i].classList.remove('activa');
    }

    var destino = document.getElementById('pantalla' + num);
    if (destino) {
        destino.classList.add('activa');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Abrir el sobre para mostrar la carta
function abrirSobre() {
    var sobre = document.getElementById('sobreElemento');
    var contenedor = document.getElementById('contenedorSobre');
    var carta = document.getElementById('cartaEscribir');

    if (sobre) {
        sobre.classList.add('abriendo');
    }

    setTimeout(function() {
        if (contenedor) contenedor.classList.add('oculto-total');
        if (carta) carta.classList.remove('oculto-total');
    }, 600);
}

// Revelar notas de amor incógnitas
function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

// Contador de tiempo (desde el 8 de Julio de 2024, 7:25 PM)
var fechaInicio = new Date(2024, 6, 8, 19, 25, 0);

function actualizarContador() {
    var ahora = new Date();
    var diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    var segundosTotal = Math.floor(diferencia / 1000);
    var minutosTotal = Math.floor(segundosTotal / 60);
    var horasTotal = Math.floor(minutosTotal / 60);
    var dias = Math.floor(horasTotal / 24);

    var horas = horasTotal % 24;
    var minutos = minutosTotal % 60;
    var segundos = segundosTotal % 60;

    var eDias = document.getElementById('dias');
    var eHoras = document.getElementById('horas');
    var eMinutos = document.getElementById('minutos');
    var eSegundos = document.getElementById('segundos');

    if (eDias) eDias.innerText = dias;
    if (eHoras) eHoras.innerText = String(horas).padStart(2, '0');
    if (eMinutos) eMinutos.innerText = String(minutos).padStart(2, '0');
    if (eSegundos) eSegundos.innerText = String(segundos).padStart(2, '0');
}

// Reproductor de música unificado
function toggleAudio(index) {
    for (var i = 0; i < 4; i++) {
        var audioEl = document.getElementById('audio-' + i);
        var cardEl = document.getElementById('card-' + i);
        var btnEl = cardEl ? cardEl.querySelector('.btn-play') : null;

        if (i !== index && audioEl) {
            audioEl.pause();
            if (cardEl) cardEl.classList.remove('activa');
            if (btnEl) btnEl.innerText = '▶ Play';
        }
    }

    var audioActual = document.getElementById('audio-' + index);
    var cardActual = document.getElementById('card-' + index);
    var btnActual = cardActual ? cardActual.querySelector('.btn-play') : null;

    if (audioActual) {
        if (audioActual.paused) {
            audioActual.play();
            if (cardActual) cardActual.classList.add('activa');
            if (btnActual) btnActual.innerText = '⏸ Pausa';
        } else {
            audioActual.pause();
            if (cardActual) cardActual.classList.remove('activa');
            if (btnActual) btnActual.innerText = '▶ Play';
        }
    }
}

// Inicializar efectos al cargar
window.onload = function() {
    var contenedorCorazones = document.getElementById('heartsContainer');
    if (contenedorCorazones) {
        var simbolos = ['♥️', '✨', '🌹'];
        for (var i = 0; i < 20; i++) {
            var corazon = document.createElement('div');
            corazon.className = 'corazon-flotante';
            corazon.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
            corazon.style.left = (Math.random() * 100) + '%';
            corazon.style.animationDelay = (Math.random() * 7) + 's';
            corazon.style.fontSize = (Math.random() * 0.8 + 0.9) + 'rem';
            contenedorCorazones.appendChild(corazon);
        }
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
};
