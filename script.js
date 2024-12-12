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
    closeButton?.addEventListener('click', toggleMenu);

    // Smooth Scroll Animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator?.addEventListener('click', () => {
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

    // Sprint Reports Expansion
    const reportHeaders = document.querySelectorAll('.report-header');
    console.log('Found report headers:', reportHeaders.length);

    reportHeaders.forEach(header => {
        header.addEventListener('click', function() {
            console.log('Header clicked');
            const content = this.nextElementSibling;
            const expandBtn = this.querySelector('.expand-btn');
            
            // Toggle active class
            content.classList.toggle('active');
            expandBtn.classList.toggle('active');
            
            // Adjust button text
            expandBtn.textContent = expandBtn.classList.contains('active') ? '×' : '+';
        });

        // Also add click handler to the expand button specifically
        const expandBtn = header.querySelector('.expand-btn');
        expandBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent double-triggering
            const content = this.closest('.report-card').querySelector('.report-content');
            
            // Toggle active class
            content.classList.toggle('active');
            this.classList.toggle('active');
            
            // Adjust button text
            this.textContent = this.classList.contains('active') ? '×' : '+';
        });
    });

    // Magazine Image Scatter
    const imageScatter = document.querySelector('.image-scatter');
    if (imageScatter) {
        // Function to shuffle array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const images = shuffleArray([
            // All numbered images (excluding deleted ones)
            ...Array.from({length: 83}, (_, i) => `higher ${i + 1}.png`)
                .filter(img => img !== 'higher 67.png' && 
                             img !== 'higher 48.png' && 
                             img !== 'higher 78.png' &&
                             img !== 'higher 46.png'),
            // Special named images
            'All-Bit-No-Bark.png',
            'All-White-Alligator.png',
            'Anything-Is-Possible.png',
            'Cozy-Corner.png',
            'Green-Mountains-W-Copy.png',
            'Higher-X-Balenciaga.png',
            'Higher-X-Blonde.png',
            'Higher-X-LEFLEUR.png',
            'Higher-X-Tesla.png',
            'Horsepower.png',
            'Keep-Going.png',
            'Meta-Ad-Of-First-Four-Ads.png',
            'Now.png',
            'Power-Horse.png',
            'Put-Up-Or-Shut-Up.png',
            'Running-Higher+.png',
            'Spiritual-Deer-In-Pond.png',
            'Tallest-Horse.png',
            'cosmos-source-ad.gif',
            'h+modular.gif',
            'horses.gif'
        ]);

        let activeImage = null;
        let initialX = 0;
        let initialY = 0;
        let startX = 0;
        let startY = 0;

        // Function to get random position within bounds
        function getRandomPosition(element, container) {
            const containerRect = container.getBoundingClientRect();
            const maxX = containerRect.width - element.offsetWidth;
            const maxY = Math.max(containerRect.height * 2, 2000) - element.offsetHeight;
            
            // Add some padding to keep images from touching edges
            const padding = 20;
            return {
                x: padding + Math.random() * (maxX - padding * 2),
                y: padding + Math.random() * (maxY - padding * 2)
            };
        }

        // Function to get random rotation
        function getRandomRotation() {
            return Math.random() * 30 - 15;
        }

        // Function to get random size
        function getRandomSize() {
            return Math.random() * 300 + 200; // Between 200px and 500px
        }

        // Create and position images
        images.forEach((imageName, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'draggable-image';
            wrapper.style.zIndex = index;

            const img = document.createElement('img');
            img.src = `images/${imageName}`;
            img.alt = imageName.replace('.png', '').replace(/-/g, ' ');
            img.draggable = false; // Prevent image dragging

            wrapper.appendChild(img);
            imageScatter.appendChild(wrapper);

            // Set initial random position and rotation after image loads
            img.onload = () => {
                const size = getRandomSize();
                wrapper.style.width = size + 'px';
                
                const pos = getRandomPosition(wrapper, imageScatter);
                wrapper.style.left = pos.x + 'px';
                wrapper.style.top = pos.y + 'px';
                wrapper.style.transform = `rotate(${getRandomRotation()}deg)`;
            };

            // Handle image load errors
            img.onerror = () => {
                wrapper.remove();
            };
        });

        // Mouse event handlers
        function onMouseDown(e) {
            if (e.target.closest('.draggable-image')) {
                activeImage = e.target.closest('.draggable-image');
                const rect = activeImage.getBoundingClientRect();
                
                initialX = rect.left;
                initialY = rect.top;
                startX = e.clientX;
                startY = e.clientY;

                activeImage.style.zIndex = 1000;
                activeImage.classList.add('dragging');
            }
        }

        function onMouseMove(e) {
            if (activeImage) {
                e.preventDefault();
                
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                activeImage.style.left = `${initialX + dx}px`;
                activeImage.style.top = `${initialY + dy}px`;
            }
        }

        function onMouseUp() {
            if (activeImage) {
                activeImage.classList.remove('dragging');
                activeImage = null;
            }
        }

        // Touch event handlers
        function onTouchStart(e) {
            if (e.target.closest('.draggable-image')) {
                activeImage = e.target.closest('.draggable-image');
                const rect = activeImage.getBoundingClientRect();
                const touch = e.touches[0];

                initialX = rect.left;
                initialY = rect.top;
                startX = touch.clientX;
                startY = touch.clientY;

                activeImage.style.zIndex = 1000;
                activeImage.classList.add('dragging');
            }
        }

        function onTouchMove(e) {
            if (activeImage) {
                e.preventDefault();
                const touch = e.touches[0];
                
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;

                activeImage.style.left = `${initialX + dx}px`;
                activeImage.style.top = `${initialY + dy}px`;
            }
        }

        function onTouchEnd() {
            if (activeImage) {
                activeImage.classList.remove('dragging');
                activeImage = null;
            }
        }

        // Add event listeners
        imageScatter.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        imageScatter.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    }

    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            start = Math.min(Math.floor(progress * target), target);
            element.textContent = start;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const counter = statItem.querySelector('.counter');
                const target = parseInt(statItem.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(statItem);
            }
        });
    }, observerOptions);

    // Observe all stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        counterObserver.observe(item);
    });

    // Memetics Heart Animation
    const imageWrapper = document.querySelector('.image-wrapper');
    const heartsContainer = document.querySelector('.hearts-container');
    
    if (imageWrapper && heartsContainer) {
        let isAnimating = false;
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
        
        function startHeartAnimation() {
            if (isAnimating) return;
            isAnimating = true;
            
            // Create 60 hearts
            let heartsCreated = 0;
            const heartInterval = setInterval(() => {
                createHeart();
                heartsCreated++;
                
                if (heartsCreated >= 60) {
                    clearInterval(heartInterval);
                    isAnimating = false;
                }
            }, 50); // Create a new heart every 50ms
        }
        
        imageWrapper.addEventListener('mouseenter', startHeartAnimation);
    }
});
