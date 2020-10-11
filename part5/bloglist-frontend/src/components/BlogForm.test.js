import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form calls the event handler correctly when creating a new blog', () => {
    const mockHandlerCreateBlog = jest.fn()

    const component = render(<BlogForm createBlog={mockHandlerCreateBlog} />)

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'Test Title' },
    })
    fireEvent.change(author, {
      target: { value: 'Foo Bar' },
    })
    fireEvent.change(url, {
      target: { value: 'localhost' },
    })
    fireEvent.submit(form)

    expect(mockHandlerCreateBlog.mock.calls).toHaveLength(1)
    expect(mockHandlerCreateBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(mockHandlerCreateBlog.mock.calls[0][0].author).toBe('Foo Bar')
    expect(mockHandlerCreateBlog.mock.calls[0][0].url).toBe('localhost')
  })
})
