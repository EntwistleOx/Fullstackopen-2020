const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.json(savedNote);
});

notesRouter.put('/:id', (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const note = {
      content: body.content,
      important: body.important,
    };

    const updatedNote = Note.findByIdAndUpdate(id, note, { new: true });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Note.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = notesRouter;
