import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setNotificationStatus('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUsername('')
      setPassword('')
      setNotificationMessage('successfully logged in')
      setNotificationStatus('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNotificationMessage('logged out')
    setNotificationStatus('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const handleBlogTitleChange = event => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = event => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = event => {
    setNewBlogUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>
        title: <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        /><br/>
      </label>
      <label>
        author: <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        /><br/>
      </label>
      <label>
        url: <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        /><br/>
      </label>
      
      <button type='submit'>create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} status={notificationStatus} />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={notificationMessage} status={notificationStatus} />

        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <h2>create new</h2>
        {blogForm()}

        <p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </p>
      </div>
    )
  }
}

export default App