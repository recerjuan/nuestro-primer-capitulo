// Cambiar de pantallas
function cambiarPantalla(num) {
    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(pantalla => {
        pantalla.classList.remove('activa');
    });

    const destino = document.getElementById('pantalla' + num);
    if (destino) {
        destino.classList.add('activa');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Abrir el sobre para mostrar la carta
function abrirSobre() {
    const sobre = document.getElementById('sobreElemento');
    const contenedor = document.getElementById('contenedorSobre');
    const carta = document.getElementById('cartaEscribir');

    if (sobre) {
        sobre.classList.add('abriendo');
    }

    setTimeout(() => {
        if (contenedor) contenedor.classList.add('oculto-total');
        if (carta) carta.classList.remove('oculto-total');
    }, 600);
}

// Revelar notas de amor
function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

// Contador de tiempo (desde el 8 de Julio de 2026, 7:25 PM)
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    const segundosTotal = Math.floor(diferencia / 1000);
    const minutosTotal = Math.floor(segundosTotal / 60);
    const horasTotal = Math.floor(minutosTotal / 60);
    const dias = Math.floor(horasTotal / 24);

    const horas = horasTotal % 24;
    const minutos = minutosTotal % 60;
    const segundos = segundosTotal % 60;

    const eDias = document.getElementById('dias');
    const eHoras = document.getElementById('horas');
    const eMinutos = document.getElementById('minutos');
    const eSegundos = document.getElementById('segundos');

    if (eDias) eDias.innerText = dias;
    if (eHoras) eHoras.innerText = String(horas).padStart(2, '0');
    if (eMinutos) eMinutos.innerText = String(minutos).padStart(2, '0');
    if (eSegundos) eSegundos.innerText = String(segundos).padStart(2, '0');
}

// Controles de audio
function reproducirAudio(index) {
    for (let i = 0; i < 4; i++) {
        const audio = document.getElementById('audio-' + i);
        const card = document.getElementById('card-' + i);
        if (audio) audio.pause();
        if (card) card.classList.remove('activa');
    }

    const audioSeleccionado = document.getElementById('audio-' + index);
    const cardSeleccionada = document.getElementById('card-' + index);

    if (audioSeleccionado) {
        audioSeleccionado.play();
        if (cardSeleccionada) cardSeleccionada.classList.add('activa');
    }
}

function pausarAudio(index) {
    const audioSeleccionado = document.getElementById('audio-' + index);
    const cardSeleccionada = document.getElementById('card-' + index);

    if (audioSeleccionado) audioSeleccionado.pause();
    if (cardSeleccionada) cardSeleccionada.classList.remove('activa');
}

// Inicialización de efectos al cargar
window.onload = () => {
    const contenedorCorazones = document.getElementById('heartsContainer');
    if (contenedorCorazones) {
        const simbolos = ['♥️', '✨', '🌹'];
        for (let i = 0; i < 20; i++) {
            const corazon = document.createElement('div');
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
