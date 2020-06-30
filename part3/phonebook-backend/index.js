const express = require('express');
const morgan = require('morgan');

const app = express();

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
  {
    name: 'Juan Diaz',
    number: '56963472861',
    id: 5,
  },
];

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan('tiny'));

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

const getId = () => {
  return Math.floor(Math.random() * Math.floor(1000));
};

app.get('/info', (req, res) => {
  const total = persons.length;
  const date = new Date();
  res.send(`<p>Phonebook has ${total} contacs!</p><p>${date}</p>`);
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number)
    return res.status(400).json({ error: 'missing content!' });

  const found = persons.find((person) => person.name === body.name);

  if (found)
    return res.status(400).json({ error: `${body.name} already exist!` });

  const person = {
    name: body.name,
    number: body.number,
    id: getId(),
  };

  persons = persons.concat(person);
  res.json(persons);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) return res.status(404).end();
  res.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
