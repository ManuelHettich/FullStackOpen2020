import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandlerLike
  let mockHandlerDelete

  beforeEach(() => {
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

    mockHandlerLike = jest.fn()
    mockHandlerDelete = jest.fn()

    component = render(
      <Blog
        blog={blog}
        username="foo"
        handleLike={() => mockHandlerLike}
        handleDelete={mockHandlerDelete}
      />
    )
  })

  test('renders content correctly without detailed view', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('Foo')

    const span_show = component.container.querySelector('.blog-show')
    expect(span_show).toHaveStyle('display: none')
    const span_hide = component.container.querySelector('.blog-hide')
    expect(span_hide).not.toHaveStyle('display: none')
  })

  test('shows detailed view after button click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const span_show = component.container.querySelector('.blog-show')
    expect(span_show).not.toHaveStyle('display: none')
    const span_hide = component.container.querySelector('.blog-hide')
    expect(span_hide).toHaveStyle('display: none')
  })

  test('handleLike is called twice when like button clicked twice', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
