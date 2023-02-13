import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithRouter } from './helpers/test-facilities/test-facilities'

import PagesRoutes from './routes'

describe('When PageRoutes is rendered', () => {
  test('It should display the page required for "/"', () => {
    renderWithRouter(<PagesRoutes />, { route: '/' })
    expect(screen.getByRole('main')).toBeDefined()
    expect(screen.getByRole('main')).toBeEmptyDOMElement()
  })
})
