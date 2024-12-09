const express = require('express');
const BlogPost = require('../models/blogPost');
const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// Create a new blog post
router.post('/', async (req, res) => {
    console.log(req.body)
    const { title, content, author, tags } = req.body;
    try {
        const newPost = new BlogPost({ title, content, author, tags });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// Update a blog postso
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            id,
            { title, content, tags, updatedAt: Date.now() },
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BlogPost.findByIdAndDelete(id);
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

module.exports = router;
