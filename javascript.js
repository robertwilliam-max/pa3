document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Comprobación de existencia para evitar errores si el HTML está incompleto
    if (!carouselInner || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 6000; // 6 segundos para un avance visible

    // Crear los puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        // Aplica la transición suave
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar la clase 'active' en los puntos
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextSlide, slideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Event Listeners
    nextBtn.addEventListener('click', showNextSlide);
    prevBtn.addEventListener('click', showPrevSlide);
    carouselInner.addEventListener('mouseenter', stopAutoSlide);
    carouselInner.addEventListener('mouseleave', startAutoSlide);

    // Iniciar el carrusel automático
    startAutoSlide();
});