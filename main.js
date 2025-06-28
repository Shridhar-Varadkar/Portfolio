// main.js

// Scroll Animation Init
AOS.init();

// Typed Text Effect
const typed = new Typed('.typed-text', {
    strings: [
        'Java Developer',
        'Spring MVC Specialist',
        'Backend Engineer',
        'Problem Solver'
    ],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
});

// ScrollReveal Animations
ScrollReveal().reveal('#home .container', { delay: 200 });
ScrollReveal().reveal('#about', { delay: 300 });
ScrollReveal().reveal('#skills', { delay: 400 });
ScrollReveal().reveal('#projects', { delay: 500 });
ScrollReveal().reveal('#education', { delay: 600 });
ScrollReveal().reveal('#certifications', { delay: 700 });
ScrollReveal().reveal('#contact', { delay: 800 });
