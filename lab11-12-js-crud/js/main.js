document.addEventListener('DOMContentLoaded', () => {
    // Встановлення року
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Перемикач теми
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Відновлення теми
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.remove('theme-dark');
    }
});