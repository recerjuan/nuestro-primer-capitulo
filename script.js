/* NAVEGACIÓN DE PANTALLAS */
let pantallaActual = 1;
const totalPantallas = 6;

function mostrarPantalla(numero) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    const pantallaDestino = document.getElementById(`pantalla${numero}`);
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
    const sobre = document.getElementById("sobreElemento");
    const contenedor = document.getElementById("contenedorSobre");
    const carta = document.getElementById("cartaEscribir");

    if (sobre && contenedor && carta) {
        sobre.classList.add("abriendo");
        setTimeout(() => {
            contenedor.classList.add("ocultar");
            carta.classList.remove("oculta");
        }, 600);
    }
}

function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

/* CONTADOR REGRESIVO/CORRECTO (8 de Julio de 2026, 7:25 PM) */
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);[cite: 1, 3]

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);

    const horas = horasTotales % 24;
    const minutos = minutosTotales % 60;
    const segundos = segundosTotales % 60;

    const elemDias = document.getElementById('dias');
    const elemHoras = document.getElementById('horas');
    const elemMin = document.getElementById('minutos');
    const elemSeg = document.getElementById('segundos');

    if (elemDias) elemDias.innerText = diasTotales;
    if (elemHoras) elemHoras.innerText = horas < 10 ? '0' + horas : horas;
    if (elemMin) elemMin.innerText = minutos < 10 ? '0' + minutos : minutos;
    if (elemSeg) elemSeg.innerText = segundos < 10 ? '0' + segundos : segundos;
}

/* CONTROL DE REPRODUCCIÓN AUDIO POR CANCIÓN */
function playAudio(index) {
    // Pausar cualquier otro audio sonando
    for (let i = 0; i < 4; i++) {
        const a = document.getElementById(`audio-${i}`);
        const card = document.getElementById(`card-${i}`);
        if (a) {
            a.pause();
        }
        if (card) {
            card.classList.remove('activa');
        }
    }

    // Reproducir el seleccionado
    const audioSeleccionado = document.getElementById(`audio-${index}`);
    const cardSeleccionada = document.getElementById(`card-${index}`);

    if (audioSeleccionado) {
        audioSeleccionado.play().then(() => {
            if (cardSeleccionada) cardSeleccionada.classList.add('activa');
        }).catch(e => {
            console.log("El navegador bloqueó la reproducción automatica:", e);
        });
    }
}

function pauseAudio(index) {
    const audioSeleccionado = document.getElementById(`audio-${index}`);
    const cardSeleccionada = document.getElementById(`card-${index}`);
    if (audioSeleccionado) {
        audioSeleccionado.pause();
    }
    if (cardSeleccionada) {
        cardSeleccionada.classList.remove('activa');
    }
}

/* CORAZONES FLOTANTES */
function crearCorazones() {
    const contenedor = document.getElementById('heartsContainer');
    if (!contenedor) return;
    
    const simbolos = ['♥️', '✨', '🌹'];
    
    for (let i = 0; i < 20; i++) {
        const corazon = document.createElement('div');
        corazon.className = 'corazon-flotante';
        corazon.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        corazon.style.left = `${Math.random() * 100}%`;
        corazon.style.animationDelay = `${Math.random() * 7}s`;
        corazon.style.fontSize = `${Math.random() * 1 + 0.9}rem`;
        contenedor.appendChild(corazon);
    }
}

window.onload = () => {
    crearCorazones();
    actualizarContador();
    setInterval(actualizarContador, 1000);
};
