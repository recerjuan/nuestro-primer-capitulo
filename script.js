// NAVEGACIÓN FLUIDA ENTRE PANTALLAS (1 a 8)
function irAPantalla(num) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    const objetivo = document.getElementById("pantalla" + num);
    if (objetivo) {
        objetivo.classList.add("activa");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// CARTA DE AMOR INTERACTIVA
function toggleCarta() {
    const sobre = document.getElementById("sobre3d");
    if (sobre) sobre.classList.toggle("abierto");
}

// VOLTEAR TARJETAS 3D (RAZONES DE MI AMOR)
function voltearTarjeta(card) {
    card.classList.toggle("volteada");
}

// SISTEMA ROBUSTO MULTI-FORMATO PARA IMÁGENES (.jpeg, .jpg, .pgeg, .pge)
function asegurarCargaImagen(idElem, nombreBase) {
    const extensiones = ['jpeg', 'jpg', 'pgeg', 'pge', 'jfif', 'png', 'PNG', 'JPG', 'JPEG'];
    const carpetas = ['imagenes/', ''];
    let intentos = [];

    carpetas.forEach(c => {
        extensiones.forEach(ext => {
            intentos.push(`${c}${nombreBase}.${ext}`);
        });
    });

    const img = document.getElementById(idElem);
    if (!img) return;

    let idx = 0;
    function probar() {
        if (idx < intentos.length) {
            img.src = intentos[idx];
            idx++;
        }
    }

    img.onerror = probar;
    probar();
}

// CARGAR IMÁGENES AL INICIAR
document.addEventListener("DOMContentLoaded", () => {
    asegurarCargaImagen("foto1", "foto1");
    asegurarCargaImagen("foto2", "foto2");
});

// REPRODUCTOR DE MÚSICA GARANTIZADO
const canciones = [
    { titulo: "Morat - A Dónde Vamos", base: "cancion1" },
    { titulo: "Silvestre Dangond - Cesantías de Amor", base: "cancion2" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", base: "cancion3" },
    { titulo: "Tito Rojas - Siempre Seré", base: "cancion4" }
];

let indiceActual = 0;
const audio = document.getElementById("audioPlayer");
const titulo = document.getElementById("tituloCancion");
const btnPlay = document.getElementById("btnPlay");

function resolverRutaMusica(nombreBase, callback) {
    const exts = ['mp3', 'MP3', 'wav', 'm4a', 'aac'];
    const carpetas = ['musica/', ''];
    let rutas = [];

    carpetas.forEach(c => {
        exts.forEach(ext => rutas.push(`${c}${nombreBase}.${ext}`));
    });

    let i = 0;
    function probar() {
        if (i >= rutas.length) return;
        const a = new Audio();
        a.src = rutas[i];
        a.oncanplaythrough = () => callback(rutas[i]);
        a.onerror = () => { i++; probar(); };
    }
    probar();
}

function cargarCancion(idx) {
    indiceActual = idx;
    if (titulo) titulo.textContent = canciones[idx].titulo;

    resolverRutaMusica(canciones[idx].base, (ruta) => {
        if (audio) {
            audio.src = ruta;
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

// ESQUIVAR BOTÓN NO EN PREGUNTA FINAL
function esquivarBotonNo() {
    const btnNo = document.getElementById("btnNo");
    if (!btnNo) return;
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btnNo.style.position = "fixed";
    btnNo.style.left = `${Math.max(10, x)}px`;
    btnNo.style.top = `${Math.max(10, y)}px`;
}

// CELEBRACIÓN AL PRESIONAR SÍ
function celebrarAceptacion() {
    const mensaje = document.getElementById("mensajeCelebracion");
    if (mensaje) mensaje.style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
    }
}
