// CONTROL DE NAV
function irAPantalla(num) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    const objetivo = document.getElementById("pantalla" + num);
    if (objetivo) objetivo.classList.add("activa");
}

// CARTA INTERACTIVA
function abrirSobre() {
    const sobre = document.getElementById("sobre");
    if (sobre) sobre.classList.toggle("abierto");
}

// VOLTEAR CARDS 3D
function voltearCard(card) {
    card.classList.toggle("flipped");
}

// SISTEMA DE AUDIO
const canciones = [
    { titulo: "Morat - A Dónde Vamos", src: "musica/cancion1.mp3" },
    { titulo: "Silvestre Dangond - Cesantías de Amor", src: "musica/cancion2.mp3" },
    { titulo: "Iván Villazón - La Persona de Mi Vida", src: "musica/cancion3.mp3" },
    { titulo: "Tito Rojas - Siempre Seré", src: "musica/cancion4.mp3" }
];

let indiceActual = 0;
const audio = document.getElementById("audioPlayer");
const titulo = document.getElementById("tituloCancion");
const btnPlay = document.getElementById("btnPlay");

function cargarCancion(idx) {
    indiceActual = idx;
    titulo.textContent = canciones[idx].titulo;
    audio.src = canciones[idx].src;
}

function toggleAudio() {
    if (!audio.src) cargarCancion(0);
    
    if (audio.paused) {
        audio.play().then(() => {
            btnPlay.textContent = "⏸️";
        }).catch(() => {
            alert("Asegúrate de tener los archivos en la carpeta 'musica/'.");
        });
    } else {
        audio.pause();
        btnPlay.textContent = "▶️";
    }
}

function cambiarCancion(dir) {
    indiceActual = (indiceActual + dir + canciones.length) % canciones.length;
    cargarCancion(indiceActual);
    audio.play();
    btnPlay.textContent = "⏸️";
}

function reproducirIndice(idx) {
    cargarCancion(idx);
    audio.play();
    btnPlay.textContent = "⏸️";
}

// CONTADOR DE TIEMPO
const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);

function actualizarTiempo() {
    const ahora = new Date();
    const dif = ahora - fechaInicio;

    if (dif < 0) return;

    const seg = Math.floor(dif / 1000);
    const min = Math.floor(seg / 60);
    const hrs = Math.floor(min / 60);
    const dias = Math.floor(hrs / 24);

    document.getElementById("meses").textContent = Math.floor(dias / 30);
    document.getElementById("dias").textContent = dias % 30;
    document.getElementById("horas").textContent = hrs % 24;
    document.getElementById("minutos").textContent = min % 60;
    document.getElementById("segundos").textContent = seg % 60;
}
setInterval(actualizarTiempo, 1000);

// BOTÓN NO & CELEBRACIÓN
function moverNo() {
    const btn = document.getElementById("btnNo");
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btn.style.position = "fixed";
    btn.style.left = `${Math.max(10, x)}px`;
    btn.style.top = `${Math.max(10, y)}px`;
}

function celebrarSi() {
    document.getElementById("mensajeExito").style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}
