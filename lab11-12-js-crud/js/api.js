const API_URL = 'http://localhost:3000/items'; // Базова адреса API

export const api = {
    // 1. Отримання списку записів (GET /items)
    async getItems() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Не вдалося отримати список із сервера');
            return await response.json();
        } catch (error) {
            console.error('API Error (GET):', error);
            throw error; // Прокидаємо помилку далі для обробки в UI
        }
    },

    // 2. Отримання одного запису для редагування (GET /items/:id)
    async getItemById(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Запис не знайдено');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // 3. Створення нового запису (POST /items)
    async createItem(data) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Обов'язкові заголовки
                body: JSON.stringify(data) // Перетворюємо об'єкт у JSON
            });
            if (!response.ok) throw new Error('Помилка при створенні запису');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // 4. Оновлення існуючого запису (PATCH /items/:id)
    async updateItem(id, data) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Не вдалося оновити дані');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // 5. Видалення запису (DELETE /items/:id)
    async deleteItem(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Помилка при видаленні');
            return true;
        } catch (error) {
            throw error;
        }
    }
};