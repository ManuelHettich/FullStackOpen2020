import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title: <input value={newBlogTitle} onChange={handleBlogTitleChange} />
          <br />
        </label>
        <label>
          author:{' '}
          <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
          <br />
        </label>
        <label>
          url: <input value={newBlogUrl} onChange={handleBlogUrlChange} />
          <br />
        </label>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
