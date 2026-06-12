const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        trim: true,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ['Politics', 'Sports', 'Technology', 'Health', 'Entertainment', 'World', 'Business'],
        default: 'World'
    },
    featuredImage: {
        type: String
    },
    images: [{
        url: String,
        caption: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    comments: [{
        name: String,
        email: String,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt before saving
articleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for search
articleSchema.index({ title: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('Article', articleSchema);