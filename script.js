/* ==========================================
   NUESTRA HISTORIA
   JavaScript
========================================== */


/* ==========================================
   CAMBIO DE PANTALLAS
========================================== */

let pantallaActual = 1;


function mostrarPantalla(numero) {

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach(function(pantalla) {

        pantalla.classList.remove("activa");

    });


    const nuevaPantalla =
        document.getElementById("pantalla" + numero);


    if (nuevaPantalla) {

        nuevaPantalla.classList.add("activa");

        pantallaActual = numero;

    }

}


function siguientePantalla() {

    if (pantallaActual < 4) {

        mostrarPantalla(pantallaActual + 1);

    }

}


function anteriorPantalla() {

    if (pantallaActual > 1) {

        mostrarPantalla(pantallaActual - 1);

    }

}


/* ==========================================
   CARTA 3D
========================================== */

document.addEventListener("DOMContentLoaded", function() {

    const carta =
        document.getElementById("cartaFlip");


    if (carta) {

        carta.addEventListener("click", function() {

            carta.classList.toggle("abierta");

        });

    }

});


/* ==========================================
   CONTADOR
========================================== */

function actualizarContador() {

    /*
       Fecha en que comenzó la relación:

       8 de julio de 2026
       7:25 PM
    */

    const fechaInicio =
        new Date(
            2026,
            6,
            8,
            19,
            25,
            0
        );


    const ahora = new Date();


    let diferencia =
        ahora.getTime() -
        fechaInicio.getTime();


    /*
       Si la fecha todavía no ha llegado,
       mostramos todo en cero.
    */

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
        Math.floor(diferencia / dia);


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


    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");


    if (elementoDias) {

        elementoDias.textContent = dias;

    }


    if (elementoHoras) {

        elementoHoras.textContent =
            horas.toString().padStart(2, "0");

    }


    if (elementoMinutos) {

        elementoMinutos.textContent =
            minutos.toString().padStart(2, "0");

    }


    if (elementoSegundos) {

        elementoSegundos.textContent =
            segundos.toString().padStart(2, "0");

    }

}


/*
   Actualizar inmediatamente
*/

actualizarContador();


/*
   Actualizar cada segundo
*/

setInterval(
    actualizarContador,
    1000
);


/* ==========================================
   TECLADO
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /*
           Flecha derecha
        */

        if (event.key === "ArrowRight") {

            siguientePantalla();

        }


        /*
           Flecha izquierda
        */

        if (event.key === "ArrowLeft") {

            anteriorPantalla();

        }

    }
);


/* ==========================================
   CORAZONES FLOTANTES
========================================== */

function crearCorazon() {

    const contenedor =
        document.getElementById("corazones");


    if (!contenedor) {
        return;
    }


    const corazon =
        document.createElement("div");


    corazon.classList.add(
        "corazon-flotante"
    );


    corazon.textContent = "♥";


    /*
       Posición horizontal aleatoria
    */

    corazon.style.left =
        Math.random() * 100 + "%";


    /*
       Tamaño aleatorio
    */

    const tamanio =
        Math.random() * 20 + 12;


    corazon.style.fontSize =
        tamanio + "px";


    /*
       Duración aleatoria
    */

    const duracion =
        Math.random() * 5 + 5;


    corazon.style.animationDuration =
        duracion + "s";


    contenedor.appendChild(corazon);


    /*
       Eliminar después de la animación
    */

    setTimeout(function() {

        corazon.remove();

    }, duracion * 1000);

}


/*
   Crear corazones periódicamente
*/

setInterval(
    crearCorazon,
    700
);


/* ==========================================
   INICIAR ALGUNOS CORAZONES
========================================== */

for (let i = 0; i < 8; i++) {

    setTimeout(
        crearCorazon,
        i * 300
    );

}
