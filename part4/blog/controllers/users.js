const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'password too short (min 3 chars)' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, id: 1})
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter