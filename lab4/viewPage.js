"use strict";
"createArray.js";

// Объект для хранения текущего выбора пользователя
const currentOrder = {
    soup: null,
    base: null,
    juice: null
};

// Функция для расчета общей стоимости
function calculateTotal() {
    const totalElement = document.getElementById('total');
    const total =
    (currentOrder.soup ? currentOrder.soup.price : 0) +
    (currentOrder.base ? currentOrder.base.price : 0) +
    (currentOrder.juice ? currentOrder.juice.price : 0);

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
        selectElement.textContent = `${capitalize(category)} не выбран`;
        hiddenInput.value = '';
    }
}

// Функция для отображения текущего заказа
function renderOrder() {
    const nothingSelected = document.querySelector('#nothing');
    const orderDetails = document.querySelector('#selectedOrder');

    if (currentOrder.soup || currentOrder.base || currentOrder.juice) {
        nothingSelected.style.display = 'none';
        orderDetails.style.display = 'block';

        updateOrderDetails('soup', currentOrder.soup);
        updateOrderDetails('base', currentOrder.base);
        updateOrderDetails('juice', currentOrder.juice);
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
        juice: document.querySelector('#juice-container')
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
    // Сохраняем выбор в текущем заказе
    currentOrder[dish.category] = dish;

    // Убираем активность со всех карточек в категории
    const categoryCards = document.querySelectorAll(`#${dish.category}-container .menu-item`);
    categoryCards.forEach(card => card.classList.remove('active'));

    // Добавляем класс активности для выбранной карточки
    const selectedCard = Array.from(categoryCards).find(card =>
        card.querySelector('img').src.includes(dish.image)
    );
    if (selectedCard) selectedCard.classList.add('active');

    // Обновляем отображение заказа
    renderOrder();
}

// Функция для сброса выбора
function resetOrder() {
    // Очищаем объект текущего заказа
    currentOrder.soup = null;
    currentOrder.base = null;
    currentOrder.juice = null;

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

// Привязываем обработчики событий и отображаем меню
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    renderOrder();

    document.querySelector('button[type="reset"]').onclick = resetOrder;
    document.querySelector('button[type="submit"]').onclick = submitOrder;
});
