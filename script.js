document.addEventListener("DOMContentLoaded", () => {
    let pantallaActual = 1;
    const totalPantallas = 6;

    // Cambiar de pantalla
    function actualizarPantalla() {
        const pantallas = document.querySelectorAll('.pantalla');
        pantallas.forEach((pantalla, idx) => {
            if (idx + 1 === pantallaActual) {
                pantalla.classList.add('activa');
            } else {
                pantalla.classList.remove('activa');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Eventos para botones Siguiente
    document.querySelectorAll('.btn-siguiente').forEach(btn => {
        btn.addEventListener('click', () => {
            if (pantallaActual < totalPantallas) {
                pantallaActual++;
                actualizarPantalla();
            }
        });
    });

    // Eventos para botones Anterior
    document.querySelectorAll('.btn-anterior').forEach(btn => {
        btn.addEventListener('click', () => {
            if (pantallaActual > 1) {
                pantallaActual--;
                actualizarPantalla();
            }
        });
    });

    // Abrir carta
    const contenedorSobre = document.getElementById('contenedorSobre');
    const sobreElemento = document.getElementById('sobreElemento');
    const cartaEscribir = document.getElementById('cartaEscribir');

    if (contenedorSobre) {
        contenedorSobre.addEventListener('click', () => {
            sobreElemento.classList.add('abriendo');
            setTimeout(() => {
                contenedorSobre.classList.add('ocultar');
                cartaEscribir.classList.remove('oculta');
            }, 500);
        });
    }

    // Revelar notas de amor
    document.querySelectorAll('.tarjeta-nota').forEach(nota => {
        nota.addEventListener('click', () => {
            nota.classList.toggle('revelada');
        });
    });

    // Contador de tiempo (8 de Julio, 7:25 PM)
    const fechaInicio = new Date(2026, 6, 8, 19, 25, 0);[cite: 1]
    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;

        if (diferencia < 0) return;

        const seg = Math.floor(diferencia / 1000);
        const min = Math.floor(seg / 60);
        const hrs = Math.floor(min / 60);
        const dias = Math.floor(hrs / 24);

        document.getElementById('dias').innerText = dias;
        document.getElementById('horas').innerText = String(hrs % 24).padStart(2, '0');
        document.getElementById('minutos').innerText = String(min % 60).padStart(2, '0');
        document.getElementById('segundos').innerText = String(seg % 60).padStart(2, '0');
    }
    setInterval(actualizarContador, 1000);
    actualizarContador();

    // Reproductor de Música
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-audio');
            
            // Pausar otros audios
            document.querySelectorAll('audio').forEach(a => a.pause());
            document.querySelectorAll('.item-cancion').forEach(c => c.classList.remove('activa'));

            const targetAudio = document.getElementById(`audio-${index}`);
            const targetCard = document.getElementById(`card-${index}`);
            if (targetAudio) {
                targetAudio.play();
                if (targetCard) targetCard.classList.add('activa');
            }
        });
    });

    document.querySelectorAll('.btn-pause').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-audio');
            const targetAudio = document.getElementById(`audio-${index}`);
            const targetCard = document.getElementById(`card-${index}`);
            if (targetAudio) {
                targetAudio.pause();
                if (targetCard) targetCard.classList.remove('activa');
            }
        });
    });

    // Corazones Flotantes
    const contenedorCorazones = document.getElementById('heartsContainer');
    if (contenedorCorazones) {
        const simbolos = ['♥️', '✨', '🌹'];
        for (let i = 0; i < 20; i++) {
            const corazon = document.createElement('div');
            corazon.className = 'corazon-flotante';
            corazon.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
            corazon.style.left = `${Math.random() * 100}%`;
            corazon.style.animationDelay = `${Math.random() * 7}s`;
            corazon.style.fontSize = `${Math.random() * 1 + 0.9}rem`;
            contenedorCorazones.appendChild(corazon);
        }
    }
});
