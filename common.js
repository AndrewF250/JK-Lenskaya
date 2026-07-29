// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
let isMobileMenuOpen = false;

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileMenu.classList.toggle('active');
        
        if (isMobileMenuOpen) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        });
    });
}

// Consultation Modal
const consultationModal = document.getElementById('consultationModal');
const consultationBtn = document.getElementById('consultationBtn');
const mobileConsultationBtn = document.getElementById('mobileConsultationBtn');
const modalClose = document.getElementById('modalClose');
const consultationForm = document.getElementById('consultationForm');

function openModal() {
    if (consultationModal) {
        consultationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (consultationModal) {
        consultationModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (consultationBtn) {
    consultationBtn.addEventListener('click', openModal);
}

if (mobileConsultationBtn) {
    mobileConsultationBtn.addEventListener('click', () => {
        openModal();
        if (isMobileMenuOpen) {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
        if (e.target === consultationModal) {
            closeModal();
        }
    });
}

// Form submission
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        closeModal();
        consultationForm.reset();
    });
}

// Favorites functionality
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
const favoritesCount = document.getElementById('favoritesCount');

function updateFavoritesCount() {
    if (favoritesCount) {
        if (favorites.length > 0) {
            favoritesCount.style.display = 'flex';
            favoritesCount.textContent = favorites.length;
        } else {
            favoritesCount.style.display = 'none';
        }
    }
}

updateFavoritesCount();

// ============================================
// ANIMATIONS
// ============================================

// Scroll reveal animation with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .feature-card, .stat-item, ' +
        '.arch-card, .infra-card, .apartment-card, .news-card, ' +
        '.progress-card, .gallery-item, .location-feature, ' +
        '.advantage-item, .manifest-text, .hero-content h1, ' +
        '.hero-content p, .hero-buttons, .cta h2, .cta p, .cta-buttons, ' +
        '.footer-grid, .page-title, .page-subtitle, ' +
        '.content-grid, .masterplan-card, .map-container'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay for sibling elements
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(el => el.classList.length > 0) : [];
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('animate-hidden');
        observer.observe(el);
    });
}

// Counter animation for numbers
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const isFloat = String(target).includes(',');
    const numericTarget = parseFloat(String(target).replace(',', '.'));

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (numericTarget - start) * eased;

        if (isFloat) {
            element.textContent = current.toFixed(1).replace('.', ',');
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value, .progress-percent');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();

                // Check if it's a number (with possible comma or dash)
                if (/^[\d,-]+$/.test(text) || /^[\d,]+$/.test(text)) {
                    const target = text;
                    animateCounter(el, target);
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Nav link hover underline animation
function initNavAnimations() {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Tab filter animation (for gallery, catalog)
function initTabAnimations() {
    const tabButtons = document.querySelectorAll('.filter-btn, .tab-btn, [data-filter]');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-btn, .tab-btn, [data-filter]');
            siblings.forEach(s => {
                s.classList.remove('active');
                s.style.transform = 'scale(1)';
            });

            // Animate clicked button
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        hero.style.backgroundPositionY = `calc(50% + ${rate}px)`;
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button ripple effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Fade in page on load
function initPageFadeIn() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Stagger animation for card grids
function initStaggerAnimations() {
    const grids = document.querySelectorAll(
        '.features-grid, .stats-grid, .arch-grid, .infra-grid, ' +
        '.apartments-grid, .news-grid, .progress-grid, .gallery-grid, ' +
        '.location-features'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    child.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    grids.forEach(grid => observer.observe(grid));
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initPageFadeIn();
    initScrollAnimations();
    initCounterAnimations();
    initNavAnimations();
    initTabAnimations();
    initParallax();
    initSmoothScroll();
    initButtonRipple();
    initStaggerAnimations();
});
