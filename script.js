const items = [{
        title: "Шкатулка для украшений",
        description: "Отличный подарок для девушек и женщин на любой праздник! ",
        tags: ["women"],
        price: 125,
        img: "./img/1.jpg",
        rating: 4.8,
    },
    {
        title: "Набор для вина",
        description: "Набор для вина станет отличным дополнением к подарочному вину.",
        tags: ["man", "women"],
        price: 38,
        img: "./img/2.jpg",
        rating: 4.4,
    },
    {
        title: "Магнитные песочные часы",
        description: "Элегантное украшение интерьера, релаксант, помогающий снять мысленное напряжение, и весьма нестандартный подарок.",
        tags: ["man", "women", "children"],
        price: 25,
        img: "./img/3.jpg",
        rating: 4.5,
    },
    {
        title: "Столик для завтрака",
        description: "Практичный столик для завтрака в постель. Так же может использоваться как столик для ноутбука.",
        tags: ["man", "women"],
        price: 70,
        img: "./img/4.jpg",
        rating: 4.2,
    },
    {
        title: "Кружка Самомешалка зеленая",
        description: "Подарок тем, кто не любит бродить по офису в поисках чистой ложечки, но и пальцем размешивать сахар почему-то не хочет!",
        tags: ["man", "women"],
        price: 30,
        img: "./img/5.jpg",
        rating: 4.7,
    },
    {
        title: "Набор отверток",
        description: "Это плоские, крестообразные и многогранные наконечники, которые помогут Вам в любой ситуации.",
        tags: ["man"],
        price: 15,
        img: "./img/6.jpg",
        rating: 4.3,
    },
    {
        title: "Колонка синяя",
        description: "Качественное музыкальное беспроводное устройство, которое легко превращает серую рутину в яркий праздник.",
        tags: ["man", "women"],
        price: 70,
        img: "./img/7.jpg",
        rating: 4.9,
    },
    {
        title: "Шар головоломка 100 шагов",
        description: "Развивает внимание, пространственное мышление, ловкость, твердость руки и терпение.",
        tags: ["children"],
        price: 40,
        img: "./img/8.jpg",
        rating: 4.5,
    },
    {
        title: "Дорожный набор для сна",
        description: "Надувная подушка, маска для сна, беруши.",
        tags: ["man", "women"],
        price: 25,
        img: "./img/9.jpg",
        rating: 4.0,
    },
    {
        title: "Кружка хамелеон",
        description: "Оригинальная керамическая кружка с цветной шкалой индикатора, позволяющая проследить за температурой горячего напитка.",
        tags: ["man", "women"],
        price: 43,
        img: "./img/10.jpg",
        rating: 4.2,
    },
    {
        title: "Часы будильник",
        description: "Чтобы утро было по-настоящему добрым, встречайте его с весёлым будильником.",
        tags: ["man", "women", "children"],
        price: 36,
        img: "./img/11.jpg",
        rating: 4.6,
    },
    {
        title: "Электронная копилка банкомат-сейф",
        description: "Отличная семейная интерактивная копилка, подарок для детей и взрослых.",
        tags: ["man", "women", "children"],
        price: 120,
        img: "./img/12.jpg",
        rating: 4.8,
    },
];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} руб`;

    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });
    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
})

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}
searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);