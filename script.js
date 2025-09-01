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
    // Create modal for the Drive Tool
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 1000px;
        height: 80%;
        background: rgba(26, 26, 58, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 24px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
        backdrop-filter: blur(20px);
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(99, 102, 241, 0.3)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    const iframe = document.createElement('iframe');
    iframe.src = 'https://script.google.com/macros/s/AKfycbxdJYgCNzyfqj6AhlrNCP2tLdeiKPr8JWI3O0dgJ-FWCteYY92y3dmrb1eEw1k1EGNO/exec';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        background: white;
        border-radius: 24px;
    `;
    
    // Close modal function
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Escape key to close
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add CSS animations if not already added
    if (!document.querySelector('#modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}
