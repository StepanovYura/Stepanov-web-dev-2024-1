"use strict";
"createArray.js";

let order = {
    selSoup: null,
    selBase: null,
    selDrink: null
};

//Функция подсчета конечной цены
function finalPrice() {
    const finalPrice = document.getElementById('final');
    let final = 0;

    if (order.selSoup) { 
        final += order.selSoup.price;
    };
    if (order.selBase) { 
        final += order.selBase.price;
    };
    if (order.selDrink) { 
        final += order.selDrink.price;
    };
    finalPrice.textContent = `${final}₽`;
};

//Функция для отображения блюд в заказе
function updateDisplay() {
    const noSelection = document.getElementById('nothing');
    const selectedOrder = document.getElementById('selectedOrder');

    if (order.selSoup || order.selDrink || order.selBase) {
        noSelection.style.display = 'none';
        selectedOrder.style.display = 'flex';
        finalPrice();
    } 
    else {
        noSelection.style.display = 'block';
        selectedOrder.style.display = 'none';
    }
};

// Функция для добавления блюда в заказ
function selectDish(keyword) {
    const selectedDish = arr.find(dish => dish.keyword === keyword);

    if (selectedDish.category === 'soup') {
        order.selSoup = selectedDish;
        document.getElementById("soup-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'base') {
        order.selBase = selectedDish;
        document.getElementById("base-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'drink') {
        order.selDrink = selectedDish;
        document.getElementById("drink-select-no").textContent =
         selectedDish.name + ' - ' + selectedDish.price + '₽';
    }

    updateDisplay();
};

// Функция для отображения блюд
function displayDishes() {
    const sortedDishes = arr.sort((a, b) => a.name.localeCompare(b.name));
    
    const dishSections = document.querySelectorAll('.dishes');
    
    sortedDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);

        dishCard.innerHTML = `
            <img src='${dish.image}' alt='${dish.name}'>
            <p class='price'>${dish.price} ₽</p>
            <p class='name'>${dish.name}</p>
            <p class='weight'>${dish.count}</p>
            <button>Добавить</button>
        `;

        if (dish.category === 'soup') { 
            dishSections[0].append(dishCard);
        } 
        else if (dish.category === 'base') {
            dishSections[1].append(dishCard);
        } 
        else if (dish.category === 'drink') {
            dishSections[2].append(dishCard);
        }
       
        dishCard.querySelector('button').onclick =
         () => selectDish(dishCard.getAttribute('data-dish'));
        
    });
};

document.addEventListener("DOMContentLoaded", displayDishes);

document.getElementById('resetButton').onclick = function() {
    order.selSoup = null;
    order.selBase = null;
    order.selDrink = null;
    updateDisplay();
};

document.getElementById('submitButton').onclick = function(event) {
    const soupValue = document.getElementById('hiddenSoup');
    const mainValue = document.getElementById('hiddenMain');
    const drinkValue = document.getElementById('hiddenDrink');
    if (order.selSoup) {
        soupValue.value = order.selSoup.keyword;
    }
    if (order.selBase) {
        mainValue.value = order.selBase.keyword;
    }
    if (order.selDrink) {
        drinkValue.value = order.selDrink.keyword;
    }
};