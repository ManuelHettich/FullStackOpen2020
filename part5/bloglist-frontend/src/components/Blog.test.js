import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

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

    const mockHandler = jest.fn()

    component = render(
      <Blog
        blog={blog}
        username="foo"
        handleLike={mockHandler}
        handleDelete={mockHandler}
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
})
