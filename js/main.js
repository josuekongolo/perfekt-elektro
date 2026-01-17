/**
 * Perfekt Elektro AS - Main JavaScript
 * Handles navigation, forms, and interactive elements
 */

(function() {
    'use strict';

    // ============================================
    // DOM Ready
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initContactForm();
        initHeaderScroll();
        initAnimations();
    });

    // ============================================
    // Mobile Menu
    // ============================================
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (!mobileMenuBtn || !navMenu) return;

        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Contact Form
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('form-success');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm(form)) {
                return;
            }

            // Collect form data
            const formData = {
                name: form.querySelector('#name').value.trim(),
                email: form.querySelector('#email').value.trim(),
                phone: form.querySelector('#phone').value.trim(),
                address: form.querySelector('#address').value.trim(),
                jobType: form.querySelector('#jobType').value,
                description: form.querySelector('#description').value.trim(),
                siteVisit: form.querySelector('#siteVisit').checked
            };

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sender...</span>';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // For now, we'll just show success message
                // In production, this would send to Resend API or backend

                console.log('Form data:', formData);

                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            }, 1500);
        });
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(function(error) {
            error.remove();
        });
        form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function(input) {
            input.classList.remove('error');
        });

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'Dette feltet er påkrevd');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showFieldError(field, 'Vennligst oppgi en gyldig e-postadresse');
            } else if (field.id === 'phone' && !isValidPhone(field.value)) {
                isValid = false;
                showFieldError(field, 'Vennligst oppgi et gyldig telefonnummer');
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Norwegian phone number validation (8 digits, optional +47 prefix)
        const phoneRegex = /^(\+47)?[2-9]\d{7}$/;
        const cleanPhone = phone.replace(/[\s-]/g, '');
        return phoneRegex.test(cleanPhone);
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll (optional - commented out for now)
            /*
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            */

            lastScroll = currentScroll;
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    function initAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) return;

        const animatedElements = document.querySelectorAll(
            '.service-card, .feature, .popular-card, .value-card, .process-step, .product-card'
        );

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });
    }

    // ============================================
    // Utility Functions
    // ============================================

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for resize events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    // ============================================
    // Click-to-call tracking (optional analytics)
    // ============================================
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track phone clicks (integrate with analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Click'
                });
            }
        });
    });

    // ============================================
    // Email tracking (optional analytics)
    // ============================================
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track email clicks (integrate with analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Email Click'
                });
            }
        });
    });

})();

// ============================================
// CSS for form error states (injected)
// ============================================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .form-input.error,
        .form-select.error,
        .form-textarea.error {
            border-color: var(--color-danger);
        }

        .form-error {
            color: var(--color-danger);
            font-size: var(--fs-small);
            margin-top: var(--space-xs);
        }

        .header.scrolled {
            box-shadow: var(--shadow-md);
        }

        .header.hidden {
            transform: translateY(-100%);
        }

        body.menu-open {
            overflow: hidden;
        }

        @media (max-width: 1023px) {
            body.menu-open::after {
                content: '';
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
        }
    `;
    document.head.appendChild(style);
})();
