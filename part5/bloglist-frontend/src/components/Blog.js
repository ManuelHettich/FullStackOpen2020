import React, { useState } from 'react'

const Blog = ({ blog, username, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const viewDetails = () => (
    <span className="blog">
      <span className="blog-hide" style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </span>
      <span className="blog-show" style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button className="likeButton" onClick={handleLike(blog)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === username && (
          <button className="delete-button" onClick={handleDelete(blog)}>
            remove
          </button>
        )}
      </span>
    </span>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {viewDetails()}
    </div>
  )
}

export default Blog
