/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 200,
    easing: 'ease-in-out',
    reset: false
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img, .expertise', { delay: 150 });
sr.reveal('.home__social-icon, .footer__social', { interval: 100 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 150 });

/*===== AOS Initialization =====*/
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

/*===== Typed Text Animation =====*/
new Typed('.typed-text', {
    strings: [
        "Java Developer with 2 Years Experience",
        "Backend Specialist | Spring Boot | Hibernate",
        "Crafting Scalable APIs & RESTful Services",
        "SQL Expert | Clean Architecture Advocate",
        "Passionate about Problem Solving & System Design"
    ],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});
