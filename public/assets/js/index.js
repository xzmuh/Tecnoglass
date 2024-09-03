document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');

    let currentIndex = 0;

    function showSlide(index) {
        const slideWidth = slides[0].clientWidth;
        sliderWrapper.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < slides.length - 4) { // 4 slides visíveis
            currentIndex++;
            showSlide(currentIndex);
        }
    });
});

let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider-slide');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

document.querySelector('.slider-container').addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slider-container').addEventListener('mouseout', () => {
    slideInterval = setInterval(nextSlide, 3000);
});
