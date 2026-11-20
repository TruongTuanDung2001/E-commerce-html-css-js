
import { getProducts } from './services/productService.js';

// load header
async function loadHeader() {
    try {
        const response = await fetch("./components/header.html");

        if (!response.ok) {
            throw new Error("Cannot load header");
        }

        const html = await response.text();

        document.querySelector("#header").innerHTML = html;

    } catch (error) {
        console.error("Error loading header:", error);
    }
}

loadHeader();

// load footer
async function loadFooter() {
    try {
        const response = await fetch("./components/footer.html");

        if (!response.ok) {
            throw new Error("Cannot load footer");
        }

        const html = await response.text();

        document.querySelector("#footer").innerHTML = html;

    } catch (error) {
        console.error("Error loading footer:", error);
    }
}
loadFooter();

//
const slides = document.querySelectorAll(".slider__image");

const prevBtn = document.querySelector(".slider__prev");
const nextBtn = document.querySelector(".slider__next");

const dotsContainer = document.querySelector(".slider__dots");

let currentIndex = 0;

// Create dots
slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("slider__dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".slider__dot");

// Show slide
function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

// Next slide
nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
});

// Previous slide
prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    showSlide(currentIndex);
});


// PRODUCT SECTION


function initProductSliders() {
    const productSections = document.querySelectorAll(".product-section");

    productSections.forEach(section => {
        const slider = section.querySelector(".product-slider");
        const track = section.querySelector(".product-track");

        const products = track.querySelectorAll(".product-item");

        const prevBtn = section.querySelector(".slider-btn.prev");
        const nextBtn = section.querySelector(".slider-btn.next");

        // Không có sản phẩm thì không khởi tạo slider
        if (!slider || !track || products.length === 0 || !prevBtn || !nextBtn) {
            return;
        }

        let currentIndex = 0;

        function updateSlider() {
            const sliderWidth = slider.clientWidth;
            const productWidth = products[0].offsetWidth;

            const gap = parseFloat(getComputedStyle(track).gap) || 0;

            const visibleCount = Math.max(
                1,
                Math.floor((sliderWidth + gap) / (productWidth + gap))
            );

            const maxIndex = Math.max(0, products.length - visibleCount);

            currentIndex = Math.min(currentIndex, maxIndex);

            const currentTranslate =
                products[currentIndex].offsetLeft - products[0].offsetLeft;

            track.style.transform = `translateX(-${currentTranslate}px)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        nextBtn.addEventListener("click", () => {
            currentIndex++;
            updateSlider();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex--;
            updateSlider();
        });

        window.addEventListener("resize", updateSlider);

        updateSlider();
    });
}



// Handle from contact section 

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name.trim() || !email.trim() || !message.trim()) {
        alert("Please fill in all required fields!");
        return;
    }

    alert("Thank you! Your message has been received.");

    contactForm.reset();
});


// get data products api
async function initProducts() {
    const products = await getProducts();

    console.log(products);

    const track = document.querySelector(".product-track");

    if (!track) return;

    track.innerHTML = "";

    products.forEach(p => {
        track.innerHTML += `
            <a href="#" class="product-item">
                <div class="product-image">
                    <span class="product-badge">Trending</span>
                    <img src="${p.image}" alt="${p.name}" />
                </div>

                <div class="product-info">
                    <span class="product-category">${p.category}</span>

                    <h3 class="product-name">${p.name}</h3>

                    <p class="product-description">
                        ${p.description}
                    </p>

                    <div class="product-bottom">
                        <span class="product-price">
                            ${Number(p.price).toLocaleString("vi-VN")}đ
                        </span>

                        <span class="buy-btn">Buy Now</span>
                    </div>
                </div>
            </a>
        `;
    });

    // Chỉ khởi tạo slider sau khi render xong sản phẩm
    initProductSliders();
}

initProducts();
