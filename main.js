/* File: styles.css */

/*===== RESET =====*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f9f9f9;
    color: #333;
    line-height: 1.6;
}

img {
    max-width: 100%;
    display: block;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
    color: inherit;
}

/*===== CONTAINER =====*/
.container {
    max-width: 1080px;
    margin: auto;
    padding: 0 2rem;
}

/*===== HEADER =====*/
.header {
    width: 100%;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    z-index: 100;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.nav__logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #007bff;
}

.nav__menu {
    display: flex;
    gap: 1.5rem;
}

.nav__link {
    font-size: 1rem;
    color: #333;
    transition: 0.3s;
}

.nav__link:hover,
.nav__link.active-link {
    color: #007bff;
    border-bottom: 2px solid #007bff;
}

.nav__toggle {
    display: none;
}

/*===== SECTIONS =====*/
.section {
    padding: 6rem 0 4rem;
}

.section__title {
    font-size: 2.2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: #007bff;
}

.grid {
    display: grid;
    gap: 2rem;
}

/*===== HOME =====*/
.home__container {
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.home__title {
    font-size: 2.5rem;
    color: #222;
}

.home__subtitle {
    font-size: 1.2rem;
    color: #555;
    margin: 0.5rem 0;
}

.home__description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.button {
    display: inline-block;
    background: #007bff;
    color: #fff;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    transition: 0.3s;
}

.button:hover {
    background: #0056b3;
}

/*===== ABOUT =====*/
.about__img img {
    border-radius: 1rem;
    width: 100%;
}

.about__content p {
    margin-bottom: 1.5rem;
    color: #555;
}

/*===== SKILLS =====*/
.skills__container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    justify-items: center;
    text-align: center;
}

.skills__item {
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    font-size: 1rem;
    color: #333;
    transition: transform 0.3s;
}

.skills__item:hover {
    transform: scale(1.05);
}

/*===== PROJECTS =====*/
.projects__container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.project__card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project__card:hover {
    transform: translateY(-10px);
}

.project__card h3 {
    color: #007bff;
    margin-bottom: 0.5rem;
}

/*===== CONTACT =====*/
.contact__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact__input {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

/*===== FOOTER =====*/
.footer {
    text-align: center;
    padding: 2rem 0;
    background: #f1f1f1;
    color: #333;
    font-size: 0.9rem;
}
