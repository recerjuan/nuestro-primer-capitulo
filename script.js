let pantallaActual = 1;
const totalPantallas = 6;

function mostrarPantalla(numero) {
    if (numero < 1 || numero > totalPantallas) return;

    document.querySelectorAll(".pantalla").forEach(function (p) {
        p.classList.remove("activa");
    });

    const nuevaPantalla = document.getElementById("pantalla" + numero);
    if (nuevaPantalla) {
        nuevaPantalla.classList.add("activa");
        pantallaActual = numero;
    }
}

function siguientePantalla() {
    if (pantallaActual < totalPantallas) {
        mostrarPantalla(pantallaActual + 1);
    }
}

function anteriorPantalla() {
    if (pantallaActual > 1) {
        mostrarPantalla(pantallaActual - 1);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowRight") siguientePantalla();
    if (e.key === "ArrowLeft") anteriorPantalla();
});

// ABRIR CARTA INTERACTIVA
function abrirCarta() {
    const wrapper = document.getElementById('envelopeWrapper');
    const carta = document.getElementById('cartaDesplegada');

    if (wrapper) wrapper.style.display = 'none';
    if (carta) carta.classList.add('abierta');
}

// SISTEMA DE MÚSICA (EXCLUSIVO PANTALLA 6)
const listaCanciones = [
    { titulo: "A Dónde Vamos - Morat", archivo: "a-donde-vamos.mp3" },
    { titulo: "Cesantías de Amor", archivo: "cesantias-de-amor.mp3" },
    { titulo: "La Persona de Mi Vida - Iván Villazón", archivo: "la-persona-de-mi-vida.mp3" },
    { titulo: "Siempre Seré - Tito Rojas", archivo: "siempre-sere.mp3" }
];

let indiceCancionActual = 0;
let reproduciendo = false;
const audio = document.getElementById('musicaFondo');

function cargarCancion(indice) {
    if (!audio) return;
    audio.src = listaCanciones[indice].archivo;
    const label = document.getElementById('tituloCancionActual');
    if (label) label.innerText = listaCanciones[indice].titulo;
}

function toggleMusica() {
    if (!audio) return;

    if (!audio.src || audio.src === "" || audio.src.endsWith("#")) {
        cargarCancion(0);
    }

    const btn = document.getElementById('btnPlayPause');

    if (reproduciendo) {
        audio.pause();
        if (btn) btn.innerText = "▶️ Reproducir";
    } else {
        audio.play().then(() => {
            if (btn) btn.innerText = "⏸️ Pausar";
        }).catch(err => {
            console.log("Error de reproducción: ", err);
        });
    }
    reproduciendo = !reproduciendo;
}

function reproducirEspecifica(indice) {
    indiceCancionActual = indice;
    cargarCancion(indiceCancionActual);
    reproduciendo = false;
    toggleMusica();
}

function siguienteCancion() {
    indiceCancionActual = (indiceCancionActual + 1) % listaCanciones.length;
    cargarCancion(indiceCancionActual);
    if (reproduciendo) audio.play();
}

function cancionAnterior() {
    indiceCancionActual = (indiceCancionActual - 1 + listaCanciones.length) % listaCanciones.length;
    cargarCancion(indiceCancionActual);
    if (reproduciendo) audio.play();
}

// CONTADOR DE TIEMPO REAL
function actualizarContador() {
    const inicio = new Date(2026, 6, 8, 19, 25, 0); 
    const ahora = new Date();

    let diferencia = ahora.getTime() - inicio.getTime();
    if (diferencia < 0) diferencia = 0;

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;
    const mesPromedio = dia * 30.4375;

    const meses = Math.floor(diferencia / mesPromedio);
    const dias = Math.floor((diferencia % mesPromedio) / dia);
    const horas = Math.floor((diferencia % dia) / hora);
    const minutos = Math.floor((diferencia % hora) / minuto);
    const segundos = Math.floor((diferencia % minuto) / segundo);

    if (document.getElementById("meses")) document.getElementById("meses").textContent = meses;
    if (document.getElementById("dias")) document.getElementById("dias").textContent = dias;
    if (document.getElementById("horas")) document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    if (document.getElementById("minutos")) document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    if (document.getElementById("segundos")) document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

// NOTAS SECRETAS
function revelarNota(elemento) {
    const frente = elemento.querySelector('.nota-frente');
    const atras = elemento.querySelector('.nota-atras');

    if (atras.style.display === 'block') {
        atras.style.display = 'none';
        frente.style.display = 'block';
        elemento.classList.remove('revelada');
    } else {
        frente.style.display = 'none';
        atras.style.display = 'block';
        elemento.classList.add('revelada');
    }
}

// CORAZONES DE FONDO
function crearCorazon() {
    const contenedor = document.querySelector(".hearts");
    if (!contenedor) return;

    const corazon = document.createElement("div");
    corazon.className = "heart";
    corazon.textContent = Math.random() > 0.5 ? "♥" : "♡";

    const posicion = Math.random() * 100;
    const tamaño = 12 + Math.random() * 16;
    const duracion = 6 + Math.random() * 6;

    corazon.style.left = posicion + "%";
    corazon.style.fontSize = tamaño + "px";
    corazon.style.animationDuration = duracion + "s";

    contenedor.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 450);
