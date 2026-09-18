/* =====================================================
   PLAYLIST Y CONTROL DE AUDIO
====================================================== */
const playlist = [
    { titulo: "A Dónde Vamos", artista: "Morat", archivo: "a-donde-vamos.mp3" },
    { titulo: "Cesantías de Amor", artista: "Diomedes Díaz", archivo: "cesantias-de-amor.mp3" },
    { titulo: "La Persona de Mi Vida", artista: "Iván Villazón", archivo: "la-persona-de-mi-vida.mp3" },
    { titulo: "Siempre Seré", artista: "Tito Rojas / Giro", archivo: "siempre-sere.mp3" }
];

let indiceCancionActual = 0;
let reproduciendo = false;
const audio = document.getElementById('musicaFondo');

function cargarCancion(indice) {
    const pista = playlist[indice];
    audio.src = pista.archivo;
    
    document.querySelectorAll('.item-cancion').forEach((item, i) => {
        if (i === indice) {
            item.classList.add('sonando');
        } else {
            item.classList.remove('sonando');
        }
    });
}

function reproducirEspecifica(indice) {
    if (indiceCancionActual === indice && reproduciendo) {
        audio.pause();
        reproduciendo = false;
        document.querySelectorAll('.item-cancion')[indice].classList.remove('sonando');
        return;
    }

    indiceCancionActual = indice;
    cargarCancion(indiceCancionActual);
    audio.play().then(() => {
        reproduciendo = true;
    }).catch(err => {
        console.log("Error al reproducir audio:", err);
    });
}

audio.addEventListener('ended', () => {
    indiceCancionActual = (indiceCancionActual + 1) % playlist.length;
    reproducirEspecifica(indiceCancionActual);
});

/* =====================================================
   NAVEGACIÓN ENTRE PANTALLAS
====================================================== */
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

/* =====================================================
   ABRIR SOBRE CERRADO
====================================================== */
function abrirCarta() {
    const contenedor = document.getElementById("contenedorSobre");
    const carta = document.getElementById("cartaEscribir");

    if (contenedor && carta) {
        contenedor.classList.add("abierto");
        setTimeout(() => {
            carta.classList.remove("oculta");
            carta.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

/* =====================================================
   CONTADOR DE TIEMPO REAL (8 DE JULIO DE 2026, 7:25 PM)
====================================================== */
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

/* =====================================================
   ANIMACIÓN DE CORAZONES FLOTANTES
====================================================== */
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
