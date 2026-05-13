let allItems = [];
let visibleCount = 4;

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#catalog-grid')) loadData();
});

async function loadData() {
    const grid = document.querySelector('#catalog-grid');
    try {
        grid.innerHTML = '<div class="status">Завантаження...</div>'; // Пункт 3
        const response = await fetch('../data/items.json'); // Пункт 2
        if (!response.ok) throw new Error('Помилка завантаження файлу');
        allItems = await response.json();
        render();
        initEvents();
    } catch (err) {
        grid.innerHTML = `<div class="status" style="color:red">Помилка: ${err.message}</div>`; // Пункт 3
    }
}

function render() {
    const grid = document.querySelector('#catalog-grid');
    const loadMore = document.querySelector('#load-more');
    const search = document.querySelector('#search')?.value.toLowerCase() || '';
    const category = document.querySelector('#category-filter')?.value || 'all';
    const sort = document.querySelector('#sort-filter')?.value || 'default';

    // Фільтрація (Пункт 5, 6)
    let filtered = allItems.filter(item => 
        (category === 'all' || item.category === category) && 
        (item.title.toLowerCase().includes(search))
    );

    // Сортування (Пункт 7)
    if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a,b) => a.title.localeCompare(b.title));

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="status">Нічого не знайдено 🔎</div>';
        loadMore.hidden = true;
        return;
    }

    // Рендеринг карток (Пункт 4, 8, 9)
    const favs = JSON.parse(localStorage.getItem('favItems') || '[]');
    filtered.slice(0, visibleCount).forEach(item => {
        const isFav = favs.includes(item.id);
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p style="opacity:0.7; font-size:0.9rem; margin-top:0.5rem">${item.desc}</p>
            <div class="card-footer">
                <strong style="color:var(--primary); font-size:1.2rem">$${item.price}</strong>
                <button class="fav-btn" data-id="${item.id}">${isFav ? '❤️' : '🤍'}</button>
            </div>
            <button class="filter-btn details-trigger" data-id="${item.id}" style="width:100%">Детальніше</button>
        `;
        grid.appendChild(card);
    });

    loadMore.hidden = visibleCount >= filtered.length;
}

function initEvents() {
    document.querySelector('#search').addEventListener('input', () => { visibleCount = 4; render(); });
    document.querySelector('#category-filter').addEventListener('change', () => { visibleCount = 4; render(); });
    document.querySelector('#sort-filter').addEventListener('change', render);
    document.querySelector('#load-more').addEventListener('click', () => { visibleCount += 4; render(); });

    document.querySelector('#catalog-grid').addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains('fav-btn')) {
            let favs = JSON.parse(localStorage.getItem('favItems') || '[]');
            favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
            localStorage.setItem('favItems', JSON.stringify(favs));
            render();
        }
        if (e.target.classList.contains('details-trigger')) {
            const item = allItems.find(i => i.id === id);
            openModal(item);
        }
    });
}

function openModal(item) {
    const modal = document.querySelector('#details-modal');
    document.querySelector('#modal-body').innerHTML = `
        <img src="${item.img}" style="width:100%; border-radius:15px; margin-bottom:1.5rem;">
        <h2 style="margin-bottom:1rem">${item.title}</h2>
        <p style="margin-bottom:1rem">${item.desc}</p>
        <div style="background:rgba(99, 102, 241, 0.1); padding:1rem; border-radius:10px;">
            <p><strong>Категорія:</strong> ${item.category}</p>
            <p><strong>Рейтинг:</strong> ⭐ ${item.rating || '4.5'}</p>
            <p><strong>Ціна розробки:</strong> $${item.price}</p>
        </div>
    `;
    modal.hidden = false;
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.querySelector('#details-modal').hidden = true;
});