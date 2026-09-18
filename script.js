// NAVEGACIÓN ENTRE PANTALLAS
function irAPantalla(num) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    const objetivo = document.getElementById("pantalla" + num);
    if (objetivo) {
        objetivo.classList.add("activa");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// CARTA MODAL EN PANTALLA COMPLETA
function abrirModalCarta() {
    const modal = document.getElementById("modalCarta");
    if (modal) modal.classList.add("activo");
}

function cerrarModalCarta() {
    const modal = document.getElementById("modalCarta");
    if (modal) modal.classList.remove("activo");
}

// VOLTEAR TARJETAS 3D
function voltearTarjeta(card) {
    card.classList.toggle("volteada");
}

// CARGA ROBUSTA DE IMÁGENES (.jpeg, .jpg, .png, etc.)
function asegurarCargaImagen(idElem, nombreBase) {
    const exts = ['jpeg', 'jpg', 'png', 'pgeg', 'pge', 'JPG', 'JPEG', 'PNG'];
    const carpetas = ['imagenes/', ''];
    let intentos = [];

    carpetas.forEach(c => {
        exts.forEach(ext => intentos.push(`${c}${nombreBase}.${ext}`));
    });

    const img = document.getElementById(idElem);
    if (!img) return;

    let i = 0;
    function probarNext() {
        if (i < intentos.length) {
            img.src = intentos[i];
            i++;
        }
    }
    img.onerror = probarNext;
    probarNext();
}

document.addEventListener("DOMContentLoaded", () => {
    asegurarCargaImagen("foto1", "foto1");
    asegurarCargaImagen("foto2", "foto2");
});

// REPRODUCTOR DE MÚSICA CON DIOMEDES DÍAZ
const canciones = [
    { titulo: "Morat - A Dónde Vamos", base: "cancion1" },
    { titulo: "Diomedes Díaz - Cesantías de Amor", base: "cancion2" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", base: "cancion3" },
    { titulo: "Tito Rojas - Siempre Seré", base: "cancion4" }
];

let indiceActual = 0;
const audio = document.getElementById("audioPlayer");
const titulo = document.getElementById("tituloCancion");
const btnPlay = document.getElementById("btnPlay");

function resolverRutaMusica(nombreBase, callback) {
    const exts = ['mp3', 'MP3', 'wav', 'm4a'];
    const carpetas = ['musica/', ''];
    let rutas = [];

    carpetas.forEach(c => {
        exts.forEach(ext => rutas.push(`${c}${nombreBase}.${ext}`));
    });

    let i = 0;
    function probarRuta() {
        if (i >= rutas.length) return;
        const tempAudio = new Audio();
        tempAudio.src = rutas[i];
        tempAudio.oncanplaythrough = () => callback(rutas[i]);
        tempAudio.onerror = () => { i++; probarRuta(); };
    }
    probarRuta();
}

function cargarCancion(idx) {
    indiceActual = idx;
    if (titulo) titulo.textContent = canciones[idx].titulo;

    resolverRutaMusica(canciones[idx].base, (rutaCorrecta) => {
        if (audio) {
            audio.src = rutaCorrecta;
            audio.play().then(() => {
                if (btnPlay) btnPlay.textContent = "⏸️";
            }).catch(() => {
                if (btnPlay) btnPlay.textContent = "▶️";
            });
        }
    });
}

function toggleAudio() {
    if (!audio) return;
    if (!audio.src) {
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

// CRONÓMETRO DE TIEMPO JUNTOS
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);

function actualizarContador() {
    const ahora = new Date();
    const dif = ahora - fechaInicio;
    if (dif < 0) return;

    const seg = Math.floor(dif / 1000);
    const min = Math.floor(seg / 60);
    const hrs = Math.floor(min / 60);
    const diasTotales = Math.floor(hrs / 24);

    if (document.getElementById("meses")) document.getElementById("meses").textContent = Math.floor(diasTotales / 30);
    if (document.getElementById("dias")) document.getElementById("dias").textContent = diasTotales % 30;
    if (document.getElementById("horas")) document.getElementById("horas").textContent = hrs % 24;
    if (document.getElementById("minutos")) document.getElementById("minutos").textContent = min % 60;
    if (document.getElementById("segundos")) document.getElementById("segundos").textContent = seg % 60;
}
setInterval(actualizarContador, 1000);

// BOTÓN ESCURRIDIZO QUE JUEGA DENTRO DE LA PANTALLA
function moverBotonNo() {
    const btnNo = document.getElementById("btnNo");
    const contenedor = document.getElementById("areaJuego");
    if (!btnNo || !contenedor) return;

    const rect = contenedor.getBoundingClientRect();
    const maxX = rect.width - btnNo.offsetWidth - 20;
    const maxY = rect.height - btnNo.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = (Math.random() - 0.5) * 40;

    btnNo.style.position = "relative";
    btnNo.style.left = `${randomX - (rect.width / 4)}px`;
    btnNo.style.top = `${randomY}px`;
}

// CELEBRACIÓN DE ACEPTACIÓN
function celebrarAceptacion() {
    const mensaje = document.getElementById("mensajeCelebracion");
    if (mensaje) mensaje.style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
}
