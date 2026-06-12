// DOM Elements
const articlesGrid = document.getElementById('articlesGrid');
const featuredArticle = document.getElementById('featuredArticle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const newsletterForm = document.getElementById('newsletterForm');

// State
let currentCategory = 'all';
let allArticles = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    setupEventListeners();
    initTheme();
});

// Setup Event Listeners
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Category Filter
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });

    // Search
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Newsletter
    newsletterForm.addEventListener('submit', handleNewsletterSignup);
}

// Load Articles
async function loadArticles() {
    try {
        articlesGrid.innerHTML = '<div class="loading">Loading articles...</div>';
        
        const data = await API.getArticles(currentCategory);
        allArticles = data.articles || [];

        if (allArticles.length === 0) {
            articlesGrid.innerHTML = '<div class="loading">No articles found</div>';
            return;
        }

        // Display featured article
        if (allArticles.length > 0) {
            displayFeaturedArticle(allArticles[0]);
        }

        // Display articles grid
        displayArticlesGrid(allArticles);
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesGrid.innerHTML = '<div class="loading">Error loading articles</div>';
    }
}

// Display Featured Article
function displayFeaturedArticle(article) {
    if (!article) return;

    const timeAgo = getTimeAgo(new Date(article.createdAt));
    
    featuredArticle.innerHTML = `
        <div class="featured-image">
            <img src="${article.featuredImage || 'https://via.placeholder.com/800x400'}" alt="${article.title}">
            <span class="breaking-badge">BREAKING</span>
        </div>
        <div class="featured-content">
            <span class="article-date">${timeAgo}</span>
            <h2>${escapeHtml(article.title)}</h2>
            <p>${escapeHtml(article.content.substring(0, 200))}...</p>
            <a href="article.html?id=${article._id}" class="read-more">Read Full Story →</a>
        </div>
    `;
}

// Display Articles Grid
function displayArticlesGrid(articles) {
    if (articles.length === 0) {
        articlesGrid.innerHTML = '<div class="loading">No articles to display</div>';
        return;
    }

    articlesGrid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-image">
                <img src="${article.featuredImage || 'https://via.placeholder.com/300x200'}" alt="${article.title}">
            </div>
            <div class="article-body">
                <span class="article-category">${escapeHtml(article.category)}</span>
                <h3>${escapeHtml(article.title)}</h3>
                <div class="article-meta">
                    <span>${getTimeAgo(new Date(article.createdAt))}</span>
                    <span class="article-views">👁️ ${article.views || 0}</span>
                </div>
                <p class="article-excerpt">${escapeHtml(article.content.substring(0, 120))}...</p>
                <div class="article-footer">
                    <a href="article.html?id=${article._id}" class="read-article">Read More</a>
                </div>
            </div>
        </article>
    `).join('');
}

// Handle Category Filter
function handleCategoryFilter(e) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    loadArticles();
}

// Handle Search
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        loadArticles();
        return;
    }

    try {
        articlesGrid.innerHTML = '<div class="loading">Searching...</div>';
        const data = await API.searchArticles(query);
        allArticles = data.articles || [];
        displayArticlesGrid(allArticles);
    } catch (error) {
        console.error('Search error:', error);
        articlesGrid.innerHTML = '<div class="loading">Search error</div>';
    }
}

// Handle Newsletter Signup
async function handleNewsletterSignup(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    try {
        // Here you would typically send the email to your backend
        console.log('Newsletter signup:', email);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = '✓ Thank you for subscribing!';
        successMsg.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => successMsg.remove(), 3000);
        e.target.reset();
    } catch (error) {
        console.error('Newsletter signup error:', error);
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Initialize Theme
function initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

// Utility Functions
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return 'Just now';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);