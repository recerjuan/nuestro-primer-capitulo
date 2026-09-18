// NAVEGACIÓN DE PANTALLAS
function irAPantalla(num) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    const destino = document.getElementById("pantalla" + num);
    if (destino) {
        destino.classList.add("activa");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// MODAL CARTA
function abrirModalCarta() {
    const modal = document.getElementById("modalCarta");
    if (modal) modal.classList.add("activo");
}

function cerrarModalCarta() {
    const modal = document.getElementById("modalCarta");
    if (modal) modal.classList.remove("activo");
}

// TARJETAS 3D
function voltearTarjeta(card) {
    card.classList.toggle("volteada");
}

// CARGA DE IMÁGENES CON PRUEBAS DE EXTENSIÓN
function probarCargaImagen(idElem, nombreBase) {
    const img = document.getElementById(idElem);
    if (!img) return;

    const listaRutas = [
        `imagenes/${nombreBase}.jpeg`,
        `imagenes/${nombreBase}.jpg`,
        `imagenes/${nombreBase}.png`,
        `${nombreBase}.jpeg`,
        `${nombreBase}.jpg`,
        `${nombreBase}.png`
    ];

    let i = 0;
    function intentar() {
        if (i < listaRutas.length) {
            img.src = listaRutas[i];
            i++;
        }
    }
    img.onerror = intentar;
    intentar();
}

document.addEventListener("DOMContentLoaded", () => {
    probarCargaImagen("foto1", "foto1");
    probarCargaImagen("foto2", "foto2");
    actualizarContador();
});

// REPRODUCTOR DE MÚSICA CON RUTA DIRECTA
const canciones = [
    { titulo: "Morat - A Dónde Vamos", archivo: "cancion1.mp3" },
    { titulo: "Diomedes Díaz - Cesantías de Amor", archivo: "cancion2.mp3" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", archivo: "cancion3.mp3" },
    { titulo: "Tito Rojas - Siempre Seré", archivo: "cancion4.mp3" }
];

let indiceActual = 0;
const audio = document.getElementById("audioPlayer");
const titulo = document.getElementById("tituloCancion");
const btnPlay = document.getElementById("btnPlay");

function cargarCancion(idx) {
    indiceActual = idx;
    if (titulo) titulo.textContent = canciones[idx].titulo;
    
    // Probar primero dentro de la carpeta 'musica/' y luego en la raíz
    const rutaMusica = `musica/${canciones[idx].archivo}`;
    if (audio) {
        audio.src = rutaMusica;
        audio.play().then(() => {
            if (btnPlay) btnPlay.textContent = "⏸️";
        }).catch(() => {
            // Intentar cargar en la raíz si la carpeta falla
            audio.src = canciones[idx].archivo;
            if (btnPlay) btnPlay.textContent = "▶️";
        });
    }
}

function toggleAudio() {
    if (!audio) return;
    if (!audio.src || audio.src === "") {
        cargarCancion(0);
        return;
    }
    if (audio.paused) {
        audio.play();
        if (btnPlay) btnPlay.textContent = "⏸️";
    } else {
        audio.pause();
        if (btnPlay) btnPlay.textContent = "▶️";
    }
}

function cambiarCancion(dir) {
    indiceActual = (indiceActual + dir + canciones.length) % canciones.length;
    cargarCancion(indiceActual);
}

function reproducirIndice(idx) {
    cargarCancion(idx);
}

// CRONÓMETRO CORREGIDO (FECHA DE INICIO FIX)
// Se fija en Julio 8 del año en curso / pasado para asegurar valores positivos
const fechaInicio = new Date('2024-07-08T19:25:00');

function actualizarContador() {
    const ahora = new Date();
    let dif = ahora - fechaInicio;

    if (isNaN(dif) || dif < 0) dif = 0;

    const seg = Math.floor(dif / 1000);
    const min = Math.floor(seg / 60);
    const hrs = Math.floor(min / 60);
    const diasTotales = Math.floor(hrs / 24);

    const meses = Math.floor(diasTotales / 30);
    const dias = diasTotales % 30;
    const horas = hrs % 24;
    const minutos = min % 60;
    const segundos = seg % 60;

    if (document.getElementById("meses")) document.getElementById("meses").textContent = meses;
    if (document.getElementById("dias")) document.getElementById("dias").textContent = dias;
    if (document.getElementById("horas")) document.getElementById("horas").textContent = horas;
    if (document.getElementById("minutos")) document.getElementById("minutos").textContent = minutos;
    if (document.getElementById("segundos")) document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarContador, 1000);

// BOTÓN ESCURRIDIZO DENTRO DE LOS LÍMITES VISIBLES
function moverBotonNo() {
    const btnNo = document.getElementById("btnNo");
    const area = document.getElementById("areaJuego");
    if (!btnNo || !area) return;

    const areaRect = area.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = areaRect.width - btnRect.width - 15;
    const maxY = areaRect.height - btnRect.height - 10;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    btnNo.style.position = "absolute";
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

// CELEBRACIÓN
function celebrarAceptacion() {
    const mensaje = document.getElementById("mensajeCelebracion");
    if (mensaje) mensaje.style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
}
