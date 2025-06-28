// main.js

document.addEventListener("DOMContentLoaded", function () {
    // Typed.js dynamic typing effect
    const typed = new Typed(".typed-text", {
        strings: [
            "Java Developer",
            "Spring Boot Specialist",
            "Backend API Engineer",
            "Cloud Integration Developer",
            "SIEM Platform Builder"
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true
    });

    // ScrollReveal animations
    ScrollReveal().reveal('.section-title', {
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        reset: false
    });

    ScrollReveal().reveal('.card', {
        origin: 'bottom',
        distance: '40px',
        duration: 1200,
        interval: 200,
        easing: 'ease',
        reset: false
    });

    ScrollReveal().reveal('.typed-text, .btn, .form-control, .footer', {
        origin: 'left',
        distance: '40px',
        duration: 1000,
        interval: 100,
        reset: false
    });

    // AOS Initialization for added animation effect
    AOS.init({
        duration: 1500,
        once: true,
        easing: 'ease-in-out-cubic'
    });

    // Optional: Add parallax or background effects here if needed
});
