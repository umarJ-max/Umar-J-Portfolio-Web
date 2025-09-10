// Modern Portfolio JavaScript 2025
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeTypingEffect();
    initializeSkillBars();
    
    // Loading screen
    function initializeLoading() {
        const loading = document.getElementById('loading');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        });
    }
    
    // Navigation functionality
    function initializeNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        mobileToggle?.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll effects
    function initializeScrollEffects() {
        const scrollProgress = document.getElementById('scrollProgress');
        const navbar = document.getElementById('navbar');
        
        // Active navigation highlighting
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.pageYOffset + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink?.classList.add('active');
                }
            });
        }

        // Update scroll progress and navbar
        function updateScrollProgress() {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            if (scrollProgress) {
                scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`;
            }
            
            // Update navbar appearance on scroll
            if (scrollTop > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        }

        // Scroll event listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollProgress();
                    updateActiveNavLink();
                    fadeInOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Animations
    function initializeAnimations() {
        // Fade in on scroll
        window.fadeInOnScroll = function() {
            const elements = document.querySelectorAll('[data-aos]');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('fade-in-up');
                }
            });
        };

        // Initial call
        window.fadeInOnScroll();

        // Smooth hover effects for cards
        const cards = document.querySelectorAll('.project-card, .metric-card, .skill-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn-modern, .btn-project');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Typing effect
    function initializeTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        const texts = ['Python Developer', 'AI Engineer', 'Automation Expert', 'Agentic Coder'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        if (typingText) {
            typeText();
        }
    }

    // Skill bars animation
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                
                if (barTop < window.innerHeight - 100) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }
            });
        };

        window.addEventListener('scroll', animateSkillBars);
        animateSkillBars(); // Initial call
    }

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            mobileToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn-modern, .btn-project {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Console greeting
    console.log(`
    🚀 Welcome to Umar J's Portfolio!
    
    ✨ Modern Design Features:
    • Dark Theme with Glassmorphism
    • Responsive & Mobile-First
    • Smooth Animations
    • Interactive Elements
    • Modern Typography
    
    💻 Built with:
    • HTML5 & CSS3
    • Vanilla JavaScript
    • Modern CSS Variables
    • Flexbox & Grid
    
    📧 Get in touch: Digitalcreatoruj@gmail.com
    🌐 Based in Pakistan, Working Globally
    `);
});

// Drive to Drive Tool Function
function openDriveTool() {
    // Open the Drive Tool in a new tab/window
    window.open('https://script.google.com/macros/s/AKfycbzVgsOWqUD28F0nsJsKYHN2WptsAZO2kX2H3Uo31uDPsXHvImsnn9-YqzG1_24mLslv/exec', '_blank');
}

// Secure contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data with sanitization
            const formData = new FormData(contactForm);
            const name = sanitizeInput(formData.get('name'));
            const email = sanitizeInput(formData.get('email'));
            const subject = sanitizeInput(formData.get('subject'));
            const message = sanitizeInput(formData.get('message'));
            
            // Validate inputs
            if (!validateForm(name, email, subject, message)) {
                showNotification('Please fill all fields correctly.', 'error');
                return;
            }
            
            // Create secure mailto link
            const mailtoLink = `mailto:Digitalcreatoruj@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Email client opened! Please send the email to complete your message.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Input sanitization function
function sanitizeInput(input) {
    if (!input) return '';
    return input.toString()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

// Form validation
function validateForm(name, email, subject, message) {
    // Check if all fields are filled
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Check minimum lengths
    if (name.length < 2 || subject.length < 5 || message.length < 10) {
        return false;
    }
    
    // Check for suspicious content
    const suspiciousPatterns = [
        /<script/gi,
        /javascript:/gi,
        /on\w+=/gi,
        /data:/gi,
        /vbscript:/gi
    ];
    
    const allInputs = [name, email, subject, message].join(' ');
    for (let pattern of suspiciousPatterns) {
        if (pattern.test(allInputs)) {
            return false;
        }
    }
    
    return true;
}

// Rate limiting for form submissions
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 5000; // 5 seconds

function checkRateLimit() {
    const now = Date.now();
    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
        showNotification('Please wait before submitting again.', 'error');
        return false;
    }
    lastSubmissionTime = now;
    return true;
}

// Enhanced notification function with error handling
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 10001;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Sanitize message content
    notification.textContent = sanitizeInput(message);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
