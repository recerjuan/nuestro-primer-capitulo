/* NAVEGACIÓN ENTRE PANTALLAS (CORREGIDO) */
var pantallaActual = 1;
var totalPantallas = 6;

function mostrarPantalla(numero) {
    var pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(function(p) {
        p.classList.remove('activa');
    });
    
    var pantallaDestino = document.getElementById('pantalla' + numero);
    if (pantallaDestino) {
        pantallaDestino.classList.add('activa');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function siguientePantalla() {
    if (pantallaActual < totalPantallas) {
        pantallaActual++;
        mostrarPantalla(pantallaActual);
    }
}

function anteriorPantalla() {
    if (pantallaActual > 1) {
        pantallaActual--;
        mostrarPantalla(pantallaActual);
    }
}

/* ANIMACIÓN DE APERTURA DEL SOBRE */
function abrirCarta() {
    var sobre = document.getElementById("sobreElemento");
    var contenedor = document.getElementById("contenedorSobre");
    var carta = document.getElementById("cartaEscribir");

    if (sobre && contenedor && carta) {
        sobre.classList.add("abriendo");
        setTimeout(function() {
            contenedor.classList.add("ocultar");
            carta.classList.remove("oculta");
        }, 500);
    }
}

function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

/* CONTADOR DE TIEMPO REAL (8 de Julio, 7:25 PM) */
var fechaInicio = new Date(2026, 6, 8, 19, 25, 0);[cite: 1]

function actualizarContador() {
    var ahora = new Date();
    var diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    var segundosTotales = Math.floor(diferencia / 1000);
    var minutosTotales = Math.floor(segundosTotales / 60);
    var horasTotales = Math.floor(minutosTotales / 60);
    var diasTotales = Math.floor(horasTotales / 24);

    var horas = horasTotales % 24;
    var minutos = minutosTotales % 60;
    var segundos = segundosTotales % 60;

    var elemDias = document.getElementById('dias');
    var elemHoras = document.getElementById('horas');
    var elemMin = document.getElementById('minutos');
    var elemSeg = document.getElementById('segundos');

    if (elemDias) elemDias.innerText = diasTotales;
    if (elemHoras) elemHoras.innerText = horas < 10 ? '0' + horas : horas;
    if (elemMin) elemMin.innerText = minutos < 10 ? '0' + minutos : minutos;
    if (elemSeg) elemSeg.innerText = segundos < 10 ? '0' + segundos : segundos;
}

/* REPRODUCCIÓN INDEPENDIENTE Y CONTROL DE AUDIO */
function playAudio(index) {
    for (var i = 0; i < 4; i++) {
        var a = document.getElementById('audio-' + i);
        var card = document.getElementById('card-' + i);
        if (a) {
            a.pause();
        }
        if (card) {
            card.classList.remove('activa');
        }
    }

    var audioSeleccionado = document.getElementById('audio-' + index);
    var cardSeleccionada = document.getElementById('card-' + index);

    if (audioSeleccionado) {
        audioSeleccionado.play().then(function() {
            if (cardSeleccionada) cardSeleccionada.classList.add('activa');
        }).catch(function(e) {
            console.log("Error al reproducir audio:", e);
        });
    }
}

function pauseAudio(index) {
    var audioSeleccionado = document.getElementById('audio-' + index);
    var cardSeleccionada = document.getElementById('card-' + index);
    if (audioSeleccionado) {
        audioSeleccionado.pause();
    }
    if (cardSeleccionada) {
        cardSeleccionada.classList.remove('activa');
    }
}

/* CORAZONES FLOTANTES */
function crearCorazones() {
    var contenedor = document.getElementById('heartsContainer');
    if (!contenedor) return;
    
    var simbolos = ['♥️', '✨', '🌹'];
    
    for (var i = 0; i < 20; i++) {
        var corazon = document.createElement('div');
        corazon.className = 'corazon-flotante';
        corazon.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        corazon.style.left = (Math.random() * 100) + '%';
        corazon.style.animationDelay = (Math.random() * 7) + 's';
        corazon.style.fontSize = (Math.random() * 1 + 0.9) + 'rem';
        contenedor.appendChild(corazon);
    }
}

window.onload = function() {
    crearCorazones();
    actualizarContador();
    setInterval(actualizarContador, 1000);
};
