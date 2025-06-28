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
        loop: true,
        showCursor: true,
        cursorChar: '|'
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

    ScrollReveal().reveal('.typed-text, .btn, .form-control, .footer, .animated-word', {
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

    // Create floating animated words in a circular orbit
    const words = ["Java", "Spring", "MySQL", "Elasticsearch", "API", "SIEM", "Cloud", "Git", "Security"];
    const orbitContainer = document.createElement("div");
    orbitContainer.className = "orbit-container";
    document.body.appendChild(orbitContainer);

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "animated-word";
        span.textContent = word;
        orbitContainer.appendChild(span);
    });

    // Animate orbiting effect
    const animateOrbit = () => {
        const elements = document.querySelectorAll(".animated-word");
        const radius = 100;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2.2;
        const time = Date.now() / 1000;

        elements.forEach((el, i) => {
            const angle = time + i * (2 * Math.PI / elements.length);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            el.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animateOrbit);
    };
    animateOrbit();
});
