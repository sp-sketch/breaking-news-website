// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Helper Functions
const API = {
    // Articles
    async getArticles(category = 'all', page = 1) {
        try {
            const endpoint = category === 'all' 
                ? `${API_BASE_URL}/articles?page=${page}`
                : `${API_BASE_URL}/articles?category=${category}&page=${page}`;
            
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch articles');
            return await response.json();
        } catch (error) {
            console.error('Error fetching articles:', error);
            return { articles: [], total: 0 };
        }
    },

    async getArticleById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${id}`);
            if (!response.ok) throw new Error('Failed to fetch article');
            return await response.json();
        } catch (error) {
            console.error('Error fetching article:', error);
            return null;
        }
    },

    async createArticle(formData, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) throw new Error('Failed to create article');
            return await response.json();
        } catch (error) {
            console.error('Error creating article:', error);
            return null;
        }
    },

    async updateArticle(id, formData, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) throw new Error('Failed to update article');
            return await response.json();
        } catch (error) {
            console.error('Error updating article:', error);
            return null;
        }
    },

    async deleteArticle(id, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete article');
            return await response.json();
        } catch (error) {
            console.error('Error deleting article:', error);
            return null;
        }
    },

    // Categories
    async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    async createCategory(name, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            if (!response.ok) throw new Error('Failed to create category');
            return await response.json();
        } catch (error) {
            console.error('Error creating category:', error);
            return null;
        }
    },

    // Authentication
    async register(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error('Registration failed');
            return await response.json();
        } catch (error) {
            console.error('Error registering:', error);
            return null;
        }
    },

    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    },

    // Search
    async searchArticles(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Error searching articles:', error);
            return { articles: [] };
        }
    },

    // Comments
    async getComments(articleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            return await response.json();
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    },

    async addComment(articleId, name, email, comment) {
        try {
            const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, comment })
            });
            if (!response.ok) throw new Error('Failed to add comment');
            return await response.json();
        } catch (error) {
            console.error('Error adding comment:', error);
            return null;
        }
    }
};

// Export API
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}