/  -- Hamburger Menu  -- /

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('nav__mobile');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
});


