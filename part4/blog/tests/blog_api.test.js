const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await api
    .post('/api/users')
    .send({
      username: helper.initialUser.username,
      password: helper.initialUser.password
    })
})


describe('check database functionality', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Go To Statement Considered Harmful')
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('successfully create a new blog post', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
    const token = loginResponse.body.token

    const newBlog = {
      title: 'Test Blog Title',
      author: 'Foo Bar',
      url: 'localhost',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Test Blog Title')
  })

  test('missing likes property defaults to value 0', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
    const token = loginResponse.body.token


    const newBlog = {
      title: 'Test Blog Title #2',
      author: 'Foo Baz',
      url: 'localhost'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('check error if title and url properties are missing', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
    const token = loginResponse.body.token

    const newBlogNoTitle = {
      url: 'localhost'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoTitle)
      .expect(400)

    const newBlogNoUrl = {
      title: 'Test Blog Title #3'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoUrl)
      .expect(400)

    const newBlogNoTitleNoUrl = {
      author: 'Baz Foo'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoTitleNoUrl)
      .expect(400)
  })

  test('check correct status code if no token is provided', async () => {
    const newBlog = {
      title: 'Test Blog Title',
      author: 'Foo Bar',
      url: 'localhost',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})


afterAll(() => {
  mongoose.connection.close()
})