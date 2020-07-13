const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialData = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
];

const newBlog = {
  title: 'Fundation',
  author: 'Isaac Asimov',
  url: 'http://asimov.org',
};

const newBlogNoTitle = {
  author: 'Isaac Asimov',
  likes: 0,
};

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogsObj = initialData.map((blog) => new Blog(blog));
  const promiseArr = blogsObj.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

test('blogs return correct amount of blogs', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body).toHaveLength(initialData.length);
});

test('blog identifier field is id', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body[0].id).toBeDefined();
});

test('a blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await api.get('/api/blogs');
  expect(blogs.body).toHaveLength(initialData.length + 1);

  const titles = blogs.body.map((blog) => blog.title);
  expect(titles).toContain('Fundation');
});

test('if likes property is missing default will be zero', async () => {
  await api.post('/api/blogs').send(newBlog).expect(201);
  const blogs = await api.get('/api/blogs');
  expect(blogs.body[3].likes).toBe(0);
});

test('bad request if title and url properties are missing', async () => {
  await api.post('/api/blogs').send(newBlogNoTitle).expect(400);
});

test('can update a note with valid id', async () => {
  const blogs = await api.get('/api/blogs');
  const blogToUpdate = blogs.body[0];

  const dataToUpdate = {
    author: 'Mr Michael Chan',
  };

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(dataToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterUpdate = await api.get('/api/blogs');
  const contents = blogsAfterUpdate.body.map((blog) => blog.author);

  expect(contents).toContain(updatedBlog.body.author);
});

test('can delete a note', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get('/api/blogs');

  expect(blogsAtEnd.body).toHaveLength(initialData.length - 1);

  const contents = blogsAtEnd.body.map((blog) => blog.title);

  expect(contents).not.toContain(blogToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
