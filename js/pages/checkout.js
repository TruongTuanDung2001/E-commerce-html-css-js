/*
    {
        id: 1,
        name: "Premium Dog Food",
        image: "./assets/dog-food.jpg",
        price: 450000,
        sale: 50000,
        quantity: 2
    }
 */

/* =========================
   DOM ELEMENTS
========================= */

const checkoutForm = document.getElementById("checkoutForm");

const orderProducts = document.getElementById("orderProducts");

const orderCount = document.getElementById("orderCount");

const subtotalEl = document.getElementById("subtotal");

const shippingFeeEl = document.getElementById("shippingFee");

const discountEl = document.getElementById("discount");

const grandTotalEl = document.getElementById("grandTotal");

const confirmBtn = document.getElementById("confirmBtn");

const paymentOptions = document.querySelectorAll(
    'input[name="payment"]'
);


/* =========================
   GET CART DATA
========================= */

// Lấy những sản phẩm được chọn từ Cart Page

let checkoutItems = JSON.parse(
    localStorage.getItem("checkoutItems")
) || [];


/* =========================
   SHIPPING FEE
========================= */

const SHIPPING_FEE = 30000;


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


/* =========================
   RENDER ORDER PRODUCTS
========================= */

function renderOrderProducts() {

    orderProducts.innerHTML = "";

    if (checkoutItems.length === 0) {

        orderProducts.innerHTML = `
            <div class="empty-order">
                <p>Your cart is empty!</p>
                <p>Please return to your cart.</p>
            </div>
        `;

        confirmBtn.disabled = true;

        orderCount.textContent = "0 items";

        updateOrderTotal();

        return;

    }

    confirmBtn.disabled = false;

    checkoutItems.forEach(product => {

        const productTotal =
            (product.price - product.sale) * product.quantity;

        const productEl = document.createElement("div");

        productEl.className = "order-product";

        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;

        const info = document.createElement("div");

        info.className = "order-product-info";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const quantity = document.createElement("span");
        quantity.textContent = `Quantity: x${product.quantity}`;

        info.append(name, quantity);

        const price = document.createElement("div");

        price.className = "order-product-price";

        const total = document.createElement("strong");
        total.textContent = formatPrice(productTotal);

        const unitPrice = document.createElement("small");
        unitPrice.textContent = `x${product.quantity}`;

        price.append(total, unitPrice);

        productEl.append(image, info, price);

        orderProducts.appendChild(productEl);

    });

    const totalQuantity = checkoutItems.reduce(
        (total, product) => total + product.quantity,
        0
    );

    orderCount.textContent = `${totalQuantity} items`;

    updateOrderTotal();

}


/* =========================
   CALCULATE ORDER TOTAL
========================= */

function updateOrderTotal() {

    let subtotal = 0;

    let discount = 0;

    checkoutItems.forEach(product => {

        subtotal += product.price * product.quantity;

        discount += product.sale * product.quantity;

    });

    const shipping = checkoutItems.length > 0
        ? SHIPPING_FEE
        : 0;

    const grandTotal = subtotal - discount + shipping;

    subtotalEl.textContent = formatPrice(subtotal);

    discountEl.textContent = "-" + formatPrice(discount);

    shippingFeeEl.textContent = formatPrice(shipping);

    grandTotalEl.textContent = formatPrice(grandTotal);

}


/* =========================
   PAYMENT METHOD
========================= */

paymentOptions.forEach(option => {

    option.addEventListener("change", () => {

        document.querySelectorAll(".payment-option").forEach(item => {

            item.classList.remove("active");

        });

        option.closest(".payment-option").classList.add("active");

    });

});


/* =========================
   FORM VALIDATION
========================= */

function validateForm() {

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const address = document.getElementById("address").value.trim();

    if (!fullName || !email || !phone || !address) {

        alert("Please complete all required information!");

        return false;

    }

    const phoneRegex = /^[0-9]{9,11}$/;

    if (!phoneRegex.test(phone)) {

        alert("Please enter a valid phone number!");

        return false;

    }

    return true;

}


/* =========================
   CONFIRM ORDER
========================= */

checkoutForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (checkoutItems.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    if (!validateForm()) return;

    const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    const subtotal = checkoutItems.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );

    const discount = checkoutItems.reduce(
        (total, product) =>
            total + product.sale * product.quantity,
        0
    );

    const totalPayment =
        subtotal - discount + SHIPPING_FEE;

    const order = {

        orderId: "PET" + Date.now(),

        customer: {

            fullName: document.getElementById("fullName").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            address: document.getElementById("address").value.trim(),

            company: document.getElementById("company").value.trim()

        },

        products: checkoutItems,

        paymentMethod,

        subtotal,

        discount,

        shippingFee: SHIPPING_FEE,

        totalPayment,

        status: "Pending",

        createdAt: new Date().toISOString()

    };


    // Save order
    const orders = JSON.parse(
        localStorage.getItem("orders")
    ) || [];

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // Remove checked products from cart
    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const purchasedIds = checkoutItems.map(
        product => product.id
    );

    const remainingCart = cart.filter(
        product => !purchasedIds.includes(product.id)
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(remainingCart)
    );


    // Clear checkout data
    localStorage.removeItem("checkoutItems");


    alert(
        `Order placed successfully!\n` +
        `Order ID: ${order.orderId}\n` +
        `Total: ${formatPrice(totalPayment)}`
    );

    // Sau này có thể chuyển sang order-success.html
    // window.location.href = "./order-success.html";

});


/* =========================
   INITIALIZE
========================= */

renderOrderProducts();
