import { api } from './api.js';

const grid = document.querySelector('#catalog-grid');

document.addEventListener('DOMContentLoaded', async () => {
    if (!grid) return;
    try {
        grid.innerHTML = '<p>Синхронізація з сервером...</p>';
        const items = await api.getItems();
        renderCards(items);
    } catch (err) {
        grid.innerHTML = `<p style="color:red;">Помилка: ${err.message}</p>`;
    }
});

function renderCards(items) {
    if (items.length === 0) {
        grid.innerHTML = '<p>Каталог порожній.</p>';
        return;
    }
    grid.innerHTML = items.map(item => `
        <div class="service-card">
            <img src="${item.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${item.title}" 
                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
            <div class="category-tag">${item.category}</div>
            <h3 style="margin: 0.5rem 0;">${item.title}</h3>
            <p style="font-size: 0.9rem; opacity: 0.7; flex-grow: 1;">${item.description}</p>
            <div style="font-size: 1.2rem; font-weight: 600; color: var(--primary); margin-top: 1rem;">$${item.price}</div>
        </div>
    `).join('');
}