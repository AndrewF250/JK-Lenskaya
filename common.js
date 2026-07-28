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
