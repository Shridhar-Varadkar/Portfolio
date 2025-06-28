/*=========== NAV ACTIVE ON SCROLL ===========*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        const navLink = document.querySelector(
            ".nav__menu a[href*=" + sectionId + "]"
        );
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active");
            } else {
                navLink.classList.remove("active");
            }
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*=========== TYPED TEXT ===========*/
const typed = new Typed(".typed-text", {
    strings: ["Java Developer", "Spring Boot Engineer", "Backend API Builder", "Problem Solver"],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

/*=========== AOS INIT ===========*/
AOS.init({
    duration: 1000,
    once: true
});

/*=========== SCROLL REVEAL ===========*/
ScrollReveal().reveal('section', {
    delay: 200,
    distance: '50px',
    origin: 'bottom'
});
