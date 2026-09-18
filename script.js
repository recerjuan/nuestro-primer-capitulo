/* =====================================================
   PLAYLIST Y CONTROL DE AUDIO
====================================================== */
const playlist = [
    { titulo: "A Dónde Vamos", artista: "Morat", archivo: "a-donde-vamos.mp3" },
    { titulo: "Cesantías de Amor", artista: "Música Colombiana", archivo: "cesantias-de-amor.mp3" },
    { titulo: "La Persona de Mi Vida", artista: "Iván Villazón", archivo: "la-persona-de-mi-vida.mp3" },
    { titulo: "Siempre Seré", artista: "Tito Rojas / Giro", archivo: "siempre-sere.mp3" }
];

let indiceCancionActual = 0;
let reproduciendo = false;
const audio = document.getElementById('musicaFondo');

function cargarCancion(indice) {
    const pista = playlist[indice];
    audio.src = pista.archivo;
    document.getElementById('tituloCancion').innerText = pista.titulo;
    document.getElementById('artistaCancion').innerText = pista.artista;
    
    document.querySelectorAll('.item-cancion').forEach((item, i) => {
        if (i === indice) {
            item.classList.add('sonando');
        } else {
            item.classList.remove('sonando');
        }
    });
}

function toggleMusica() {
    if (!audio.src || audio.src === "") {
        cargarCancion(0);
    }
    
    if (reproduciendo) {
        audio.pause();
        reproduciendo = false;
        document.getElementById('btnPlayPause').innerText = '▶️ Reproducir';
    } else {
        audio.play().then(() => {
            reproduciendo = true;
            document.getElementById('btnPlayPause').innerText = '⏸️ Pausa';
        }).catch(err => {
            console.log("Se requiere interacción para iniciar audio", err);
        });
    }
}

function reproducirEspecifica(indice) {
    indiceCancionActual = indice;
    cargarCancion(indiceCancionActual);
    audio.play().then(() => {
        reproduciendo = true;
        document.getElementById('btnPlayPause').innerText = '⏸️ Pausa';
    });
}

function siguienteCancion() {
    indiceCancionActual = (indiceCancionActual + 1) % playlist.length;
    reproducirEspecifica(indiceCancionActual);
}

function cancionAnterior() {
    indiceCancionActual = (indiceCancionActual - 1 + playlist.length) % playlist.length;
    reproducirEspecifica(indiceCancionActual);
}

audio.addEventListener('ended', () => { siguienteCancion(); });

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
        }, 400);
    }
}

function revelarNota(elemento) {
    elemento.classList.toggle('revelada');
}

/* =====================================================
   CONTADOR DE TIEMPO
====================================================== */
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0); // 8 de Julio de 2026

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

    document.getElementById('dias').innerText = diasTotales;
    document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
    document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
}

/* =====================================================
   ANIMACIÓN DE CORAZONES
====================================================== */
function crearCorazones() {
    const contenedor = document.getElementById('heartsContainer');
    const simbolos = ['♥️', '✨', '🌹'];
    
    for (let i = 0; i < 22; i++) {
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
    cargarCancion(0);
    crearCorazones();
    actualizarContador();
    setInterval(actualizarContador, 1000);
};
