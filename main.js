// main.js

document.addEventListener("DOMContentLoaded", function () {
    // Typed.js effect for dynamic typing in hero section
    var typed = new Typed(".typed-text", {
        strings: [
            "Java Developer",
            "Spring MVC Expert",
            "Backend API Developer",
            "Problem Solver"
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true
    });

    // ScrollReveal animations
    ScrollReveal().reveal('.section-title', {
        delay: 200,
        origin: 'top',
        distance: '30px',
        duration: 1000,
        easing: 'ease-in-out'
    });

    ScrollReveal().reveal('.card', {
        interval: 200,
        origin: 'bottom',
        distance: '40px',
        duration: 1200,
        easing: 'ease-in-out'
    });

    ScrollReveal().reveal('form input, form textarea, form button', {
        interval: 100,
        origin: 'left',
        distance: '30px',
        duration: 1000,
        easing: 'ease-in-out'
    });

    // Initialize AOS
    AOS.init({
        duration: 1200,
        once: true
    });
});
