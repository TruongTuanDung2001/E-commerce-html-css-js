
/* =========================
   PRODUCT DATA
========================= */

const imageList = [
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600"
];

const productData = [
    ["Premium Dog Food", "Dog Food", "High quality food for adult dogs.", 450000, 550000],
    ["Organic Puppy Food", "Dog Food", "Nutritious food for growing puppies.", 320000, 400000],
    ["BBN Goat's Milk", "Dog Food", "Premium goat milk for dogs.", 250000, 300000],
    ["Chicken Dog Treats", "Dog Food", "Delicious chicken treats.", 120000, 150000],
    ["Salmon Cat Food", "Cat Food", "Healthy salmon food for cats.", 350000, 420000],
    ["Tuna Cat Food", "Cat Food", "Fresh tuna flavor for cats.", 180000, 220000],
    ["Kitten Milk Formula", "Cat Food", "Milk formula for little kittens.", 290000, 350000],
    ["Premium Cat Snacks", "Cat Food", "Crunchy snacks for cats.", 95000, 120000],
    ["Interactive Dog Toy", "Toys", "Fun interactive toy for dogs.", 150000, 190000],
    ["Cat Feather Toy", "Toys", "Feather toy to entertain cats.", 75000, 90000],
    ["Rubber Chew Toy", "Toys", "Durable chewing toy for dogs.", 110000, 140000],
    ["Pet Ball Set", "Toys", "Colorful balls for playful pets.", 80000, 100000],
    ["Pet Travel Bag", "Accessories", "Comfortable pet travel bag.", 650000, 750000],
    ["Dog Collar Premium", "Accessories", "Stylish adjustable dog collar.", 180000, 220000],
    ["Pet Feeding Bowl", "Accessories", "Stainless steel feeding bowl.", 130000, 160000],
    ["Pet Sleeping Bed", "Accessories", "Soft and comfortable pet bed.", 550000, 650000],
    ["Pet Shampoo", "Healthcare", "Gentle shampoo for pet skin.", 160000, 200000],
    ["Pet Dental Care", "Healthcare", "Daily dental care for pets.", 210000, 260000],
    ["Flea Protection", "Healthcare", "Pet hygiene and flea care.", 380000, 450000],
    ["Pet Grooming Brush", "Healthcare", "Professional grooming brush.", 140000, 175000],
    ["Dog Food Premium Plus", "Dog Food", "Complete nutrition for adult dogs.", 680000, 800000],
    ["Cat Food Indoor", "Cat Food", "Balanced food for indoor cats.", 520000, 620000],
    ["Automatic Pet Feeder", "Accessories", "Convenient automatic feeding.", 1250000, 1500000],
    ["Pet Health Kit", "Healthcare", "Essential daily pet care kit.", 850000, 1000000]
];

const products = productData.map((item, index) => ({
    id: index + 1,
    name: item[0],
    category: item[1],
    description: item[2],
    price: item[3],
    oldPrice: item[4],
    image: imageList[index % imageList.length],
    isFavorite: false
}));


/* =========================
   DOM ELEMENTS
========================= */

const productsGrid = document.getElementById("productsGrid");

const searchInput = document.getElementById("searchInput");

const priceRange = document.getElementById("priceRange");

const maxPrice = document.getElementById("maxPrice");

const categoryFilters = document.querySelectorAll(".category-filter");

const wishlistOnly = document.getElementById("wishlistOnly");

const applyFilter = document.getElementById("applyFilter");

const resetFilter = document.getElementById("resetFilter");

const sortProducts = document.getElementById("sortProducts");

const resultCount = document.getElementById("resultCount");

const pagination = document.getElementById("pagination");

const pageNumbers = document.getElementById("pageNumbers");

const prevPage = document.getElementById("prevPage");

const nextPage = document.getElementById("nextPage");

const emptyProducts = document.getElementById("emptyProducts");


/* =========================
   STATE
========================= */

let currentPage = 1;

const productsPerPage = 6;

let filteredProducts = [...products];

let activeFilters = {
    maxPrice: 2000000,
    categories: [],
    wishlistOnly: false
};


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


/* =========================
   PRICE RANGE
========================= */

priceRange.addEventListener("input", () => {
    
    maxPrice.textContent = formatPrice(
        Number(priceRange.value)
    );

});


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts() {

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    filteredProducts = products.filter(product => {

        // Search
        const matchSearch =
            product.name.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword);

        // Price
        const matchPrice =
            product.price <= activeFilters.maxPrice;

        // Category
        const matchCategory =
            activeFilters.categories.length === 0 ||
            activeFilters.categories.includes(product.category);

        // Wishlist
        const matchWishlist =
            !activeFilters.wishlistOnly ||
            product.isFavorite;

        return (
            matchSearch &&
            matchPrice &&
            matchCategory &&
            matchWishlist
        );

    });

    // Sort
    const sortValue = sortProducts.value;

    if (sortValue === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sortValue === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    } else if (sortValue === "name") {

        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    currentPage = 1;

    renderProducts();

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

    productsGrid.innerHTML = "";

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const endIndex =
        startIndex + productsPerPage;

    const currentProducts =
        filteredProducts.slice(startIndex, endIndex);

    resultCount.textContent = filteredProducts.length;

    emptyProducts.style.display =
        filteredProducts.length === 0 ? "block" : "none";

    pagination.style.display =
        filteredProducts.length === 0 ? "none" : "flex";


    currentProducts.forEach(product => {

        const discount = Math.round(
            (1 - product.price / product.oldPrice) * 100
        );

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}" loading="lazy">

                <span class="sale-badge">-${discount}%</span>

                <button
                    class="favorite-btn ${product.isFavorite ? "active" : ""}"
                    data-id="${product.id}"
                    aria-label="Add to wishlist"
                >
                    ${product.isFavorite ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">

                    <span class="current-price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="old-price">
                        ${formatPrice(product.oldPrice)}
                    </span>

                </div>

                <button class="buy-btn" data-id="${product.id}">
                    Add to Cart
                </button>

            </div>

        `;

        productsGrid.appendChild(card);

    });

    renderPagination();

}


/* =========================
   PAGINATION
========================= */

function renderPagination() {

    pageNumbers.innerHTML = "";

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    prevPage.disabled = currentPage === 1;

    nextPage.disabled = currentPage === totalPages;

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.className = "page-number";

        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            currentPage = i;

            renderProducts();

        });

        pageNumbers.appendChild(button);

    }

}


/* PREVIOUS PAGE */

prevPage.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderProducts();

    }

});


/* NEXT PAGE */

nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        renderProducts();

    }

});


/* =========================
   APPLY FILTER
========================= */

applyFilter.addEventListener("click", () => {

    activeFilters.maxPrice = Number(priceRange.value);

    activeFilters.categories = Array.from(categoryFilters)
        .filter(input => input.checked)
        .map(input => input.value);

    activeFilters.wishlistOnly = wishlistOnly.checked;

    filterProducts();

});


/* =========================
   RESET FILTER
========================= */

resetFilter.addEventListener("click", () => {

    priceRange.value = 2000000;

    maxPrice.textContent = formatPrice(2000000);

    categoryFilters.forEach(input => {
        input.checked = false;
    });

    wishlistOnly.checked = false;

    searchInput.value = "";

    sortProducts.value = "default";

    activeFilters = {
        maxPrice: 2000000,
        categories: [],
        wishlistOnly: false
    };

    filterProducts();

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

    filterProducts();

});


/* =========================
   SORT
========================= */

sortProducts.addEventListener("change", () => {

    filterProducts();

});


/* =========================
   FAVORITE + BUY
========================= */

productsGrid.addEventListener("click", (e) => {

    // Favorite
    const favoriteBtn = e.target.closest(".favorite-btn");

    if (favoriteBtn) {

        const productId = Number(favoriteBtn.dataset.id);

        const product = products.find(
            item => item.id === productId
        );

        product.isFavorite = !product.isFavorite;

        filterProducts();

        return;

    }

    // Buy
    const buyBtn = e.target.closest(".buy-btn");

    if (buyBtn) {

        const productId = Number(buyBtn.dataset.id);

        const product = products.find(
            item => item.id === productId
        );

        alert(`Added ${product.name} to cart!`);

    }

});


/* =========================
   INITIAL RENDER
========================= */

maxPrice.textContent = formatPrice(2000000);

renderProducts();
