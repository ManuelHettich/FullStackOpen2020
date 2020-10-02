const dummy = (blogs) => {
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

module.exports = {
  dummy, totalLikes, favoriteBlog
}