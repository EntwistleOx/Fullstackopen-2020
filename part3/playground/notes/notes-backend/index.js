const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/note');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// const genId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.get('/', (req, res) => {
  res.send('Hello humans! 👽');
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: 'content is missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  // notes = notes.concat(note);
  // res.json(note);
  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.get('/api/notes', (req, res) => {
  // res.json(notes);
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  // const note = notes.find((note) => note.id === id);

  // if (note) {
  //   res.json(note);
  // } else {
  //   res.status(404).end();
  // }
  Note.findById(id).then((note) => {
    res.json(note);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
