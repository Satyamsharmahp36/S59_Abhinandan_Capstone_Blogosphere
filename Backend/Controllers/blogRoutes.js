const express = require('express');
const router = express.Router();
require('dotenv').config()
const Blog = require('../Models/blogSchema');
const jwt = require('jsonwebtoken')

const blogJoiSchema = require('../Models/Joi Schema/JoiBlogSchema')

// GET Route
router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json({ blogs });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Token Verification
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.username = decoded.username;
    next(); 
  });
};
  
// POST Route for creating Blog
router.post('/createPost', verifyToken, async (req, res) => {
  const { title, description, selectedCategory, content, image } = req.body;
  const username = req.username;
  try {
    if (!title || !description || !selectedCategory || !content || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const validationResult = blogJoiSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }

    const newBlog = new Blog({
      title,
      description,
      selectedCategory,
      content,
      username,
      image,
      createdAt: new Date()
    });
    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: savedBlog });
  } 
  catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: error });
  }
})

module.exports = router