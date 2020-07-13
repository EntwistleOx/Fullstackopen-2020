const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    req.body.likes = req.body.likes || 0;
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
