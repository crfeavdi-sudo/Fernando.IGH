/* =========================================
   COCINA SIN RASTRO
   JAVASCRIPT
========================================= */


// =========================================
// MENÚ PARA CELULAR
// =========================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");


    const icon = menuToggle.querySelector("i");


    if (navLinks.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



// =========================================
// CERRAR MENÚ AL DAR CLICK
// =========================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");


        const icon = menuToggle.querySelector("i");


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



// =========================================
// HEADER AL HACER SCROLL
// =========================================

const header = document.querySelector(".header");

const btnTop = document.getElementById("btnTop");


window.addEventListener("scroll", () => {


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }



    if (window.scrollY > 500) {

        btnTop.classList.add("show");

    } else {

        btnTop.classList.remove("show");

    }

});



// =========================================
// BOTÓN VOLVER ARRIBA
// =========================================

btnTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



// =========================================
// ANIMACIONES AL HACER SCROLL
// =========================================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.12

    }

);



document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});