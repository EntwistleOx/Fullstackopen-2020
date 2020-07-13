const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some notes saved', () => {
  test('notes return as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('there are a specific note', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain('Browser can execute only Javascript');
  });
});

describe('viewing a new note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    console.log(validNonexistingId);

    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe('adition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      date: new Date(),
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await helper.notesInDb();
    expect(response).toHaveLength(helper.initialNotes.length + 1);

    const contents = response.map((r) => r.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('fails with status code 400 if invalid data', async () => {
    const newNote = {
      important: true,
      date: new Date(),
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const response = await helper.notesInDb();

    expect(response).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
