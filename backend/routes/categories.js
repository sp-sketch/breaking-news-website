const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create category (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, color } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        
        const category = new Category({ name, description, color });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Update category (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, description, color } = req.body;
        
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, color },
            { new: true, runValidators: true }
        );
        
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete category (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;