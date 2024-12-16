"use strict";
// Массив с данными о блюдах
const dishes = [
    { keyword: "gaspacho", name: "Гаспачо", price: 195, category: "soup", count: "350 г", image: "gazpacho.jpg", kind: "veg" },
    { keyword: "mushroom", name: "Грибной суп-пюре", price: 185, category: "soup", count: "330 г", image: "mushroom_soup.jpg", kind: "veg" },
    { keyword: "chicken_soup", name: "Куриный суп", price: 330, category: "soup", count: "350 г", image: "chicken.jpg", kind: "meat" },
    { keyword: "ramen", name: "Рамен", price: 375, category: "soup", count: "425 г", image: "ramen.jpg", kind: "meat" },
    { keyword: "norwegian", name: "Норвежский суп", price: 270, category: "soup", count: "330 г", image: "norwegian_soup.jpg", kind: "fish" },
    { keyword: "tomyum", name: "Том ям с креветками", price: 650, category: "soup", count: "500 г", image: "tomyum.jpg", kind: "fish" },

    { keyword: "potatoesmush", name: "Жареная картошка с грибами", price: 150, category: "base", count: "250 г", image: "potatoesmushrooms.jpg", kind: "veg" },
    { keyword: "pizza", name: "Пицца Маргарита", price: 450, category: "base", count: "470 г", image: "pizza.jpg", kind: "veg" },
    { keyword: "lasagna", name: "Лазанья", price: 385, category: "base", count: "310 г", image: "lasagna.jpg", kind: "meat" },
    { keyword: "chicken", name: "Котлеты из курицы с картофельным пюре", price: 225, category: "base", count: "280 г", image: "chickencutlet.jpg", kind: "meat" },
    { keyword: "fishrise", name: "Рыбнаяя котлета с рисом и спаржей", price: 320, category: "base", count: "270 г", image: "fishrice.jpg", kind: "fish" },
    { keyword: "pasta", name: "Паста с креветками", price: 340, category: "base", count: "280 г", image: "shrimppasta.jpg", kind: "fish" },

    { keyword: "koreya", name: "Корейский салат с овощами и яйцом", price: 330, category: "salat", count: "250 г", image: "saladwithegg.jpg", kind: "veg" },
    { keyword: "caprese", name: "Капрезе с моцареллой", price: 350, category: "salat", count: "235 г", image: "caprese.jpg", kind: "veg" },
    { keyword: "caesarfree", name: "Картофель фри с соусом Цезарь", price: 280, category: "salat", count: "235 г", image: "frenchfries1.jpg", kind: "veg" },
    { keyword: "tomatofree", name: "Картофель фри с кетчупом", price: 260, category: "salat", count: "235 г", image: "frenchfries2.jpg", kind: "veg" },
    { keyword: "caesar", name: "Цезарь с цыплёнком", price: 370, category: "salat", count: "220 г", image: "caesar.jpg", kind: "meat" },
    { keyword: "tunec", name: "Салат с тунцом", price: 480, category: "salat", count: "250 г", image: "tunasalad.jpg", kind: "fish" },

    { keyword: "kapuchino", name: "Капучино", price: 180, category: "juice", count: "300 мл", image: "cappuccino.jpg", kind: "hot" },
    { keyword: "greentea", name: "Зелёный чай", price: 100, category: "juice", count: "300 мл", image: "greentea.jpg", kind: "hot" },
    { keyword: "blacktea", name: "Чёрный чай", price: 90, category: "juice", count: "300 мл", image: "tea.jpg", kind: "hot" },
    { keyword: "orange", name: "Апельсиновый сок", price: 120, category: "juice", count: "300 мл", image: "orangejuice.jpg", kind: "cold" },
    { keyword: "apple", name: "Яблочный сок", price: 90, category: "juice", count: "300 мл", image: "applejuice.jpg", kind: "cold" },
    { keyword: "carrot", name: "Морковный сок", price: 110, category: "juice", count: "300 мл", image: "carrotjuice.jpg", kind: "cold" },

    { keyword: "cheescake", name: "Чизкейк", price: 240, category: "desert", count: "125 г", image: "checheesecake.jpg", kind: "small" },
    { keyword: "chocolatecheescake", name: "Шоколадный чизкейк", price: 260, category: "desert", count: "125 г", image: "chocolatecheesecake.jpg", kind: "small" },
    { keyword: "chocolate", name: "Шоколадный торт", price: 270, category: "desert", count: "140 г", image: "chocolatecake.jpg", kind: "small" },
    { keyword: "pachlava", name: "Пахлава", price: 220, category: "desert", count: "300 г", image: "baklava.jpg", kind: "midle" },
    { keyword: "donatemin", name: "Пончики (3 штуки)", price: 410, category: "desert", count: "350 г", image: "donuts2.jpg", kind: "midle" },
    { keyword: "donatemax", name: "Пончики (6 штук)", price: 650, category: "desert", count: "700 г", image: "donuts.jpg", kind: "big" }
];