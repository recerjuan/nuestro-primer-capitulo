let pantallaActual = 1;

const totalPantallas = 4;


/* =========================================
   CAMBIAR DE PANTALLA
========================================= */

function mostrarPantalla(numero) {

    if (numero < 1 || numero > totalPantallas) {
        return;
    }

    document
        .querySelectorAll(".pantalla")
        .forEach(function (pantalla) {

            pantalla.classList.remove("activa");

        });

    const nuevaPantalla =
        document.getElementById(
            "pantalla" + numero
        );

    if (nuevaPantalla) {

        nuevaPantalla.classList.add("activa");

        pantallaActual = numero;

    }
}


/* =========================================
   SIGUIENTE
========================================= */

function siguientePantalla() {

    if (pantallaActual < totalPantallas) {

        mostrarPantalla(
            pantallaActual + 1
        );

    }

}


/* =========================================
   ANTERIOR
========================================= */

function anteriorPantalla() {

    if (pantallaActual > 1) {

        mostrarPantalla(
            pantallaActual - 1
        );

    }

}


/* =========================================
   CONTADOR
========================================= */

function actualizarContador() {

    /*
       8 de julio de 2026
       7:25 PM
    */

    const inicio =
        new Date(
            2026,
            6,
            8,
            19,
            25,
            0
        );

    const ahora =
        new Date();

    let diferencia =
        ahora.getTime() -
        inicio.getTime();


    if (diferencia < 0) {

        diferencia = 0;

    }


    const segundo =
        1000;

    const minuto =
        segundo * 60;

    const hora =
        minuto * 60;

    const dia =
        hora * 24;


    const dias =
        Math.floor(
            diferencia / dia
        );

    const horas =
        Math.floor(
            (diferencia % dia) / hora
        );

    const minutos =
        Math.floor(
            (diferencia % hora) / minuto
        );

    const segundos =
        Math.floor(
            (diferencia % minuto) / segundo
        );


    document.getElementById("dias").textContent =
        dias;

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}


actualizarContador();

setInterval(
    actualizarContador,
    1000
);


/* =========================================
   CORAZONES
========================================= */

function crearCorazon() {

    const contenedor =
        document.querySelector(".hearts");

    if (!contenedor) {
        return;
    }

    const corazon =
        document.createElement("div");

    corazon.className = "heart";

    corazon.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    const posicion =
        Math.random() * 100;

    const tamaño =
        10 + Math.random() * 18;

    const duracion =
        6 + Math.random() * 7;


    corazon.style.left =
        posicion + "%";

    corazon.style.fontSize =
        tamaño + "px";

    corazon.style.animationDuration =
        duracion + "s";


    contenedor.appendChild(
        corazon
    );


    setTimeout(
        function () {

            corazon.remove();

        },
        duracion * 1000
    );
}


setInterval(
    crearCorazon,
    700
);


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "ArrowRight") {

            siguientePantalla();

        }

        if (evento.key === "ArrowLeft") {

            anteriorPantalla();

        }

    }
);
