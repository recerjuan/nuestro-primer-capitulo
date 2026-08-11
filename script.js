let pantallaActual = 1;

function siguientePantalla() {
    const pantallaAnterior = document.getElementById(
        "pantalla" + pantallaActual
    );

    pantallaActual++;

    const pantallaSiguiente = document.getElementById(
        "pantalla" + pantallaActual
    );

    if (!pantallaSiguiente) {
        pantallaActual--;
        return;
    }

    pantallaAnterior.classList.remove("activa");

    setTimeout(function () {
        pantallaSiguiente.classList.add("activa");
    }, 100);
}

function anteriorPantalla() {
    if (pantallaActual <= 1) {
        return;
    }

    const pantallaActualElemento = document.getElementById(
        "pantalla" + pantallaActual
    );

    pantallaActual--;

    const pantallaAnterior = document.getElementById(
        "pantalla" + pantallaActual
    );

    pantallaActualElemento.classList.remove("activa");

    setTimeout(function () {
        pantallaAnterior.classList.add("activa");
    }, 100);
}


/* CONTADOR */

const fechaInicio = new Date("2026-07-08T19:25:00-05:00");

function actualizarContador() {
    const ahora = new Date();

    let diferencia = ahora.getTime() - fechaInicio.getTime();

    if (diferencia < 0) {
        diferencia = 0;
    }

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / 86400);

    const horas = Math.floor(
        (segundosTotales % 86400) / 3600
    );

    const minutos = Math.floor(
        (segundosTotales % 3600) / 60
    );

    const segundos = segundosTotales % 60;

    document.getElementById("dias").textContent = dias;

    document.getElementById("horas").textContent =
        horas.toString().padStart(2, "0");

    document.getElementById("minutos").textContent =
        minutos.toString().padStart(2, "0");

    document.getElementById("segundos").textContent =
        segundos.toString().padStart(2, "0");
}

actualizarContador();

setInterval(actualizarContador, 1000);


/* CORAZONES FLOTANTES */

const contenedorCorazones = document.querySelector(".hearts");

function crearCorazon() {
    const corazon = document.createElement("div");

    corazon.classList.add("heart");

    corazon.innerHTML = "♥";

    corazon.style.left =
        Math.random() * 100 + "%";

    const tamaño =
        Math.random() * 15 + 10;

    corazon.style.fontSize =
        tamaño + "px";

    const duracion =
        Math.random() * 8 + 7;

    corazon.style.animationDuration =
        duracion + "s";

    contenedorCorazones.appendChild(corazon);

    setTimeout(function () {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 900);