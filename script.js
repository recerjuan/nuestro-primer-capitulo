// CONTROL DE NAVEGACIÓN ENTRE PANTALLAS
let pantallaActual = 1;
const totalPantallas = 8;

function mostrarPantalla(numero) {
    if (numero < 1 || numero > totalPantallas) return;

    document.querySelectorAll(".pantalla").forEach(p => {
        p.classList.remove("activa");
    });

    const nuevaPantalla = document.getElementById("pantalla" + numero);
    if (nuevaPantalla) {
        nuevaPantalla.classList.add("activa");
        pantallaActual = numero;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// CARTA DE AMOR (PANTALLA 2)
function abrirCarta() {
    const sobre = document.getElementById("contenedorSobre");
    if (sobre) {
        sobre.classList.toggle("abierto");
    }
}

// REPRODUCTOR GLOBAL DE MÚSICA
const listaCanciones = [
    { titulo: "Morat - A Dónde Vamos", src: "musica/cancion1.mp3" },
    { titulo: "Silvestre Dangond - Cesantías de Amor", src: "musica/cancion2.mp3" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", src: "musica/cancion3.mp3" },
    { titulo: "Tito Rojas - Siempre Seré", src: "musica/cancion4.mp3" }
];

let indiceCancion = 0;
const audioGlobal = document.getElementById("audioGlobal");
const tituloCancion = document.getElementById("tituloCancion");
const btnPlayPause = document.getElementById("btnPlayPause");

function cargarCancion(indice) {
    indiceCancion = indice;
    if (audioGlobal && tituloCancion) {
        audioGlobal.src = listaCanciones[indice].src;
        tituloCancion.textContent = listaCanciones[indice].titulo;
    }
}

function togglePlayPause() {
    if (!audioGlobal) return;
    if (audioGlobal.paused) {
        audioGlobal.play();
        if (btnPlayPause) btnPlayPause.textContent = "⏸️";
    } else {
        audioGlobal.pause();
        if (btnPlayPause) btnPlayPause.textContent = "▶️";
    }
}

function siguienteCancion() {
    indiceCancion = (indiceCancion + 1) % listaCanciones.length;
    cargarCancion(indiceCancion);
    if (audioGlobal) audioGlobal.play();
    if (btnPlayPause) btnPlayPause.textContent = "⏸️";
}

function cancionAnterior() {
    indiceCancion = (indiceCancion - 1 + listaCanciones.length) % listaCanciones.length;
    cargarCancion(indiceCancion);
    if (audioGlobal) audioGlobal.play();
    if (btnPlayPause) btnPlayPause.textContent = "⏸️";
}

function seleccionarCancion(indice) {
    cargarCancion(indice);
    if (audioGlobal) audioGlobal.play();
    if (btnPlayPause) btnPlayPause.textContent = "⏸️";
}

// CONTADOR DESDE 8 JULIO 2026 7:25 PM
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia < 0) return;

    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);

    const meses = Math.floor(diasTotales / 30);
    const dias = diasTotales % 30;
    const horas = horasTotales % 24;
    const minutos = minutosTotales % 60;
    const segundos = segundosTotales % 60;

    if (document.getElementById("meses")) document.getElementById("meses").textContent = meses;
    if (document.getElementById("dias")) document.getElementById("dias").textContent = dias;
    if (document.getElementById("horas")) document.getElementById("horas").textContent = horas;
    if (document.getElementById("minutos")) document.getElementById("minutos").textContent = minutos;
    if (document.getElementById("segundos")) document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarContador, 1000);

// PANTALLA 4: TOGGLE VIVENCIAS
function toggleVivencia(elemento) {
    elemento.classList.toggle("activa");
}

// PANTALLA 6: VOLTEAR TARJETAS 3D
function voltearTarjeta(tarjeta) {
    tarjeta.classList.toggle("volteada");
}

// PANTALLA 7: LIGHTBOX FOTOS
function abrirLightbox(src, texto) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("imgLightbox");
    const txt = document.getElementById("textoLightbox");
    if (lightbox && img && txt) {
        img.src = src;
        txt.textContent = texto;
        lightbox.style.display = "flex";
    }
}

function cerrarLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
}

// PANTALLA 8: ESQUIVAR BOTÓN NO
function esquivarBoton() {
    const btnNo = document.getElementById("btnNo");
    if (!btnNo) return;

    const x = Math.random() * (window.innerWidth - 90);
    const y = Math.random() * (window.innerHeight - 40);

    btnNo.style.position = "fixed";
    btnNo.style.left = `${Math.max(10, x)}px`;
    btnNo.style.top = `${Math.max(10, y)}px`;
}

// PANTALLA 8: CELEBRACIÓN SÍ
function aceptarPropuesta() {
    const mensaje = document.getElementById("mensajeFinalCelebracion");
    if (mensaje) mensaje.style.display = "block";

    if (typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
