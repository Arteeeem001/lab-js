document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initActiveLink();
    initBackToTop();
    
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

function initTheme() {
    const btn = document.querySelector('.theme-toggle');
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('theme-dark');

    btn?.addEventListener('click', () => {
        document.body.classList.toggle('theme-dark');
        localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'dark' : 'light');
    });
}

function initActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        if (link.getAttribute('href').includes(path)) link.classList.add('is-active');
    });
}

function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (btn) btn.hidden = window.scrollY < 400;
    });
    btn?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}