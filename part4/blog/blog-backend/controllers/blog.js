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

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updatedNote = await Blog.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
