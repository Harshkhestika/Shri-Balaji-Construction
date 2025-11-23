// Advanced JavaScript for ShriBalaji Construction Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initGallery();
    initCounters();
    initParallax();
    initTypingEffect();
    initScrollToTop();
    
    // Show loading complete
    console.log('ShriBalaji Construction Website Loaded Successfully!');
});

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = this.querySelector('i');
        
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-2xl';
        } else {
            icon.className = 'fas fa-times text-2xl';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after click
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-2xl';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('header-scrolled');
        } else {
            navbar.classList.remove('header-scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('text-primary'));
                if (navLink) {
                    navLink.classList.add('text-primary');
                }
            }
        });
    }
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for children
                const children = entry.target.querySelectorAll('.feature-card, .service-card, .process-step, .machinery-card, .gallery-item, .testimonial-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fadeInUp');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
}

// Advanced Animations
function initAnimations() {
    // Hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Floating animation for hero elements
    const heroElements = document.querySelectorAll('.hero-section button');
    heroElements.forEach(element => {
        element.classList.add('floating');
    });
    
    // Interactive hover effects
    const interactiveElements = document.querySelectorAll('.feature-card, .machinery-card');
    interactiveElements.forEach(element => {
        element.classList.add('interactive-hover');
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner inline-block mr-2"></div>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showFormSuccess('Thank you! Your message has been sent successfully. We will contact you soon.');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track form submission (Google Analytics, etc.)
                trackFormSubmission(formObject);
                
            }, 2000);
        });
    }
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearValidationError(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearValidationError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        clearValidationError(field);
        field.classList.add('border-red-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-1 field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearValidationError(field) {
        field.classList.remove('border-red-500');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showFormSuccess(message) {
        const existingSuccess = contactForm.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        contactForm.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function trackFormSubmission(data) {
        // Google Analytics tracking (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Construction Estimate Request'
            });
        }
        
        console.log('Form submitted:', data);
    }
}

// Gallery Functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    function openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 lightbox';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative max-w-4xl max-h-full p-4';
        
        // Create image
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        image.className = 'max-w-full max-h-full object-contain';
        image.style.transform = 'scale(0.8)';
        image.style.transition = 'transform 0.3s ease';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Assemble lightbox
        imageContainer.appendChild(image);
        imageContainer.appendChild(closeBtn);
        lightbox.appendChild(imageContainer);
        document.body.appendChild(lightbox);
        
        // Show lightbox with animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
            image.style.transform = 'scale(1)';
        }, 10);
        
        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            image.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
}

// Counter Animation
function initCounters() {
    const counters = [
        { element: createCounter('500+', 'Projects Completed'), duration: 2000 },
        { element: createCounter('50+', 'Happy Clients'), duration: 2000 },
        { element: createCounter('10+', 'Years Experience'), duration: 2000 }
    ];
    
    function createCounter(target, label) {
        // This would be used if we add a stats section
        return null;
    }
    
    function animateCounter(element, target, duration) {
        if (!element) return;
        
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const increment = numericTarget / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + target.replace(/\d/g, '');
        }, 16);
    }
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax, .hero-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    
    // Don't run typing effect on mobile for performance
    if (window.innerWidth < 768) return;
    
    heroTitle.textContent = '';
    
    let wordIndex = 0;
    
    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            let letterIndex = 0;
            
            const wordSpan = document.createElement('span');
            heroTitle.appendChild(wordSpan);
            
            function typeLetter() {
                if (letterIndex < word.length) {
                    wordSpan.textContent += word[letterIndex];
                    letterIndex++;
                    setTimeout(typeLetter, 100);
                } else {
                    if (wordIndex < words.length - 1) {
                        wordSpan.textContent += ' ';
                    }
                    wordIndex++;
                    setTimeout(typeWord, 200);
                }
            }
            
            typeLetter();
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWord, 1000);
}

// Scroll to Top Functionality
function initScrollToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimizations
window.addEventListener('scroll', throttle(function() {
    // Throttled scroll events
}, 16));

window.addEventListener('resize', debounce(function() {
    // Debounced resize events
}, 250));

// Intersection Observer for lazy loading (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and Tracking
function initAnalytics() {
    // Google Analytics 4 events
    function trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }
    
    // Track page interactions
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (target) {
            const action = target.textContent.trim();
            trackEvent('user_engagement', {
                engagement_time_msec: 1000,
                custom_parameter: action
            });
        }
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            if (maxScroll % 25 === 0 && maxScroll > 0) {
                trackEvent('scroll', {
                    percent_scrolled: maxScroll
                });
            }
        }
    }, 1000));
}

// Initialize analytics
initAnalytics();

// Accessibility improvements
function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white p-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Focus management for modal/lightbox
    let lastFocusedElement;
    
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
        
        firstElement.focus();
    }
}

// Initialize accessibility features
initAccessibility();

// Dark mode toggle (if needed in future)
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    });
}

// Print functionality
function initPrintStyles() {
    const printBtn = document.getElementById('print-btn');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// Export functions for potential external use
window.ShriBalaji = {
    trackEvent: function(name, params) {
        // External tracking function
    },
    showNotification: function(message, type = 'info') {
        // Show custom notifications
    },
    validateForm: function(formElement) {
        // External form validation
    }
};