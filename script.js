// CONTROL DE NAVEGACIÓN (1 a 8)
let pantallaActual = 1;

function mostrarPantalla(numero) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    const pantalla = document.getElementById("pantalla" + numero);
    if (pantalla) {
        pantalla.classList.add("activa");
        pantallaActual = numero;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// CARTA DE AMOR
function toggleCarta() {
    const sobre = document.getElementById("contenedorSobre");
    const papel = document.getElementById("papelCarta");
    if (sobre) sobre.classList.toggle("abierto");
    if (papel) papel.classList.toggle("visible");
}

// DETECTOR AUTOMÁTICO DE FORMATO DE IMÁGENES
function cargarImagenRobusta(idElemento, nombreBase) {
    const extensiones = ['jpeg', 'jpg', 'jfif', 'png', 'JPEG', 'JPG', 'PNG', 'pge', 'pgeg'];
    const carpetas = ['imagenes/', ''];
    let intentos = [];

    carpetas.forEach(c => {
        extensiones.forEach(ext => {
            intentos.push(`${c}${nombreBase}.${ext}`);
        });
    });

    const img = document.getElementById(idElemento);
    if (!img) return;

    let index = 0;
    function probarSiguiente() {
        if (index < intentos.length) {
            img.src = intentos[index];
            index++;
        }
    }

    img.onerror = probarSiguiente;
    probarSiguiente();
}

// Cargar foto1 y foto2 automáticamente al iniciar
document.addEventListener("DOMContentLoaded", () => {
    cargarImagenRobusta("imgFoto1", "foto1");
    cargarImagenRobusta("imgFoto2", "foto2");
});

// REPRODUCTOR DE MÚSICA ROBUSTO
const listaCanciones = [
    { titulo: "Morat - A Dónde Vamos", base: "cancion1" },
    { titulo: "Silvestre Dangond - Cesantías de Amor", base: "cancion2" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", base: "cancion3" },
    { titulo: "Tito Rojas - Siempre Seré", base: "cancion4" }
];

let indiceCancion = 0;
const audioGlobal = document.getElementById("audioGlobal");
const tituloCancion = document.getElementById("tituloCancion");
const btnPlayPause = document.getElementById("btnPlayPause");

function resolverRutaAudio(nombreBase, callback) {
    const extensiones = ['mp3', 'MP3', 'wav', 'm4a', 'aac'];
    const carpetas = ['musica/', ''];
    let rutas = [];

    carpetas.forEach(c => {
        extensiones.forEach(ext => {
            rutas.push(`${c}${nombreBase}.${ext}`);
        });
    });

    let index = 0;
    function probarAudio() {
        if (index >= rutas.length) return;
        const tempAudio = new Audio();
        tempAudio.src = rutas[index];
        tempAudio.oncanplaythrough = () => callback(rutas[index]);
        tempAudio.onerror = () => {
            index++;
            probarAudio();
        };
    }
    probarAudio();
}

function cargarCancion(indice) {
    indiceCancion = indice;
    const cancion = listaCanciones[indice];
    if (tituloCancion) tituloCancion.textContent = cancion.titulo;

    resolverRutaAudio(cancion.base, (rutaCorrecta) => {
        if (audioGlobal) {
            audioGlobal.src = rutaCorrecta;
            audioGlobal.play().then(() => {
                if (btnPlayPause) btnPlayPause.textContent = "⏸️";
            }).catch(() => {
                if (btnPlayPause) btnPlayPause.textContent = "▶️";
            });
        }
    });
}

function togglePlayPause() {
    if (!audioGlobal) return;
    if (!audioGlobal.src) {
        cargarCancion(0);
        return;
    }
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
}

function cancionAnterior() {
    indiceCancion = (indiceCancion - 1 + listaCanciones.length) % listaCanciones.length;
    cargarCancion(indiceCancion);
}

function seleccionarCancion(indice) {
    cargarCancion(indice);
}

// CONTADOR DESDE EL 8 JULIO 2026 7:25 PM
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

// REVELAR NOTAS SECRETAS
function revelarNota(card) {
    card.classList.toggle("revelada");
}

// VISOR LIGHTBOX
function abrirVisor(card) {
    const img = card.querySelector("img");
    const info = card.querySelector(".foto-info p");
    const lightbox = document.getElementById("lightbox");
    const imgLightbox = document.getElementById("imgLightbox");
    const txtLightbox = document.getElementById("textoLightbox");

    if (lightbox && imgLightbox && img) {
        imgLightbox.src = img.src;
        if (txtLightbox && info) txtLightbox.textContent = info.textContent;
        lightbox.style.display = "flex";
    }
}

function cerrarVisor() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
}

// ESQUIVAR BOTÓN NO
function esquivarBoton() {
    const btnNo = document.getElementById("btnNo");
    if (!btnNo) return;
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btnNo.style.position = "fixed";
    btnNo.style.left = `${Math.max(10, x)}px`;
    btnNo.style.top = `${Math.max(10, y)}px`;
}

// CELEBRACIÓN SÍ
function aceptarPropuesta() {
    const mensaje = document.getElementById("mensajeFinalCelebracion");
    if (mensaje) mensaje.style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
}
