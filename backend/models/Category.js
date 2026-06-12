const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    color: {
        type: String,
        default: '#FF0000'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate slug before saving
categorySchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    }
    next();
});

module.exports = mongoose.model('Category', categorySchema);