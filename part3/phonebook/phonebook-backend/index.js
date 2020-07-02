const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');
const app = express();

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

// app.use(requestLogger);

// const getId = () => {
//   return Math.floor(Math.random() * Math.floor(1000));
// };

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    // res.json(persons);
    const total = persons.length;
    const date = new Date();
    res.send(`<p>Phonebook has ${total} contacs!</p><p>${date}</p>`);
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number)
    return res.status(400).json({ error: 'missing content!' });

  // const found = persons.find((person) => person.name === body.name);
  // Person.find({ name: body.name }).then((person) => {
  //   // res.json(persons);
  //   return res.status(400).json({ error: `${person.name} already exist!` });
  // });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // persons = persons.concat(person);
  // res.json(person);
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello Human 🖖👽</h1>');
});

app.get('/api/persons', (req, res) => {
  // res.json(persons);
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  // const person = persons.find((person) => person.id === id);
  // if (!person) return res.status(404).end();
  // res.json(person);
  Person.findById(id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
