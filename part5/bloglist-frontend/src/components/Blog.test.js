import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content correctly without detailed view', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Foo',
    url: 'localhost',
    likes: 0,
    user: {
      name: 'Bar',
      username: 'bar',
    },
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      username="foo"
      handleLike={mockHandler}
      handleDelete={mockHandler}
    />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent('Foo')

  const span = component.container.querySelector('.blog-show')
  expect(span).toHaveStyle('display: none')
})
