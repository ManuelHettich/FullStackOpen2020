const groupBy = require('lodash/groupBy')
const forIn = require('lodash/forIn')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => accumulator + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const favoriteBlog = blogs.reduce((favoriteBlog, current) => {
      return current.likes > favoriteBlog.likes ? current : favoriteBlog
    }, blogs[0])
    return {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    // group entries by author
    const blogsByAuthor = groupBy(blogs, blog => blog.author)
    // create array with {author, blogs} entries
    const authorsAndBlogs = []
    forIn(blogsByAuthor, (value, key) => {
      authorsAndBlogs.push({ author: key, blogs: value.length })
    })

    // return entry with most blogs
    return authorsAndBlogs.reduce((mostBlogs, current) => {
      return current.blogs > mostBlogs.blogs ? current : mostBlogs
    })
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}