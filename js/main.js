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

const productSections = document.querySelectorAll(".product-section");

productSections.forEach(section => {
    const slider = section.querySelector(".product-slider");
    const track = section.querySelector(".product-track");

    const products = track.querySelectorAll(".product-item");

    const prevBtn = section.querySelector(".slider-btn.prev");
    const nextBtn = section.querySelector(".slider-btn.next");

    let currentIndex = 0;

    // Update slider
    function updateSlider() {
        const sliderWidth = slider.clientWidth;

        const lastProduct = products[products.length - 1];

        const maxTranslate =
            lastProduct.offsetLeft + lastProduct.offsetWidth -
            products[0].offsetLeft - sliderWidth;

        const currentTranslate =
            products[currentIndex].offsetLeft -
            products[0].offsetLeft;

        track.style.transform =
            `translateX(-${Math.min(currentTranslate, maxTranslate)}px)`;

        // Update buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === products.length -
            Math.floor(sliderWidth / products[0].offsetWidth);
    }

    // Next
    nextBtn.addEventListener("click", () => {
        const visibleCount = Math.floor(
            slider.clientWidth /
            (products[0].offsetWidth + parseFloat(getComputedStyle(track).gap))
        );

        const maxIndex = products.length - Math.max(1, visibleCount);

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Previous
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Responsive
    window.addEventListener("resize", () => {
        currentIndex = 0;
        updateSlider();
    });

    updateSlider();
});



// Handle from contact section 

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {
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


