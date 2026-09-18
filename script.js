let pantallaActual = 1;
const totalPantallas = 6;

/* ========================================= CAMBIAR DE PANTALLA ========================================= */
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

/* ========================================= REPRODUCTOR DE MÚSICA ========================================= */
const canciones = [
    { titulo: "Morat - A Dónde Vamos", src: "musica/cancion1.mp3" },
    { titulo: "Jorge Oñate - Cesantías de Amor", src: "musica/cancion2.mp3" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", src: "musica/cancion3.mp3" }
];

let indiceCancion = 0;
const audioPlayer = document.getElementById("audioPlayer");
const tituloCancion = document.getElementById("tituloCancion");
const btnPlay = document.getElementById("btnPlay");

function cargarCancion(index) {
    if (index < 0) index = canciones.length - 1;
    if (index >= canciones.length) index = 0;
    indiceCancion = index;
    
    audioPlayer.src = canciones[indiceCancion].src;
    tituloCancion.textContent = canciones[indiceCancion].titulo;
}

function togglePlay() {
    if (!audioPlayer.src) {
        cargarCancion(0);
    }
    
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlay.textContent = "⏸️";
    } else {
        audioPlayer.pause();
        btnPlay.textContent = "▶️";
    }
}

function cambiarCancion(direccion) {
    cargarCancion(indiceCancion + direccion);
    audioPlayer.play();
    btnPlay.textContent = "⏸️";
}

function seleccionarCancion(index) {
    cargarCancion(index);
    audioPlayer.play();
    btnPlay.textContent = "⏸️";
}

/* ========================================= CONTADOR DE TIEMPO ========================================= */
function actualizarContador() {
    // Fecha inicial: 8 de Julio de 2026, 7:25 PM
    const inicio = new Date(2026, 6, 8, 19, 25, 0);
    const ahora = new Date();

    let diferencia = ahora.getTime() - inicio.getTime();
    if (diferencia < 0) diferencia = 0;

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;
    const mes = dia * 30.4375;

    const meses = Math.floor(diferencia / mes);
    const dias = Math.floor((diferencia % mes) / dia);
    const horas = Math.floor((diferencia % dia) / hora);
    const minutos = Math.floor((diferencia % hora) / minuto);
    const segundos = Math.floor((diferencia % minuto) / segundo);

    document.getElementById("meses").textContent = meses;
    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

/* ========================================= VISOR DE FOTOS ========================================= */
function abrirVisor(src) {
    const modal = document.getElementById("visorModal");
    const imgModal = document.getElementById("imagenModal");
    modal.style.display = "flex";
    imgModal.src = src;
}

function cerrarVisor() {
    document.getElementById("visorModal").style.display = "none";
}

/* ========================================= CORAZONES ANIMADOS ========================================= */
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

    setTimeout(function () {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 400);

/* ========================================= NAVEGACIÓN TECLADO ========================================= */
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") siguientePantalla();
    if (e.key === "ArrowLeft") anteriorPantalla();
});
