// Advanced JavaScript for Shribalaji Constructions Website

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        mirror: false,
        offset: 100
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (window.scrollY > 100) {
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-xl');
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-xl');
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100');
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between hamburger and X
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.className = 'fas fa-bars text-2xl';
        } else {
            menuIcon.className = 'fas fa-times text-2xl';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars text-2xl';
        });
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-bold');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-primary', 'font-bold');
        }
    });
});

// Scroll to Top Functionality
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl max-w-sm transform translate-x-full transition-all duration-500 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 500);
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('#home');
    const heroContent = hero.querySelector('.container');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize counter observers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const counterSections = document.querySelectorAll('.grid .text-center');
    counterSections.forEach(section => {
        if (section.querySelector('[data-count]')) {
            counterObserver.observe(section);
        }
    });
});

// Product Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('#products .group');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
    });
});

// Advanced Loading Animation
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600 font-medium">Loading Shribalaji Constructions...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}

// Page Load Handler
window.addEventListener('load', function() {
    hidePageLoader();
    
    // Add entrance animations
    const hero = document.querySelector('#home');
    if (hero) {
        hero.classList.add('animate-fade-in');
    }
});

// Show loader immediately
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional initialization here
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('opacity-100');
                img.classList.remove('opacity-0');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        imageObserver.observe(img);
    });
});

// Advanced Search and Filter Functionality (for future use)
class AdvancedSearch {
    constructor() {
        this.searchInput = null;
        this.searchResults = [];
    }
    
    init() {
        this.createSearchBox();
        this.bindEvents();
    }
    
    createSearchBox() {
        // Implementation for advanced search functionality
        // Can be used for product search in the future
    }
    
    bindEvents() {
        // Event handlers for search functionality
    }
    
    performSearch(query) {
        // Search implementation
        return [];
    }
}

// Theme Switcher (for future dark mode support)
class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'light';
    }
    
    init() {
        // Initialize theme switcher
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Initialize advanced features
const themeSwitcher = new ThemeSwitcher();
const advancedSearch = new AdvancedSearch();

document.addEventListener('DOMContentLoaded', function() {
    themeSwitcher.init();
    // advancedSearch.init(); // Uncomment when needed
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrollY = window.scrollY;
    
    // Update scroll-based elements
    updateScrollBasedElements(scrollY);
}, 10);

function updateScrollBasedElements(scrollY) {
    // Update header transparency
    const header = document.getElementById('header');
    if (header) {
        const opacity = Math.min(scrollY / 100, 1);
        header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 * opacity})`;
    }
}

// Replace default scroll handler with optimized version
window.removeEventListener('scroll', function() {});
window.addEventListener('scroll', optimizedScrollHandler);

// Add custom CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 1s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-slide-up {
        animation: slideUp 0.6s ease-out;
    }
    
    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .hover-scale {
        transition: transform 0.3s ease;
    }
    
    .hover-scale:hover {
        transform: scale(1.05);
    }
    
    .gradient-text {
        background: linear-gradient(45deg, #f59e0b, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;
document.head.appendChild(style);




// form Javascript code here......
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
