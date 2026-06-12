const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Get all articles (published only for public)
router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        
        const category = req.query.category;
        const query = category && category !== 'all' ? { status: 'published', category } : { status: 'published' };
        
        const articles = await Article.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'name email');
        
        const total = await Article.countDocuments(query);
        
        res.json({ articles, total, page, pages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single article
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate('author', 'name email');
        
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search articles
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.json({ articles: [] });
        
        const articles = await Article.find({
            $text: { $search: query },
            status: 'published'
        }).limit(20);
        
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create article (admin only)
router.post('/', auth, upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, content, excerpt, category } = req.body;
        
        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const article = new Article({
            title,
            content,
            excerpt: excerpt || content.substring(0, 200),
            category,
            author: req.userId,
            featuredImage: req.file ? `/uploads/${req.file.filename}` : null,
            status: req.body.status || 'draft'
        });
        
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update article (admin only)
router.put('/:id', auth, upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, content, excerpt, category, status } = req.body;
        
        let article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        
        if (article.author.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        article.title = title || article.title;
        article.content = content || article.content;
        article.excerpt = excerpt || article.excerpt;
        article.category = category || article.category;
        article.status = status || article.status;
        if (req.file) article.featuredImage = `/uploads/${req.file.filename}`;
        
        await article.save();
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete article (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        
        if (article.author.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add comment
router.post('/:id/comments', async (req, res) => {
    try {
        const { name, email, comment } = req.body;
        
        if (!name || !email || !comment) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { name, email, comment } } },
            { new: true }
        );
        
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get comments
router.get('/:id/comments', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id, 'comments');
        res.json(article.comments || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;