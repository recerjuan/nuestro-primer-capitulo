/* NAVEGACIÓN DIRECTA ENTRE PANTALLAS */
function cambiarPantalla(numeroPantalla) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activa');
    });

    // Mostrar la pantalla solicitada
    const pantallaDestino = document.getElementById('pantalla' + numeroPantalla);
    if (pantallaDestino) {
        pantallaDestino.classList.add('activa');
        pantallaDestino.scrollTop = 0; // Reiniciar el scroll al inicio
    }
}

/* REVELAR TARJETAS SECRETAS */
function revelarNota(elemento) {
    elemento.classList.toggle("revelada");
}

/* APERTURA DE LA CARTA EN PANTALLA 2 */
document.addEventListener("DOMContentLoaded", function () {
    const sobre = document.getElementById("contenedorSobre");
    const carta = document.getElementById("cartaEscribir");

    if (sobre) {
        sobre.addEventListener("click", function () {
            sobre.classList.add("abierto");

            if (carta) {
                setTimeout(() => {
                    carta.classList.remove("oculta");
                    carta.classList.add("visible");
                }, 300);
            }
        });
    }
});

/* MÚSICA DE FONDO */
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

/* CONTADOR DE TIEMPO EN VIVO */
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

    if (document.getElementById("dias")) document.getElementById("dias").textContent = dias;
    if (document.getElementById("horas")) document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    if (document.getElementById("minutos")) document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    if (document.getElementById("segundos")) document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

/* VISOR DE FOTOS (MODAL) */
function abrirModal(src, texto) {
    const modal = document.getElementById("modalFoto");
    const imgModal = document.getElementById("imagenModal");
    const caption = document.getElementById("captionModal");

    if (modal && imgModal) {
        modal.style.display = "flex";
        imgModal.src = src;
        if (caption) caption.innerText = texto;
    }
}

function cerrarModal() {
    const modal = document.getElementById("modalFoto");
    if (modal) modal.style.display = "none";
}

/* EFECTO DE CORAZONES FLOTANTES */
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
