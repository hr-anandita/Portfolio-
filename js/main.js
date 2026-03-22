// Page Navigation and Dynamic Loading
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
        this.setupMobileMenu();
        this.hideSplash();
        this.setupFormSubmission();
        this.loadPageContent();
    }

    hideSplash() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 2200);
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('nav a, .qnav-card, .footer-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
                    e.preventDefault();
                    this.navigateTo(href);
                }
            });
        });

        // Logo click
        const logo = document.querySelector('.header-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.navigateTo('index.html');
            });
        }

        // Custom cursor (only for desktop)
        if (window.innerWidth > 768) {
            this.setupCustomCursor();
        }
    }

    setupCustomCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('follower');
        let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursor) {
                cursor.style.left = mouseX - 6 + 'px';
                cursor.style.top = mouseY - 6 + 'px';
            }
        });

        function animateFollower() {
            posX += (mouseX - posX) * 0.12;
            posY += (mouseY - posY) * 0.12;
            if (follower) {
                follower.style.left = posX - 18 + 'px';
                follower.style.top = posY - 18 + 'px';
            }
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects
        document.querySelectorAll('a, button, .skill-badge, .exp-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.style.transform = 'scale(2.5)';
                if (follower) {
                    follower.style.transform = 'scale(1.5)';
                    follower.style.opacity = '0.2';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.style.transform = 'scale(1)';
                if (follower) {
                    follower.style.transform = 'scale(1)';
                    follower.style.opacity = '0.5';
                }
            });
        });
    }

    setupSmoothScroll() {
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

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-up, .exp-card, .skill-badge, .qnav-card, .highlight-item, .skills-dual, .contact-info, .contact-form').forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');
        
        if (nav && header && window.innerWidth <= 768) {
            const existingBtn = document.querySelector('.mobile-menu-btn');
            if (!existingBtn) {
                header.insertBefore(menuBtn, nav);
                menuBtn.addEventListener('click', () => {
                    nav.classList.toggle('active');
                    menuBtn.innerHTML = nav.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                });
            }
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                if (nav) nav.classList.remove('active');
                const btn = document.querySelector('.mobile-menu-btn');
                if (btn) btn.remove();
            } else {
                const btn = document.querySelector('.mobile-menu-btn');
                if (!btn && nav && header) {
                    const newBtn = document.createElement('button');
                    newBtn.className = 'mobile-menu-btn';
                    newBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    header.insertBefore(newBtn, nav);
                    newBtn.addEventListener('click', () => {
                        nav.classList.toggle('active');
                        newBtn.innerHTML = nav.classList.contains('active') ? 
                            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                    });
                }
            }
        });
    }

    setupFormSubmission() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert-success';
                successMsg.innerHTML = '✨ Thank you for reaching out! I\'ll get back to you soon.';
                successMsg.style.cssText = `
                    background: var(--terracotta);
                    color: white;
                    padding: 1rem;
                    border-radius: 12px;
                    margin-top: 1rem;
                    text-align: center;
                    animation: fadeUp 0.5s ease;
                `;
                contactForm.appendChild(successMsg);
                contactForm.reset();
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            });
        }
    }

    navigateTo(url) {
        // Add loading animation
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '0';
            main.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    loadPageContent() {
        // Highlight active nav link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Show main content
        const main = document.querySelector('main');
        if (main) {
            setTimeout(() => {
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
                main.style.transition = 'all 0.5s ease';
            }, 100);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add scroll reveal for elements
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-up:not(.visible)');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
});