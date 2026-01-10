// JavaScript كامل لصفحة السيرفسس

// بيانات الخدمات
const servicesData = {
    1: {
        id: 1,
        title: "Rendering & Presentation Assets",
        price: 0,
        description: "Transform your architectural concepts into compelling visual narratives. We create photorealistic renders that tell the story of your design, perfect for presentations and portfolio enhancement.",
        image: "./img/Orla-by-OMNIYAT-Amenities-1024x569 (1).jpg",
        features: [
            "Photorealistic quality renders",
            "Visual storytelling & narratives",
            "Multiple angle options",
            "48h Delivery Label",
            "High-resolution exports",
            "Lighting and material studies"
        ],
        category: "rendering",
        delivery: "48h"
    },
    2: {
        id: 2,
        title: "3D Models & Blocks",
        price: 0,
        description: "Professional 3D modeling services using industry-standard software like Revit, Rhino, and AutoCAD. We deliver clean, organized models with export-ready files for your architectural projects.",
        image: "/img/help.jpeg",
        features: [
            "Revit, Rhino, AutoCAD",
            "Clean layer organization",
            "48h Delivery Label",
            "Academic standard quality",
            "Exportable formats",
            "Technical documentation"
        ],
        category: "3d",
        featured: true
    },
    3: {
        id: 3,
        title: "Full Project Assistance",
        price: 0,
        description: "End-to-end project support from initial concept through design development to final presentation. We provide comprehensive assistance including diagrams, narrative development, and presentation layouts.",
        image: "/img/getCroppedImage (2).jpg",
        features: [
            "End-to-end project support",
            "Concept to completion",
            "Diagrams & narrative",
            "48h Delivery Label",
            "Presentation layouts",
            "Design development"
        ],
        category: "project"
    },
    4: {
        id: 4,
        title: "Tutoring & Coaching",
        price: 0,
        description: "Personalized one-on-one tutoring and coaching sessions for architecture students and professionals. We help with portfolio reviews, interview preparation, and skill development in design software.",
        image: "/img/tutoring.jpeg",
        features: [
            "Portfolio reviews & feedback",
            "Interview preparation",
            "Software skill-building",
            "48h Delivery Label",
            "One-on-one sessions",
            "Career guidance"
        ],
        category: "tutoring",
        isHourly: true
    },
    5: {
        id: 5,
        title: "Build‑Your‑Own Order",
        price: 0,
        description: "Customize your architectural service package with our intuitive shop interface. Select exactly what you need from our modular service offerings to create a personalized solution for your project.",
        image: "/img/getCroppedImage (4).jpg",
        features: [
            "Modular service selection",
            "Customized package building",
            "Flexible pricing options",
            "48h Delivery Label",
            "Tailored solutions",
            "Multiple service combinations"
        ],
        category: "custom"
    },
    6: {
        id: 6,
        title: "Portfolio Tools",
        price: 0,
        description: "Create a stunning professional portfolio that showcases your architectural work effectively. We design visually compelling portfolios tailored for job applications, university admissions, or client presentations.",
        image: "/img/postar.jpeg",
        features: [
            "Custom portfolio layout design",
            "Content organization & sequencing",
            "Print-ready & digital formats",
            "48h Delivery Label",
            "Brand identity integration",
            "Responsive web portfolio option"
        ],
        category: "portfolio",
        delivery: "48h"
    }
};

// السلة
let cart = JSON.parse(localStorage.getItem('servicesCart')) || [];
let currentServiceId = null;

// DOM Elements
const servicesContainer = document.getElementById('servicesContainer');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const cartCount = document.getElementById('cartCount');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const scrollProgress = document.getElementById('scrollProgress');
const serviceModal = document.getElementById('serviceModal');
const exploreServicesBtn = document.getElementById('exploreServicesBtn');
const contactUsBtn = document.getElementById('contactUsBtn');

const closeCartModalBtn = document.getElementById('closeCartModalBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
const closeServiceModalBtn2 = document.getElementById('closeServiceModalBtn2');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

// ========== LANGUAGE TOGGLE ==========

let currentLang = localStorage.getItem('siteLanguage') || 'en';

// Simple text mapping
const texts = {
    en: {
        // Navigation
        homeLink: "Home",
        servicesLink: "eTool Kits",
        walletLink: "How It Works",
        aboutLink: "Examples",
        contactLink: "Contact",
        
        // Hero
        heroTitle: "OUR SERVICES MISSION AND VSION NEEDS TO BE CLEAREER  ",
        exploreServices: "Explore Services",
        contactUs: "Contact Us",
        
        // Stats
        projectsCompleted: "Projects Completed",
        fastDeliveryTime: "Fast Delivery Time",
        clientSatisfaction: "Client Satisfaction",
        
        // Auth
        login: "Login",
        logout: "Logout",
        
        // Cart
        cart: "Cart"
    },
    ar: {
        // Navigation
        homeLink: "الرئيسية",
        servicesLink: "الأدوات الإلكترونية",
        walletLink: "كيف يعمل",
        aboutLink: "الأمثلة",
        contactLink: "اتصل بنا",
        
        // Hero
        heroTitle: "دعم معماري احترافي يمكنك حجزه مباشرة",
        heroDescription: "دعم معماري احترافي يمكنك حجزه مباشرة",
        exploreServices: "استكشف الخدمات",
        contactUs: "اتصل بنا",
        
        // Stats
        projectsCompleted: "المشاريع المكتملة",
        fastDeliveryTime: "وقت التسليم السريع",
        clientSatisfaction: "رضا العملاء",
        
        // Auth
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        
        // Cart
        cart: "السلة"
    }
};

// Update navigation texts
function updateNavTexts() {
    const langTexts = texts[currentLang];
    
    // Desktop Navigation
    document.getElementById('homeLink').textContent = langTexts.homeLink;
    document.getElementById('servicesLink').textContent = langTexts.servicesLink;
    document.getElementById('walletLink').textContent = langTexts.walletLink;
    document.getElementById('aboutLink').textContent = langTexts.aboutLink;
    document.getElementById('contactLink').textContent = langTexts.contactLink;
    
    // Mobile Navigation
    document.getElementById('mobileHomeLink').textContent = langTexts.homeLink;
    document.getElementById('mobileServicesLink').textContent = langTexts.servicesLink;
    document.getElementById('mobilePortfolioLink').textContent = langTexts.walletLink;
    document.getElementById('mobileAboutLink').textContent = langTexts.aboutLink;
    document.getElementById('mobileContactLink').textContent = langTexts.contactLink;
    
    // Hero Section
    document.querySelector('.page-title').textContent = langTexts.heroTitle;
    document.querySelector('.page-description').textContent = langTexts.heroDescription;
    document.querySelector('#exploreServicesBtn .btn-text').textContent = langTexts.exploreServices;
    document.querySelector('#contactUsBtn .btn-text').textContent = langTexts.contactUs;
    
    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = langTexts.projectsCompleted;
    if (statLabels[1]) statLabels[1].textContent = langTexts.fastDeliveryTime;
    if (statLabels[2]) statLabels[2].textContent = langTexts.clientSatisfaction;
    
    // Auth buttons
    const isLoggedIn = localStorage.getItem('currentUser');
    document.getElementById('authText').textContent = isLoggedIn ? langTexts.logout : langTexts.login;
    document.getElementById('mobileAuthText').textContent = isLoggedIn ? langTexts.logout : langTexts.login;
    
    // Cart button
    document.querySelector('#cartBtn span:not(.material-symbols-outlined)').textContent = langTexts.cart;
    document.querySelector('#mobileCartBtn span:not(.material-symbols-outlined)').textContent = langTexts.cart;
    
    // Language button
    document.getElementById('langText').textContent = currentLang === 'en' ? 'EN' : 'AR';
    document.getElementById('mobileLangText').textContent = currentLang === 'en' ? 'EN' : 'AR';
    
    // Update body direction
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('siteLanguage', currentLang);
    updateNavTexts();
    showNotification(currentLang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English');
}

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // تحديث عدد السلة
    updateCartCount();
    
    // إضافة الخدمات للصفحة
    displayServices();
    
    // إعداد Event Listeners
    setupEventListeners();
    
    // إعداد تأثيرات التمرير
    setupScrollEffects();
    
    // إعداد العدادات المتحركة
    setupCounterAnimations();
    
    // إضافة تأثير ظهور الكاردات
    observeServiceCards();
    
    // ضمان عمل جميع أزرار الكاردات
    ensureAllCardsWorking();
    
    // Initialize language
    updateNavTexts();
    
    // Add language button listeners
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('mobileLangToggle').addEventListener('click', toggleLanguage);
    
    // Initialize mobile menu
    initMobileMenu();
}

// ========== SERVICE CARDS ==========

function ensureAllCardsWorking() {
    addServiceCardsEventListeners();
    console.log('All service cards are ready.');
}

function displayServices() {
    addServiceCardsEventListeners();
}

function addServiceCardsEventListeners() {
    const serviceCards = document.querySelectorAll('.service-card');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.add-to-cart-btn') && 
                !e.target.closest('.learn-more-btn') && 
                !e.target.closest('.quick-view-btn')) {
                const serviceId = parseInt(this.getAttribute('data-service-id'));
                openServiceModal(serviceId);
            }
        });
    });
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            addToCart(serviceId);
        });
    });
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            openServiceModal(serviceId);
        });
    });
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            openServiceModal(serviceId);
        });
    });
}

// ========== EVENT LISTENERS ==========

function setupEventListeners() {
    // Cart button
    cartBtn.addEventListener('click', openCartModal);
    
    // Close cart modal
    closeCartModalBtn.addEventListener('click', closeCartModal);
    
    // Checkout - PayPal
    checkoutBtn.addEventListener('click', checkoutToPayPal);
    
    // Clear cart
    clearCartBtn.addEventListener('click', clearCart);
    
    // Close service modal
    closeServiceModalBtn.addEventListener('click', closeServiceModal);
    closeServiceModalBtn2.addEventListener('click', closeServiceModal);
    
    // Add to cart from modal
    modalAddToCartBtn.addEventListener('click', addCurrentServiceToCart);
    
    // Explore Services button
    exploreServicesBtn.addEventListener('click', function() {
        document.querySelector('.services-grid').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Contact Us button
    contactUsBtn.addEventListener('click', function() {
        window.location.href = 'Contact.html';
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCartModal();
            closeServiceModal();
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
        if (event.target === serviceModal) {
            closeServiceModal();
        }
    });
}

// ========== SCROLL EFFECTS ==========

function setupScrollEffects() {
    // Scroll indicator
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // Show elements on scroll
    window.addEventListener('scroll', function() {
        const serviceCards = document.querySelectorAll('.service-card');
        const windowHeight = window.innerHeight;
        
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add('visible');
            }
        });
    });
}

// ========== COUNTER ANIMATIONS ==========

function setupCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent;
                clearInterval(timer);
            }
        }, stepTime);
        
        stat.classList.add('animated');
    });
}

// ========== OBSERVER FOR CARDS ==========

function observeServiceCards() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// ========== SERVICE MODAL ==========

function openServiceModal(serviceId) {
    currentServiceId = serviceId;
    const service = servicesData[serviceId];
    
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }
    
    // Update modal content
    document.getElementById('serviceModalTitle').textContent = service.title;
    document.getElementById('serviceModalServiceTitle').textContent = service.title;
    document.getElementById('serviceModalPrice').textContent = service.isHourly ? 
        `$${service.price.toFixed(2)}/hr` : `$${service.price.toFixed(2)}`;
    document.getElementById('serviceModalDescription').textContent = service.description;
    
    // Update image
    const serviceModalImage = document.getElementById('serviceModalImage');
    serviceModalImage.src = service.image;
    serviceModalImage.alt = service.title;
    
    // Update features
    const featuresList = document.getElementById('serviceModalFeatures');
    featuresList.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update add to cart button
    modalAddToCartBtn.setAttribute('data-service-id', serviceId);
    modalAddToCartBtn.innerHTML = service.isHourly ? 
        `<span class="material-symbols-outlined">add_shopping_cart</span> Book Session` :
        `<span class="material-symbols-outlined">add_shopping_cart</span> Add to Cart`;
    
    // Show modal
    serviceModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentServiceId = null;
}

// ========== CART FUNCTIONS ==========

function openCartModal() {
    renderCartContent();
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function addToCart(serviceId) {
    const service = servicesData[serviceId];
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }
    
    const existingItemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: serviceId,
            title: service.title,
            price: service.price,
            image: service.image,
            isHourly: service.isHourly || false,
            quantity: 1
        });
    }
    
    localStorage.setItem('servicesCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${service.title} added to cart!`);
    updateAddToCartButton(serviceId);
    
    if (cartModal.style.display === 'flex') {
        renderCartContent();
    }
}

function addCurrentServiceToCart() {
    if (currentServiceId) {
        addToCart(currentServiceId);
    }
}

function updateAddToCartButton(serviceId) {
    const addBtn = document.querySelector(`.add-to-cart-btn[data-service-id="${serviceId}"]`);
    if (addBtn) {
        addBtn.classList.add('added');
        addBtn.innerHTML = `<span class="material-symbols-outlined">check</span> Added`;
        
        setTimeout(() => {
            addBtn.classList.remove('added');
            const service = servicesData[serviceId];
            addBtn.innerHTML = service.isHourly ? 
                `<span class="material-symbols-outlined">add_shopping_cart</span> Book Session` :
                `<span class="material-symbols-outlined">add_shopping_cart</span> Add to Cart`;
        }, 2000);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartContent() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <span class="material-symbols-outlined cart-empty-icon">shopping_cart</span>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" id="startShoppingBtn" style="margin-top: 20px;">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    Start Shopping
                </button>
            </div>
        `;
        
        document.getElementById('startShoppingBtn')?.addEventListener('click', function() {
            closeCartModal();
            document.querySelector('.services-grid').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        cartTotalAmount.textContent = '$0.00';
    } else {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const service = servicesData[item.id];
            if (!service) {
                console.error('Service data not found for item:', item.id);
                return;
            }
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${service.image}" alt="${service.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${service.title}</h4>
                        <div class="cart-item-price">${service.isHourly ? `$${service.price.toFixed(2)}/hr` : `$${service.price.toFixed(2)}`}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                            <button class="remove-from-cart" data-id="${item.id}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Add quantity event listeners
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                updateCartQuantity(serviceId, -1);
            });
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                updateCartQuantity(serviceId, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    setCartQuantity(serviceId, newQuantity);
                }
            });
        });
        
        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                removeFromCart(serviceId);
            });
        });
    }
}

function updateCartQuantity(serviceId, change) {
    const itemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showNotification('Item removed from cart');
        }
        
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
    }
}

function setCartQuantity(serviceId, quantity) {
    const itemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    localStorage.setItem('servicesCart', JSON.stringify(cart));
    updateCartCount();
    renderCartContent();
    showNotification('Item removed from cart');
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
        showNotification('Cart cleared');
    }
}

function checkoutToPayPal() {
    window.open(
        'https://www.paypal.me/AsmaaAlbaz', 
        '_blank', 
        'noopener,noreferrer'
    );
    
    showNotification('Redirecting to PayPal...');
}

// ========== NOTIFICATION ==========

function showNotification(message) {
    notificationMessage.textContent = message;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.animation = '';
        }, 300);
    }, 3000);
}

// ========== AUTH FUNCTIONS ==========

function toggleAuth() {
    if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
        showNotification('تم تسجيل الخروج بنجاح');
        setTimeout(() => location.reload(), 500);
    } else {
        window.location.href = 'registar.html';
    }
}

function updateAuthButton() {
    const authText = document.getElementById('authText');
    if (authText) {
        authText.textContent = localStorage.getItem('currentUser') ? 'Logout' : 'Login';
    }
}

// ========== MOBILE MENU ==========

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('.material-symbols-outlined');
            if (mobileNav.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && 
                !mobileMenuBtn.contains(event.target) &&
                mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
            }
        });
    }
    
    // Mobile cart button
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', function() {
            document.getElementById('cartModal').style.display = 'flex';
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
    }
}

// ========== TESTIMONIALS ANIMATION ==========

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    const stats = document.querySelector('.stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('testimonial-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                } else {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 600);
                }
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
    if (stats) observer.observe(stats);
});

// ========== CONTACT BUTTON ==========

document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.location.href = 'contact.html#email-form';
        });
    }
});

// ========== PAYPAL BUTTON ==========

document.addEventListener('DOMContentLoaded', function() {
    const paypalButton = document.getElementById('checkoutBtn');
    
    if (paypalButton) {
        paypalButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://www.paypal.me/AsmaaAlbaz', '_blank');
        });
        
        paypalButton.onclick = function() {
            window.open('https://www.paypal.me/AsmaaAlbaz', '_blank');
            return false;
        };
    }
});

// ========== GLOBAL FUNCTIONS ==========

window.openServiceModal = openServiceModal;
window.addToCart = addToCart;
window.toggleAuth = toggleAuth;
window.toggleLanguage = toggleLanguage;

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateAuthButton);