
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
