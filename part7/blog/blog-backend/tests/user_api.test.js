const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test('a user can login with correct credentials', async () => {
  const newUser = {
    username: 'juand',
    name: 'Juan Díaz',
    password: 'password',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const userToLogin = {
    username: 'juand',
    password: 'password',
  };

  await api.post('/api/login').send(userToLogin).expect(200);
});

test('adding a new user fails if invalid data and return proper msg/status code', async () => {
  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'ab',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('invalid password length');
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
