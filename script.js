// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupScrollEffects();
    setupAnimations();
});

// Initialize page functionality
function initializePage() {
    // Add loading state simulation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
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

// Header scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Setup scroll animations for elements
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// CTA Functions
function startDemo() {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';

    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';

        // Show success message
        showNotification('Thank you for your interest! A demo link will be sent to your email shortly. Check your inbox in the next few minutes.', 'success');
        
        // Track conversion (in real app, this would send to analytics)
        trackConversion('demo_request');
    }, 1500);

    // In a real application, this would:
    // - Open a modal with a form
    // - Collect user information (name, email, company)
    // - Send data to backend API
    // - Redirect to demo environment or confirmation page
    // - Send confirmation email
}

function scheduleCall() {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';

    // Simulate loading delay
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';

        // Show redirect message
        showNotification('Redirecting to our scheduling system where you can book a personalized consultation with our team.', 'info');
        
        // Track conversion
        trackConversion('consultation_request');
    }, 1000);

    // In a real application, this would:
    // - Open calendar booking widget (Calendly, etc.)
    // - Integrate with scheduling system
    // - Collect user preferences and information
    // - Send calendar invites
    // - Redirect to external scheduling platform
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        maxWidth: '400px',
        fontSize: '14px',
        lineHeight: '1.4',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function trackConversion(eventName) {
    // In a real application, this would send data to analytics platforms
    console.log(`Conversion tracked: ${eventName}`, {
        timestamp: new Date().toISOString(),
        page: window.location.href,
        userAgent: navigator.userAgent
    });

    // Example integrations:
    // - Google Analytics: gtag('event', eventName, { ... })
    // - Facebook Pixel: fbq('track', eventName, { ... })
    // - Custom analytics API: fetch('/api/track', { ... })
}

// Form validation utilities (for future form implementations)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.company || formData.company.trim().length < 2) {
        errors.push('Company name is required');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Mobile menu functionality (for future mobile menu implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const isOpen = navLinks.style.display === 'flex';
    
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    navLinks.style.padding = '1rem';
}

// Initialize smooth scrolling when page loads
setupSmoothScrolling();

// Feature card hover effects enhancement
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200; // Lower is faster

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            const data = +counter.innerText.replace(/\D/g, '');
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time) + counter.innerText.replace(/[0-9]/g, '').replace(/\+/g, '') + '+';
                setTimeout(animate, 1);
            } else {
                counter.innerText = counter.getAttribute('data-original') || counter.innerText;
            }
        };
        
        // Store original text and set target
        counter.setAttribute('data-original', counter.innerText);
        counter.setAttribute('data-target', parseInt(counter.innerText.replace(/\D/g, '')));
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();