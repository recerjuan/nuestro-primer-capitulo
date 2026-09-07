let pantallaActual = 1;
const totalPantallas = 4;

/* NAVEGACIÓN DE PANTALLAS */
function mostrarPantalla(numero) {
    if (numero < 1 || numero > totalPantallas) return;

    document.querySelectorAll(".pantalla").forEach(function (pantalla) {
        pantalla.classList.remove("activa");
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

/* MÚSICA */
let reproduciendo = false;
const audio = document.getElementById('musicaFondo');

function toggleMusica() {
    if (!audio) return;

    if (reproduciendo) {
        audio.pause();
        document.getElementById('textoMusica').innerText = "Reproducir Música";
        document.getElementById('iconoMusica').innerText = "🎵";
    } else {
        audio.play().then(() => {
            document.getElementById('textoMusica').innerText = "Pausar Música";
            document.getElementById('iconoMusica').innerText = "🎶";
        }).catch(err => {
            console.log("Error al reproducir audio: ", err);
            alert("Asegúrate de que el archivo de música se llame exactamente 'a-donde-vamos.mp3'.");
        });
    }
    reproduciendo = !reproduciendo;
}

/* CONTADOR */
function actualizarContador() {
    const inicio = new Date(2026, 6, 8, 19, 25, 0);
    const ahora = new Date();

    let diferencia = ahora.getTime() - inicio.getTime();
    if (diferencia < 0) diferencia = 0;

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;

    const dias = Math.floor(diferencia / dia);
    const horas = Math.floor((diferencia % dia) / hora);
    const minutos = Math.floor((diferencia % hora) / minuto);
    const segundos = Math.floor((diferencia % minuto) / segundo);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

/* VISOR DE FOTOS (MODAL) */
function abrirModal(src, texto) {
    const modal = document.getElementById("modalFoto");
    const imgModal = document.getElementById("imagenModal");
    const caption = document.getElementById("captionModal");

    modal.style.display = "flex";
    imgModal.src = src;
    caption.innerText = texto;
}

function cerrarModal() {
    document.getElementById("modalFoto").style.display = "none";
}

/* CORAZONES FLOTANTES */
function crearCorazon() {
    const contenedor = document.querySelector(".hearts");
    if (!contenedor) return;

    const corazon = document.createElement("div");
    corazon.className = "heart";
    corazon.textContent = Math.random() > 0.5 ? "♥" : "♡";

    const posicion = Math.random() * 100;
    const tamaño = 10 + Math.random() * 18;
    const duracion = 6 + Math.random() * 7;

    corazon.style.left = posicion + "%";
    corazon.style.fontSize = tamaño + "px";
    corazon.style.animationDuration = duracion + "s";

    contenedor.appendChild(corazon);

    setTimeout(() => { corazon.remove(); }, duracion * 1000);
}

setInterval(crearCorazon, 400);
