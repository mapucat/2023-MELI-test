import React from 'react'

import { renderWithRouter } from '../../helpers/test-facilities/test-facilities'
import SearchPage from './search.page'

describe('When SearchPage is rendered', () => {
  test('should display the required components', () => {
    const { container } = renderWithRouter(<SearchPage/>)
    expect(container).toBeEmptyDOMElement()
  })
})
