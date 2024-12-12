document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    const closeButton = document.querySelector('.close-button');

    function toggleMenu() {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);

    // Smooth Scroll Animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Grid Items Animation
    const gridItems = document.querySelectorAll('.grid-item');
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    gridItems.forEach(item => observer.observe(item));
});
