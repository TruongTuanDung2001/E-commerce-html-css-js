
const thumbnails = document.querySelectorAll(".thumbnail");

const thumbnailTrack = document.getElementById("thumbnailTrack");

const mainImage = document.getElementById("mainImage");

const zoomContainer = document.getElementById("zoomContainer");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const buyBtn = document.getElementById("buyBtn");


// GALLERY

let currentIndex = 0;

const visibleImages = 3;

const totalImages = thumbnails.length;


function updateGallery() {

    // Update thumbnail active
    thumbnails.forEach((thumbnail, index) => {

        thumbnail.classList.toggle(
            "active",
            index === currentIndex
        );

    });

    // Update main image
    mainImage.src = thumbnails[currentIndex].src;

    // Reset zoom
    mainImage.style.transform = "scale(1)";
    mainImage.style.transformOrigin = "center center";

    // Calculate thumbnail position
    const thumbnailHeight = thumbnails[0].offsetHeight;

    const gap = 15;

    const translateY =
        Math.min(
            currentIndex,
            totalImages - visibleImages
        ) * (thumbnailHeight + gap);

    thumbnailTrack.style.transform =
        `translateY(-${translateY}px)`;

    // Disable buttons at boundaries
    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled =
        currentIndex === totalImages - 1;

}


// Previous image

prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {

        currentIndex--;

        updateGallery();

    }

});


// Next image

nextBtn.addEventListener("click", () => {

    if (currentIndex < totalImages - 1) {

        currentIndex++;

        updateGallery();

    }

});


// Click thumbnail

thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener("click", () => {

        currentIndex = index;

        updateGallery();

    });

});


// IMAGE ZOOM

zoomContainer.addEventListener("mousemove", (e) => {

    const rect = zoomContainer.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;

    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mainImage.style.transformOrigin = `${x}% ${y}%`;

    mainImage.style.transform = "scale(2)";

});


zoomContainer.addEventListener("mouseleave", () => {

    mainImage.style.transform = "scale(1)";

    mainImage.style.transformOrigin = "center center";

});


// FAVORITE

favoriteBtn.addEventListener("click", () => {

    favoriteBtn.classList.toggle("active");

    favoriteBtn.innerHTML =
        favoriteBtn.classList.contains("active")
        ? "♥"
        : "♡";

});


// SELECT SIZE

const sizeButtons = document.querySelectorAll(".size-list button");

sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

    });

});


// BUY NOW

buyBtn.addEventListener("click", () => {

    const selectedSize = document.querySelector(
        ".size-list button.selected"
    );

    if (!selectedSize) {
        alert("Please select a size!");
        return;
    }

    alert(
        `You selected size ${selectedSize.textContent}`
    );

});


// Initial render

updateGallery();
