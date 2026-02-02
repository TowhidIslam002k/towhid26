// ============================================
// VANILLA JAVASCRIPT - Personal Portfolio
// Project Filtering & Interactive Features
// ============================================

// Project Data
const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #0066FF 0%, #FF6B35 100%)',
    },
    {
        id: 2,
        title: 'SaaS Dashboard',
        description: 'Analytics dashboard with real-time data visualization and interactive charts for business intelligence.',
        tags: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #00FF88 100%)',
    },
    {
        id: 3,
        title: 'Mobile App Design',
        description: 'UI/UX design for a fitness tracking mobile application with intuitive navigation and engaging interface.',
        tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
        category: 'design',
        gradient: 'linear-gradient(135deg, #00FF88 0%, #0066FF 100%)',
    },
    {
        id: 4,
        title: 'Brand Identity System',
        description: 'Complete brand identity including logo, color palette, typography, and design guidelines.',
        tags: ['Branding', 'Design System', 'Illustration', 'Guidelines'],
        category: 'branding',
        gradient: 'linear-gradient(135deg, #0066FF 0%, #00FF88 100%)',
    },
    {
        id: 5,
        title: 'Content Management System',
        description: 'Headless CMS built with modern architecture for seamless content management across platforms.',
        tags: ['Next.js', 'GraphQL', 'PostgreSQL', 'Docker'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #0066FF 100%)',
    },
    {
        id: 6,
        title: 'Real-time Collaboration Tool',
        description: 'Web-based collaboration platform with real-time updates, video conferencing, and file sharing.',
        tags: ['WebSocket', 'React', 'Firebase', 'WebRTC'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #00FF88 0%, #FF6B35 100%)',
    },
    {
        id: 7,
        title: 'Marketing Website Redesign',
        description: 'Modern, responsive marketing website with improved conversion rates and user engagement.',
        tags: ['Next.js', 'Tailwind', 'Animation', 'SEO'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #0066FF 0%, #FF6B35 100%)',
    },
    {
        id: 8,
        title: 'Product Packaging Design',
        description: 'Eye-catching product packaging design that stands out on retail shelves and communicates brand values.',
        tags: ['Adobe Illustrator', 'Packaging', 'Print Design', 'Branding'],
        category: 'branding',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #00FF88 100%)',
    },
    {
        id: 9,
        title: 'Mobile Banking App',
        description: 'Secure and user-friendly mobile banking application with advanced features and smooth interactions.',
        tags: ['React Native', 'TypeScript', 'Security', 'UX Design'],
        category: 'mobile',
        gradient: 'linear-gradient(135deg, #00FF88 0%, #0066FF 100%)',
    },
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

// Current Active Filter
let activeFilter = 'all';

// ============================================
// PROJECT FILTERING FUNCTIONALITY
// ============================================

/**
 * Render projects based on the active filter
 */
function renderProjects(filter = 'all') {
    // Clear existing projects
    projectsGrid.innerHTML = '';

    // Filter projects
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);

    // Render filtered projects with animation
    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });

    // Trigger animation
    setTimeout(() => {
        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        });
    }, 10);
}

/**
 * Create a project card element
 */
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image" style="background: ${project.gradient};">
            <div class="project-actions">
                <button class="project-action-btn" title="View Project">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="project-action-btn" title="View Code">
                    <i class="fas fa-code"></i>
                </button>
            </div>
        </div>
        <div class="project-content">
            <h5>${project.title}</h5>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return card;
}

/**
 * Handle filter button clicks
 */
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Get filter value
            const filter = e.target.getAttribute('data-filter');
            activeFilter = filter;
            
            // Render filtered projects
            renderProjects(filter);
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle contact form submission
 */
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Here you would typically send the form data to a server
            console.log('Form Data:', { name, email, subject, message });
        });
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInUp 0.3s ease-out;
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Animate elements on scroll
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.skill-card, .service-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

/**
 * Update navbar background on scroll
 */
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// ============================================
// PROGRESS BAR ANIMATION
// ============================================

/**
 * Animate progress bars on scroll
 */
function setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    let animated = false;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Render initial projects
    renderProjects('all');
    
    // Setup event listeners
    setupFilterButtons();
    setupContactForm();
    setupSmoothScroll();
    setupScrollAnimations();
    setupNavbarScroll();
    setupProgressBars();
    
    console.log('Portfolio initialized successfully!');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
