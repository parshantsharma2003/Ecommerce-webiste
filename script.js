// script.js

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        price: 65.50,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.2,
        description: "Classic denim jacket for everyday wear."
    },
    {
        id: 3,
        name: "Modern Desk Lamp",
        price: 42.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.7,
        description: "Sleek and adjustable desk lamp with touch controls."
    },
    {
        id: 4,
        name: "Smart Fitness Watch",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
        rating: 4.8,
        description: "Track your fitness goals with this advanced smartwatch."
    },
    {
        id: 5,
        name: "Premium Yoga Mat",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.3,
        description: "Non-slip yoga mat with excellent cushioning."
    },
    {
        id: 6,
        name: "Designer Handbag",
        price: 129.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
        rating: 4.6,
        description: "Elegant handbag with multiple compartments."
    },
    {
        id: 7,
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
        rating: 4.4,
        description: "Compact speaker with impressive sound quality."
    },
    {
        id: 8,
        name: "Organic Skincare Set",
        price: 49.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1556228578-9c360e2d0b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        rating: 4.9,
        description: "Natural skincare products for glowing skin."
    }
];

// Cart Data
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.querySelector('.cart-btn');
const cartCountEl = document.querySelector('.cart-count');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');
const searchBtn = document.querySelector('.search-btn');
const closeSearch = document.querySelector('.close-search');
const searchOverlay = document.querySelector('.search-overlay');
const searchInput = document.querySelector('.search-input');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCart();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('panditCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});

// Display products
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found. Try a different filter.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        
        const ratingStars = getRatingStars(product.rating);
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">${ratingStars}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Generate rating stars
function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Product filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        if (filter === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === filter);
            displayProducts(filteredProducts);
        }
    });
});

// Add to cart functionality
function addToCart(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
    
    // Save cart to localStorage
    localStorage.setItem('panditCart', JSON.stringify(cart));
}

// Update cart UI
function updateCart() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    cartCountEl.textContent = cartCount;
    cartTotalEl.textContent = `$${cartTotal.toFixed(2)}`;
    
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to cart item buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Decrease item quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else {
        // Remove item if quantity becomes 0
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
    localStorage.setItem('panditCart', JSON.stringify(cart));
}

// Increase item quantity
function increaseQuantity(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    const cartItem = cart.find(item => item.id === productId);
    
    cartItem.quantity += 1;
    
    updateCart();
    localStorage.setItem('panditCart', JSON.stringify(cart));
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    
    updateCart();
    localStorage.setItem('panditCart', JSON.stringify(cart));
    
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3a86ff, #8338ec);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cart toggle
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty. Add some items first!');
        return;
    }
    
    showNotification('Checkout functionality would be implemented in a real e-commerce site!');
    // In a real application, this would redirect to a checkout page
    // window.location.href = 'checkout.html';
});

// Search functionality
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    searchInput.value = '';
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length === 0) {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
