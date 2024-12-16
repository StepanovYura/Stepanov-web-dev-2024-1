"use strict";
"createArray.js";

// Переменная для отслеживания последнего выбранного фильтра
let lastFilter = { category: null, kind: null }; // Хранит последний выбранный фильтр

// Объект для хранения текущего выбора пользователя
const currentOrder = {
    soup: null,
    base: null,
    salat: null,
    juice: null,
    desert: null
};

// Функция для расчета общей стоимости
function calculateTotal() {
    const totalElement = document.getElementById('total');
    const total =
    (currentOrder.soup ? currentOrder.soup.price : 0) +
    (currentOrder.base ? currentOrder.base.price : 0) +
    (currentOrder.salat ? currentOrder.salat.price : 0) +
    (currentOrder.juice ? currentOrder.juice.price : 0) +
    (currentOrder.desert ? currentOrder.desert.price : 0);

    totalElement.textContent = total ? ` ${total} ₽` : ' 0 ₽'; // Обновляем текст общей стоимости
}

// Функция для обновления информации о выбранном пункте
function updateOrderDetails(category, dish) {
    const selectElement = document.querySelector(`#${category}-select-no`);
    const hiddenInput = document.querySelector(`#hidden${capitalize(category)}`);

    if (dish) {
        selectElement.textContent = `${dish.name} (${dish.count}) - ${dish.price} ₽`;
        hiddenInput.value = dish.keyword;
    } else {
        selectElement.textContent = `не выбран`;
        hiddenInput.value = '';
    }
}

// Функция для отображения текущего заказа
function renderOrder() {
    const nothingSelected = document.querySelector('#nothing');
    const orderDetails = document.querySelector('#selectedOrder');

    if (currentOrder.soup || currentOrder.base || currentOrder.salat || currentOrder.juice || currentOrder.desert) {
        nothingSelected.style.display = 'none';
        orderDetails.style.display = 'block';

        updateOrderDetails('soup', currentOrder.soup);
        updateOrderDetails('base', currentOrder.base);
        updateOrderDetails('salat', currentOrder.salat);
        updateOrderDetails('juice', currentOrder.juice);
        updateOrderDetails('desert', currentOrder.desert);
        calculateTotal();

    } else {
        nothingSelected.style.display = 'block';
        orderDetails.style.display = 'none';
        calculateTotal();
    }
}

// Функция для отображения блюд из массива данных
function displayMenu() {
    const categoryContainers = {
        soup: document.querySelector('#soup-container'),
        base: document.querySelector('#base-container'),
        salat: document.querySelector('#salat-container'),
        juice: document.querySelector('#juice-container'),
        desert: document.querySelector('#desert-container')
    };

    // Сортируем блюда в алфавитном порядке по имени
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.classList.add('menu-item');
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price} ₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Добавить</button>
        `;

        card.querySelector('button').onclick = () => chooseDish(dish);

        categoryContainers[dish.category].appendChild(card);
    });
}

// Функция для выбора блюда
function chooseDish(dish) {
    // Проверяем, выбрано ли уже это блюдо
    if (currentOrder[dish.category] === dish) {
        // Если да, то снимаем выделение
        currentOrder[dish.category] = null;
    } else {
        // Если нет, то сохраняем новое блюдо
        currentOrder[dish.category] = dish;
    }

    // Убираем активность со всех карточек в категории
    const categoryCards = document.querySelectorAll(`#${dish.category}-container .menu-item`);
    categoryCards.forEach(card => card.classList.remove('active'));

    // Добавляем класс активности для выбранной карточки, если блюдо выбрано
    if (currentOrder[dish.category]) {
        const selectedCard = Array.from(categoryCards).find(card =>
            card.querySelector('img').src.includes(dish.image)
        );
        if (selectedCard) selectedCard.classList.add('active');
    }

    // Обновляем отображение заказа
    renderOrder();
}

// Функция для сброса выбора
function resetOrder() {
    // Очищаем объект текущего заказа
    currentOrder.soup = null;
    currentOrder.base = null;
    currentOrder.salat = null;
    currentOrder.juice = null;
    currentOrder.desert = null;

    // Убираем активность с карточек
    document.querySelectorAll('.menu-item').forEach(card => card.classList.remove('active'));

    // Обновляем отображение заказа
    renderOrder();
}

// Функция для отправки заказа
function submitOrder() {
    // Скрытые поля уже обновляются в функции `updateOrderDetails`
    alert('Ваш заказ отправлен!');
}

// Вспомогательная функция для капитализации строки
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetFilters() {
    // Очистка локального хранилища
    localStorage.removeItem('filters');
    
    // Очистка фильтров на странице
    document.querySelectorAll('.filter-input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}



// Функция для настройки фильтров по категориям
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.sort input[type="radio"]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.dataset.kind;
            const category = button.dataset.category;

            if (lastFilter.category === category && lastFilter.kind === kind) {
                // Сбрасываем фильтр
                filterMenuByCategory(category, null);
                lastFilter = { category: null, kind: null };
                button.checked = false; 
            } else {
                // Применяем фильтр
                filterMenuByCategory(category, kind);
                lastFilter = { category, kind };
            }
        });
    });
}


// Функция для фильтрации меню по категории и типу блюда
function filterMenuByCategory(category, kind) {
    const container = document.querySelector(`#${category}-container`);

    // Очищаем контейнер перед добавлением блюд
    container.innerHTML = '';

    // Определяем, какие блюда отображать
    const filteredDishes = kind 
        ? dishes.filter(dish => dish.category === category && dish.kind === kind)
        : dishes.filter(dish => dish.category === category); // Все блюда, если фильтр не указан

    if (filteredDishes.length === 0) {
        container.innerHTML = '<p>Нет подходящих блюд.</p>';
        return;
    }

    // Сортируем блюда по имени
    const sortedDishes = filteredDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    // Отображаем блюда
    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.classList.add('menu-item');
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price} ₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Добавить</button>
        `;

        // Проверяем, является ли блюдо выбранным, и добавляем класс active
        if (currentOrder[dish.category] === dish) {
            card.classList.add('active');
        }

        card.querySelector('button').onclick = () => chooseDish(dish);

        container.appendChild(card);
    });
}

// Привязываем обработчики событий и отображаем меню
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    setupCategoryFilters(); // Настроим фильтры
    renderOrder();

    document.querySelector('button[type="reset"]').onclick = resetOrder;
    document.querySelector('button[type="submit"]').onclick = submitOrder;
});
// сделать так чтобы после сброса фильтра блюдо отсавалось выбранным (подсвечивалось)
//свойства дата сет и что такое дата атрибуты