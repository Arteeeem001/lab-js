document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація всіх модулів
    initActiveNav();
    initTheme();
    initAccordion();
    initFilters();
    initContactLogic();
    initBackToTop();
    
    // ПУНКТ 5: Автоматичне оновлення року у футері
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();
});

// ПУНКТ 2: Підсвічування активного пункту меню
function initActiveNav() {
    const links = document.querySelectorAll('.nav-link');
    const curPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(l => {
        if (l.getAttribute('href').includes(curPath)) l.classList.add('is-active');
    });
}

// ПУНКТ 4: Перемикач теми з пам'яттю (localStorage)
function initTheme() {
    const btn = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Відновлення збереженої теми
    if (localStorage.getItem('siteTheme') === 'theme-dark') {
        body.classList.add('theme-dark');
    }
    
    btn?.addEventListener('click', () => {
        body.classList.toggle('theme-dark');
        const mode = body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
        localStorage.setItem('siteTheme', mode);
    });
}

// ПУНКТ 6: Акордеон (FAQ)
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.addEventListener('click', () => {
            const item = h.parentElement;
            item.classList.toggle('active');
        });
    });
}

// ПУНКТ 7: Фільтрація карток проєктів
function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.service-card');
    
    btns.forEach(b => {
        b.addEventListener('click', () => {
            const f = b.dataset.filter;
            cards.forEach(c => {
                // Плавне приховування
                if (f === 'all' || c.dataset.category === f) {
                    c.style.display = 'block';
                    setTimeout(() => c.style.opacity = '1', 10);
                } else {
                    c.style.opacity = '0';
                    setTimeout(() => c.style.display = 'none', 300);
                }
            });
        });
    });
}

// ПУНКТ 9-10: Валідація, Чернетка та FormData
function initContactLogic() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const fields = ['username', 'email', 'message'];
    const counter = document.querySelector('#char-counter');

    // Відновлення чернетки з localStorage
    fields.forEach(f => {
        const val = localStorage.getItem(`draft_${f}`);
        if (val && form[f]) form[f].value = val;
    });

    form.addEventListener('input', (e) => {
        // Збереження чернетки при введенні
        if (fields.includes(e.target.name)) {
            localStorage.setItem(`draft_${e.target.name}`, e.target.value);
        }
        // Лічильник символів
        if (e.target.name === 'message' && counter) {
            counter.textContent = `${e.target.value.length} / 200`;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        
        // Показ результату без перезавантаження
        form.innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h2 style="color: var(--primary);">Успішно!</h2>
                <p>Дякуємо, <b>${data.username}</b>. Ми отримали ваш запит на <i>${data.email}</i>.</p>
            </div>`;
            
        // Очищення чернетки
        fields.forEach(f => localStorage.removeItem(`draft_${f}`));
    });
}

// ПУНКТ 5: Кнопка "Вгору"
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (btn) btn.hidden = window.scrollY < 400;
    });
    btn?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}