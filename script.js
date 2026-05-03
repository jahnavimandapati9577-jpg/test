document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Number counting animation for stats
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    };

    // Only trigger counting animation when hero is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            countUp();
            hasCounted = true;
        }
    }, { threshold: 0.5 });

    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        observer.observe(heroEl);
    }

    // Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const icon = mobileBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
});
