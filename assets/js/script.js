// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

//dark mode
if (currentTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Add a subtle animation to the toggle
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Mobile Navigation Toggle
// Enhanced Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Enhanced smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced active navigation link highlight with smooth transitions
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Enhanced navbar background on scroll with smooth transitions
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(17, 24, 39, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-medium)';
    } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(17, 24, 39, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'var(--shadow-light)';
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading', 'loaded');
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('skill-category') || 
                entry.target.classList.contains('project-card') || 
                entry.target.classList.contains('certificate-card')) {
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
            
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .stat-item, .education-item');
animateElements.forEach(el => {
    el.classList.add('loading');
    animationObserver.observe(el);
});

// Enhanced typing effect for hero title
function typeWriter(element, text, speed = 50) {
    // Extract text content while preserving HTML structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--accent-color)';
    
    function type() {
        if (i < plainText.length) {
            let currentText = plainText.substring(0, i + 1);
            
            // Apply highlight span to the name if we're typing it
            if (currentText.includes('Suprem Khatri')) {
                const nameStart = currentText.indexOf('Suprem Khatri');
                if (nameStart !== -1) {
                    const beforeName = currentText.substring(0, nameStart);
                    const nameText = currentText.substring(nameStart, nameStart + 'Suprem Khatri'.length);
                    const afterName = currentText.substring(nameStart + 'Suprem Khatri'.length);
                    
                    element.innerHTML = beforeName + '<span class="highlight">' + nameText + '</span>' + afterName;
                } else {
                    element.textContent = currentText;
                }
            } else {
                element.textContent = currentText;
            }
            
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = text;
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const hasHTML = /<[^>]*>/.test(heroTitle.innerHTML);
        
        if (hasHTML) {

            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 500);
        } else {
            const originalText = heroTitle.innerHTML;
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 30);
            }, 800);
        }
    }
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-description, .hero-buttons, .social-links');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, (index + 1) * 200 + 1000);
    });
});

// Skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #2563eb, #667eea);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target % 1 === 0) {
                    counter.textContent = Math.ceil(current);
                } else {
                    counter.textContent = current.toFixed(2);
                }
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(2);
            }
        };
        
        // Store original value as data attribute
        if (!counter.getAttribute('data-target')) {
            counter.setAttribute('data-target', counter.textContent);
        }
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Social links hover effects
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Add entrance animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
});

// Theme toggle functionality (optional)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #e5e7eb;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    let isDark = false;
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle (uncomment if you want dark mode)
// createThemeToggle();

// Projects Carousel Management System
const projectsData = [
    {
        id: 1,
        title: "Pothole Detection System",
        category: "ml",
        featured: true,
        image: "assets/images/pothole-detection.png",
        tags: ["CNN", "YOLO", "Docker"],
        description: "Developed a real-time Pothole Detection System using YOLOv5n and YOLOv8n with GPS integration for smart city infrastructure planning.",
        features: [
            "Custom dataset annotation using Roboflow",
            "Image augmentation for model robustness",
            "Docker deployment for cross-platform sharing"
        ],
        githubUrl: "https://github.com/supremkc05/pothole-detection", // Update with actual URL when available
        demoUrl: "#" // Update with actual demo URL when available
    },
    {
        id: 2,
        title: "NLP Text Analysis Suite",
        category: "ml",
        featured: true,
        image: "assets/images/sentiment-analysis.jpeg",
        tags: ["NLP", "Naive Bayes", "TF-IDF"],
        description: "Implemented Spam Message Detection and Sentiment Analysis on Daraz product reviews using advanced NLP techniques.",
        features: [
            "Nepali text preprocessing and classification",
            "High accuracy on low-resource datasets",
            "Interactive visualizations with Seaborn"
        ],
        githubUrl: "https://github.com/supremkc05/SentimentalAnalysis.git",
        demoUrl: "#" // Update with actual demo URL when available
    },
    {
        id: 3,
        title: "Dajubhai Minimart Analysis",
        category: "data",
        featured: true,
        image: "assets/images/dajubhai.jpeg",
        tags: ["Machine Learning", "Pandas", "Plotly", "Matplotlib"],
        description: "Built predictive models for retail analytics including loyalty classification and sales forecasting.",
        features: [
            "Random Forest for membership classification",
            "Gradient Boosting for sales prediction",
            "Interactive data visualization using matplot, plotly and Seaborn"
        ],
        githubUrl: "https://github.com/supremkc05/DajuBhaiMiniMart_Analysis.git",
        demoUrl: "#" // Update with actual demo URL when available
    },
    {
        id: 4,
        title: "Trek Recommendation System",
        category: "ml",
        featured: false,
        image: "assets/images/trek recommendation.png",
        tags: ["Streamlit", "Regression", "Dashboard"],
        description: "Developed a personalized trekking recommendation system based on user preferences and fitness levels.",
        features: [
            "Multi-factor recommendation algorithm",
            "Interactive Streamlit dashboard",
            "Real-time trek suggestions"
        ],
        githubUrl: "https://github.com/supremkc05/trek-recommendation", // Update with actual URL when available
        demoUrl: "#" // Update with actual demo URL when available
    },
    {
        id: 5,
        title: "AirBnB-Pricing-Analysis and Prediction",
        category: "data",
        featured: true,
        image: "assets/images/air_bnb.png",
        tags: ["Data Visualization", "EDA", "Random Forest Regression", "Streamlit"],
        description: "Data analysis project focused on understanding Airbnb pricing patterns and building predictive models for property pricing optimization.",
        features: [
            "Advanced Data analytics",
            "Machine Learning Price Prediction",
            "Interactive Streamlit dashboard",
            "Comprehensive features engineering"
        ],
        githubUrl: "https://github.com/supremkc05/AirBnB-Pricing.git",
        demoUrl: "https://airbnb-pricing.streamlit.app/"
    },
    {
        id: 6,
        title: "UI/UX Design Project",
        category: "ui",
        featured: false,
        image: "assets/images/ui.jpg",
        tags: ["UI/UX", "Design", "Frontend"],
        description: "Modern and responsive user interface design with focus on user experience and accessibility.",
        features: [
            "Responsive design principles",
            "User-centered design approach",
            "Modern UI components"
        ],
        githubUrl: "https://github.com/supremkc05/ui-ux-project", // Update with actual URL when available
        demoUrl: "#" // Update with actual demo URL when available
    }
];

class ProjectCarousel {
    constructor() {
        this.currentCategory = 'all';
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.filteredProjects = projectsData;
        this.carousel = document.getElementById('projects-carousel');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        console.log('🚀 Initializing ProjectCarousel...');
        console.log('📊 Initial projectsData length:', projectsData.length);
        console.log('📊 Initial filteredProjects length:', this.filteredProjects.length);
        
        this.renderProjects();
        this.updateNavigationButtons();
        this.updateCounter(); // Make sure counter is updated on initialization
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('✅ ProjectCarousel initialization complete');
    }

    getCardsPerView() {
        const width = window.innerWidth;
        if (width < 480) return 1;
        if (width < 768) return 1.2;
        if (width < 1200) return 2;
        return 3;
    }

    handleResize() {
        this.cardsPerView = this.getCardsPerView();
        this.currentIndex = 0;
        this.updateCarousel();
        this.updateNavigationButtons();
        this.updateCounter(); // Update counter on resize
    }

    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveCategory(e.target);
                this.filterProjects(e.target.getAttribute('data-category'));
            });
        });

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch/swipe support
        this.setupTouchNavigation();
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });

        this.carousel.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });

        this.carousel.addEventListener('touchend', (e) => {
            distX = e.changedTouches[0].pageX - startX;
            distY = e.changedTouches[0].pageY - startY;

            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
                if (distX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }

    setActiveCategory(activeBtn) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    filterProjects(category) {
        console.log('🔍 Filtering projects for category:', category);
        this.currentCategory = category;
        this.currentIndex = 0;

        if (category === 'all') {
            this.filteredProjects = projectsData;
        } else if (category === 'featured') {
            this.filteredProjects = projectsData.filter(project => project.featured);
        } else {
            this.filteredProjects = projectsData.filter(project => project.category === category);
        }

        console.log(`🔢 Filter result: ${this.filteredProjects.length} projects out of ${projectsData.length} total`);
        
        this.renderProjects();
        this.updateNavigationButtons();
        this.updateCounter();
    }

    renderProjects() {
        this.carousel.innerHTML = '';
        
        this.filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            this.carousel.appendChild(projectCard);
            
            // Add staggered animation
            setTimeout(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const featuresHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // Always show GitHub button - if no URL, it can be a placeholder
        const githubButton = project.githubUrl && project.githubUrl !== "#" ? 
            `<a href="${project.githubUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> View Code
            </a>` : 
            `<a href="#" class="btn btn-primary btn-sm" onclick="alert('Repository will be available soon!')">
                <i class="fab fa-github"></i> View Code
            </a>`;
        
        // Always show Demo button - if no URL, it can be a placeholder
        const demoButton = project.demoUrl && project.demoUrl !== "#" ? 
            `<a href="${project.demoUrl}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>` : 
            `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Live demo will be available soon!')">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>`;

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    ${project.githubUrl && project.githubUrl !== "#" ? 
                        `<a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>` : 
                        `<a href="#" class="project-link" onclick="alert('Repository will be available soon!')"><i class="fab fa-github"></i></a>`
                    }
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                </div>
                <p>${project.description}</p>
                <ul class="project-features">
                    ${featuresHTML}
                </ul>
                <div class="project-actions">
                    ${githubButton}
                    ${demoButton}
                </div>
            </div>
        `;
        
        return card;
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.updateNavigationButtons();
        }
    }

    nextSlide() {
        const maxIndex = Math.max(0, this.filteredProjects.length - this.cardsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
            this.updateNavigationButtons();
        }
    }

    updateCarousel() {
        const cardWidth = 350; // Base card width
        const gap = 32; // 2rem gap
        const translateX = -(this.currentIndex * (cardWidth + gap));
        this.carousel.style.transform = `translateX(${translateX}px)`;
    }

    updateNavigationButtons() {
        const maxIndex = Math.max(0, this.filteredProjects.length - this.cardsPerView);
        
        this.prevBtn.disabled = this.currentIndex <= 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
        
        // Hide navigation if all projects fit in view
        const navigationNeeded = this.filteredProjects.length > this.cardsPerView;
        this.prevBtn.style.display = navigationNeeded ? 'flex' : 'none';
        this.nextBtn.style.display = navigationNeeded ? 'flex' : 'none';
    }

    updateCounter() {
        const currentProjectsSpan = document.getElementById('current-projects');
        const totalProjectsSpan = document.getElementById('total-projects');
        const projectsCompletedCount = document.getElementById('projects-completed-count');
        
        if (currentProjectsSpan && totalProjectsSpan) {
            // Debug logging
            console.log('=== PROJECT COUNTER DEBUG ===');
            console.log('Total projectsData array length:', projectsData.length);
            console.log('Filtered projects length:', this.filteredProjects.length);
            console.log('Current category:', this.currentCategory);
            console.log('All project IDs:', projectsData.map(p => p.id));
            console.log('Filtered project IDs:', this.filteredProjects.map(p => p.id));
            
            // Update the counter with actual numbers
            currentProjectsSpan.textContent = this.filteredProjects.length;
            totalProjectsSpan.textContent = projectsData.length;
            
            // Update the "Projects Completed" stat in the About section
            if (projectsCompletedCount) {
                projectsCompletedCount.textContent = `${projectsData.length}+`;
            }
            
            // Add some visual feedback for the counter
            console.log(`✅ Counter Updated: ${this.filteredProjects.length} of ${projectsData.length} (${this.currentCategory})`);
        } else {
            console.warn('❌ Project counter elements not found in DOM');
        }
    }

    // Helper method to add new projects dynamically
    addProject(newProject) {
        // Add unique ID if not provided
        if (!newProject.id) {
            newProject.id = Math.max(...projectsData.map(p => p.id), 0) + 1;
        }
        
        // Add to projects data
        projectsData.push(newProject);
        
        // Refresh the current view
        this.filterProjects(this.currentCategory);
        
        // Update the "Projects Completed" counter in About section
        const projectsCompletedCount = document.getElementById('projects-completed-count');
        if (projectsCompletedCount) {
            projectsCompletedCount.textContent = `${projectsData.length}+`;
        }
        
        console.log(`Added new project: ${newProject.title}`);
        console.log(`Total projects now: ${projectsData.length}`);
    }
}

// Initialize project carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing portfolio...');
    
    // Initialize the project carousel
    const carousel = new ProjectCarousel();
    
    // Make carousel globally accessible for easy project management
    window.portfolioCarousel = carousel;
    
    // Example of how to add a new project dynamically:
    // To add a new project, simply call:
    // window.portfolioCarousel.addProject({
    //     title: "My New Project",
    //     description: "Description of my awesome project",
    //     category: "web-development", // or "ml", "data", "ui"
    //     featured: false, // or true if you want it in featured section
    //     technologies: ["HTML", "CSS", "JavaScript"],
    //     image: "assets/images/new-project.jpg",
    //     tags: ["Frontend", "Responsive"],
    //     features: [
    //         "Feature 1 description",
    //         "Feature 2 description", 
    //         "Feature 3 description"
    //     ],
    //     githubUrl: "https://github.com/username/new-project",
    //     demoUrl: "https://username.github.io/new-project"
    // });
    
    console.log('Portfolio initialized successfully!');
    console.log('Use window.portfolioCarousel.addProject() to add new projects');
});

// Initialize Project Carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});

console.log('Portfolio website loaded successfully! 🚀');
