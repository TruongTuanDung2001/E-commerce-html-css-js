
/* =========================
   DOM ELEMENTS
========================= */

const cartItems = document.getElementById("cartItems");

const selectedCount = document.getElementById("selectedCount");

const grandTotal = document.getElementById("grandTotal");

const checkoutBtn = document.getElementById("checkoutBtn");


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const rows = document.querySelectorAll(".cart-row");

    let totalSelected = 0;

    let totalPayment = 0;

    rows.forEach(row => {

        const checkbox = row.querySelector(".product-checkbox");

        const quantityInput = row.querySelector(".quantity-input");

        const price = Number(
            row.querySelector(".price").dataset.price
        );

        const sale = Number(
            row.querySelector(".sale").dataset.sale
        );

        const quantity = Math.max(
            1,
            Number(quantityInput.value) || 1
        );

        // Update quantity
        quantityInput.value = quantity;

        // Calculate product total
        const productTotal =
            (price - sale) * quantity;

        row.querySelector(".item-total").textContent =
            formatPrice(productTotal);

        // Calculate selected products
        if (checkbox.checked) {

            totalSelected++;

            totalPayment += productTotal;

        }

    });


    // Update summary
    selectedCount.textContent = totalSelected;

    grandTotal.textContent = formatPrice(totalPayment);

    // Disable checkout if nothing selected
    checkoutBtn.disabled = totalSelected === 0;

}


/* =========================
   QUANTITY BUTTONS
========================= */

cartItems.addEventListener("click", (e) => {

    const row = e.target.closest(".cart-row");

    if (!row) return;

    const quantityInput =
        row.querySelector(".quantity-input");

    let quantity = Number(quantityInput.value) || 1;

    // Decrease
    if (e.target.classList.contains("decrease")) {

        if (quantity > 1) {

            quantity--;

        }

    }

    // Increase
    if (e.target.classList.contains("increase")) {

        quantity++;

    }

    quantityInput.value = quantity;

    updateCart();

});


/* =========================
   INPUT QUANTITY
========================= */

cartItems.addEventListener("change", (e) => {

    if (e.target.classList.contains("quantity-input")) {

        const quantity = Math.max(
            1,
            Math.floor(Number(e.target.value) || 1)
        );

        e.target.value = quantity;

        updateCart();

    }

});


/* =========================
   SELECT PRODUCT
========================= */

cartItems.addEventListener("change", (e) => {

    if (e.target.classList.contains("product-checkbox")) {

        updateCart();

    }

});


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", () => {

    const selectedRows = document.querySelectorAll(
        ".cart-row .product-checkbox:checked"
    );

    if (selectedRows.length === 0) {

        alert("Please select at least one product!");

        return;

    }

    alert(
        `You selected ${selectedRows.length} products.\n` +
        `Total payment: ${grandTotal.textContent}`
    );

    // Later:
    // window.location.href = "./checkout.html";

});


/* =========================
   INITIALIZE
========================= */

updateCart();
