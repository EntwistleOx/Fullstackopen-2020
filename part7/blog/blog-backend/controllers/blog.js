const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    req.body.likes = req.body.likes || 0;
    req.body.user = user._id;
    const blog = new Blog(req.body);
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    const newBlog = await Blog.findById(result._id).populate('user', {
      username: 1,
      name: 1,
    });
    res.status(201).json(newBlog);
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

blogRouter.patch('/:id/comments', async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updatedNote = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: body.comment } },
      { new: true },
    );
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    // Get token and decode
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    // Blog id to delete
    const id = req.params.id;

    // Search user and blog
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(id);

    if (user.id === blog.user.toString()) {
      await Blog.findByIdAndRemove(id);
      res.status(204).end();
    } else {
      return res.status(401).json({ error: 'only owner can delete this blog' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
