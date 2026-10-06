/* =========================================
   MENÚ MÓVIL
========================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const icono = menuBtn.querySelector("i");

    if (nav.classList.contains("active")) {

        icono.classList.remove("fa-bars");
        icono.classList.add("fa-xmark");

    } else {

        icono.classList.remove("fa-xmark");
        icono.classList.add("fa-bars");

    }

});


/* Cerrar menú al seleccionar una opción */

const enlacesNav = document.querySelectorAll(".nav a");

enlacesNav.forEach(enlace => {

    enlace.addEventListener("click", () => {

        nav.classList.remove("active");

        const icono = menuBtn.querySelector("i");

        icono.classList.remove("fa-xmark");
        icono.classList.add("fa-bars");

    });

});


/* =========================================
   HEADER AL HACER SCROLL
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        btnArriba.classList.add("visible");

    } else {

        btnArriba.classList.remove("visible");

    }

});


btnArriba.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   ANIMACIONES DE SECCIONES
========================================= */

const elementosReveal = document.querySelectorAll(
    ".tema-card, .contenido-texto, .dato-card, .paso, .residuo-card, .accion, .juego-card"
);

const observer = new IntersectionObserver(

    (entradas, observer) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("reveal");
                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


elementosReveal.forEach(elemento => {

    observer.observe(elemento);

});


/* =========================================
   MINI JUEGO
   ¿DÓNDE VA ESTE RESIDUO?
========================================= */

const preguntasJuego = [

    {
        residuo: "Cáscara de plátano",
        icono: "🍌",
        respuesta: "organico"
    },

    {
        residuo: "Botella de plástico limpia",
        icono: "🥤",
        respuesta: "reciclable"
    },

    {
        residuo: "Aceite de cocina usado",
        icono: "🛢️",
        respuesta: "aceite"
    },

    {
        residuo: "Restos de verduras",
        icono: "🥕",
        respuesta: "organico"
    },

    {
        residuo: "Material que no puede aprovecharse",
        icono: "🗑️",
        respuesta: "no-aprovechable"
    }

];


/* VARIABLES */

let preguntaActual = 0;
let puntos = 0;
let respondida = false;


/* ELEMENTOS */

const nombreResiduo =
    document.getElementById("nombreResiduo");

const iconoResiduo =
    document.getElementById("iconoResiduo");

const preguntaNumero =
    document.getElementById("preguntaNumero");

const puntuacion =
    document.getElementById("puntuacion");

const mensajeJuego =
    document.getElementById("mensajeJuego");

const siguientePregunta =
    document.getElementById("siguientePregunta");

const resultadoJuego =
    document.getElementById("resultadoJuego");

const resultadoTexto =
    document.getElementById("resultadoTexto");

const reiniciarJuego =
    document.getElementById("reiniciarJuego");

const opciones =
    document.querySelectorAll(".opcion");

const residuoPregunta =
    document.querySelector(".residuo-pregunta");


/* =========================================
   MOSTRAR PREGUNTA
========================================= */

function mostrarPregunta() {

    const pregunta =
        preguntasJuego[preguntaActual];


    nombreResiduo.textContent =
        pregunta.residuo;


    iconoResiduo.textContent =
        pregunta.icono;


    preguntaNumero.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntasJuego.length}`;


    puntuacion.textContent =
        `Puntos: ${puntos}`;


    mensajeJuego.textContent = "";


    siguientePregunta.style.display =
        "none";


    respondida = false;


    opciones.forEach(opcion => {

        opcion.disabled = false;

        opcion.classList.remove("correcta");

        opcion.classList.remove("incorrecta");

    });

}


/* =========================================
   SELECCIONAR RESPUESTA
========================================= */

opciones.forEach(opcion => {

    opcion.addEventListener("click", () => {

        if (respondida) {
            return;
        }


        respondida = true;


        const respuestaSeleccionada =
            opcion.dataset.respuesta;


        const respuestaCorrecta =
            preguntasJuego[preguntaActual].respuesta;


        /* RESPUESTA CORRECTA */

        if (
            respuestaSeleccionada ===
            respuestaCorrecta
        ) {

            puntos++;


            opcion.classList.add(
                "correcta"
            );


            mensajeJuego.textContent =
                "✅ ¡Correcto! Muy bien.";

        }


        /* RESPUESTA INCORRECTA */

        else {

            opcion.classList.add(
                "incorrecta"
            );


            mensajeJuego.textContent =
                "❌ Incorrecto. La respuesta correcta está marcada en verde.";


            /* Mostrar respuesta correcta */

            opciones.forEach(op => {

                if (
                    op.dataset.respuesta ===
                    respuestaCorrecta
                ) {

                    op.classList.add(
                        "correcta"
                    );

                }

            });

        }


        /* ACTUALIZAR PUNTOS */

        puntuacion.textContent =
            `Puntos: ${puntos}`;


        /* DESACTIVAR OPCIONES */

        opciones.forEach(op => {

            op.disabled = true;

        });


        /* SIGUIENTE */

        if (
            preguntaActual <
            preguntasJuego.length - 1
        ) {

            siguientePregunta.style.display =
                "inline-flex";

        } else {

            setTimeout(() => {

                terminarJuego();

            }, 900);

        }

    });

});


/* =========================================
   SIGUIENTE PREGUNTA
========================================= */

siguientePregunta.addEventListener(
    "click",
    () => {

        preguntaActual++;

        mostrarPregunta();

    }
);


/* =========================================
   TERMINAR JUEGO
========================================= */

function terminarJuego() {

    residuoPregunta.style.display =
        "none";


    document.querySelector(
        ".opciones"
    ).style.display = "none";


    mensajeJuego.style.display =
        "none";


    siguientePregunta.style.display =
        "none";


    resultadoJuego.style.display =
        "block";


    let mensajeFinal;


    if (puntos === 5) {

        mensajeFinal =
            "¡Excelente! Dominas muy bien el manejo responsable de los residuos.";

    }

    else if (puntos >= 3) {

        mensajeFinal =
            "¡Muy bien! Tienes buenos conocimientos sobre el manejo de residuos.";

    }

    else {

        mensajeFinal =
            "Puedes seguir aprendiendo. ¡Inténtalo nuevamente!";

    }


    resultadoTexto.textContent =
        `Obtuviste ${puntos} de ${preguntasJuego.length} puntos. ${mensajeFinal}`;

}


/* =========================================
   REINICIAR JUEGO
========================================= */

reiniciarJuego.addEventListener(
    "click",
    () => {

        preguntaActual = 0;

        puntos = 0;

        respondida = false;


        residuoPregunta.style.display =
            "block";


        document.querySelector(
            ".opciones"
        ).style.display = "grid";


        mensajeJuego.style.display =
            "block";


        resultadoJuego.style.display =
            "none";


        mostrarPregunta();

    }
);


/* =========================================
   INICIAR JUEGO
========================================= */

mostrarPregunta();