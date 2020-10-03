const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
})


describe('check error messages for invalid new users', () => {
  test('invalid user without username or password', async () => {
    let response = await api
      .post('/api/users')
      .send({
        name: 'Foo Bar',
        password: '123456'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('Path `username` is required.')

    response = await api
      .post('/api/users')
      .send({
        username: 'foobar',
        name: 'Foo Bar'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(0)
  })

  test('username or password have less than 3 chars', async () => {
    let response = await api
      .post('/api/users')
      .send({
        username: 'fo',
        name: 'Foo Bar',
        password: '123456'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('shorter than the minimum allowed length')

    response = await api
      .post('/api/users')
      .send({
        username: 'foobar',
        name: 'Foo Bar',
        password: '12'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})