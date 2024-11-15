let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;

function showSlide(index) {
    const slideWidth = slides[0].clientWidth;
    const newTransformValue = -index * slideWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(${newTransformValue}px)`;
}

function moveSlide(step) {
    slideIndex = (slideIndex + step + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Auto slide every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);

// Initial display
showSlide(slideIndex);

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("open");
}


