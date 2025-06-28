// File: main.js

// Typed.js Effect
const typed = new Typed(".typed-text", {
    strings: ["Shridhar Varadkar", "Java Developer", "Backend Enthusiast"],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
});

// AOS (Animate On Scroll) Initialization
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
});

// Navbar Menu Toggle for Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Active Link Switching
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    navLinks.forEach(n => n.classList.remove('active-link'));
    this.classList.add('active-link');
}

navLinks.forEach(n => n.addEventListener('click', linkAction));

// Optional: Hide mobile menu after clicking
navLinks.forEach(link =>
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
);

// Smooth scroll behavior (if not using HTML smooth-scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
