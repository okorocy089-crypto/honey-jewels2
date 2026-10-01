// ============================================
// HONEY JEWELS - MAIN JAVASCRIPT
// Cart, Slider, and Interactions
// ============================================

// ============================================
// HERO SLIDER
// ============================================
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-dots .dot');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.currentSlide = 0;
        this.autoPlayInterval = 5000;
        this.autoPlayTimer = null;

        this.init();
    }

    init() {
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => this.stopAutoPlay());
            hero.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
}

// ============================================
// SHOPPING CART
// ============================================
class ShoppingCart {
    constructor() {
        this.items = [];
        this.drawer = document.getElementById('cartDrawer');
        this.cartBtn = document.getElementById('cartBtn');
        this.cartCountEl = document.getElementById('cartCount');
        this.cartItemsEl = document.getElementById('cartItems');
        this.cartEmptyEl = document.getElementById('cartEmpty');
        this.cartFooterEl = document.getElementById('cartFooter');
        this.cartTotalEl = document.getElementById('cartTotal');
        this.cartItemCountEl = document.getElementById('cartItemCount');

        this.init();
    }

    init() {
        // Load cart from localStorage
        this.loadCart();

        // Cart button event
        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.openCart());
        }

        // Update UI
        this.updateUI();
    }

    loadCart() {
        const saved = localStorage.getItem('honeyJewelsCart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
    }

    saveCart() {
        localStorage.setItem('honeyJewelsCart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                material: product.material,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateUI();
        this.showToast(`${product.name} added to bag`);
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateUI();
    }

    updateQuantity(id, quantity) {
        if (quantity < 1) {
            this.removeItem(id);
            return;
        }

        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateUI();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateUI() {
        const count = this.getItemCount();
        const total = this.getTotal();

        // Update cart count badge
        if (this.cartCountEl) {
            this.cartCountEl.textContent = count;
            this.cartCountEl.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update cart item count in header
        if (this.cartItemCountEl) {
            this.cartItemCountEl.textContent = count;
        }

        // Show/hide empty state and footer
        if (this.items.length === 0) {
            if (this.cartEmptyEl) this.cartEmptyEl.style.display = 'flex';
            if (this.cartItemsEl) this.cartItemsEl.style.display = 'none';
            if (this.cartFooterEl) this.cartFooterEl.style.display = 'none';
        } else {
            if (this.cartEmptyEl) this.cartEmptyEl.style.display = 'none';
            if (this.cartItemsEl) this.cartItemsEl.style.display = 'block';
            if (this.cartFooterEl) this.cartFooterEl.style.display = 'block';

            // Render cart items
            this.renderCartItems();
        }

        // Update total
        if (this.cartTotalEl) {
            this.cartTotalEl.textContent = '₦' + total.toLocaleString();
        }
    }

    renderCartItems() {
        if (!this.cartItemsEl) return;

        this.cartItemsEl.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-material">${item.material}</p>
                    <p class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-item" onclick="cart.removeItem(${item.id})" aria-label="Remove item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openCart() {
        if (this.drawer) {
            this.drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        if (this.drawer) {
            this.drawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateUI();
    }

    checkoutViaWhatsApp() {
        if (this.items.length === 0) {
            this.showToast('Your bag is empty');
            return;
        }

        // Build WhatsApp message
        let message = 'Hello Honey Jewels! I would like to place an order:\n\n';

        this.items.forEach(item => {
            message += `• ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
        });

        message += `\nTotal: ₦${this.getTotal().toLocaleString()}\n\n`;
        message += 'Please confirm availability and send payment details. Thank you!';

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Show confirmation
        this.showToast('Opening WhatsApp...');
    }
}

// ============================================
// GLOBAL FUNCTIONS (for onclick handlers)
// ============================================
let cart;

function addToCart(button) {
    const card = button.closest('.product-card');
    if (!card) return;

    const product = {
        id: parseInt(card.dataset.productId),
        name: card.dataset.productName,
        price: card.dataset.productPrice,
        image: card.dataset.productImage,
        material: card.dataset.productMaterial
    };

    cart.addItem(product);

    // Visual feedback
    const originalText = button.textContent;
    button.textContent = 'Added ✓';
    button.classList.add('added');

    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
    }, 1500);
}

function closeCart() {
    cart.closeCart();
}

function checkoutViaWhatsApp() {
    cart.checkoutViaWhatsApp();
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    new HeroSlider();

    // Initialize cart
    cart = new ShoppingCart();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize nav scroll effect
    initNavScroll();

    // Close cart on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.closeCart();
        }
    });
});

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HeroSlider, ShoppingCart };
}
