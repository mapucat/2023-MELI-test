import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UIInputSearch from './input-search'

describe('When UIInputSearch is rendered', () => {
  test('should display the required components', () => {
    const onChange = jest.fn()

    render(<UIInputSearch label='Buscar' value='My query' onChange={onChange}/>)

    const inputSearch = screen.getByRole('textbox', { name: 'Buscar' })
    expect(inputSearch).toBeDefined()
    expect(inputSearch).toHaveValue('My query')

    userEvent.type(inputSearch, 'My query 2')
    expect(onChange).toHaveBeenCalled()
  })
})
