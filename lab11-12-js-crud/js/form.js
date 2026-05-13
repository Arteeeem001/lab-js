import { api } from './api.js';

const form = document.querySelector('#item-form');
const listContainer = document.querySelector('#admin-list');

document.addEventListener('DOMContentLoaded', loadItems);

async function loadItems() {
    const items = await api.getItems();
    listContainer.innerHTML = items.map(item => `
        <div style="background: rgba(255,255,255,0.05); margin-bottom: 0.5rem; padding: 1rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span><strong>${item.title}</strong> ($${item.price})</span>
            <div>
                <button class="action-btn" onclick="window.editItem('${item.id}')">📝</button>
                <button class="action-btn" onclick="window.deleteItem('${item.id}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.querySelector('#item-id').value;
    const data = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        category: document.querySelector('#category').value,
        price: Number(document.querySelector('#price').value),
        description: document.querySelector('#description').value
    };

    try {
        if (id) await api.updateItem(id, data);
        else await api.createItem(data);
        form.reset();
        document.querySelector('#item-id').value = '';
        loadItems();
    } catch (err) { alert(err.message); }
});

window.deleteItem = async (id) => {
    if (confirm('Видалити цей запис?')) {
        await api.deleteItem(id);
        loadItems();
    }
};

window.editItem = async (id) => {
    const item = await api.getItemById(id);
    document.querySelector('#item-id').value = item.id;
    document.querySelector('#title').value = item.title;
    document.querySelector('#image').value = item.image || '';
    document.querySelector('#category').value = item.category;
    document.querySelector('#price').value = item.price;
    document.querySelector('#description').value = item.description;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};