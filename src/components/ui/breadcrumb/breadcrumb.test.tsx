import React from 'react'
import { screen } from '@testing-library/react'
import Breadcrumb from './breadcrumb'
import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'

const categoriesList = [
  'Celulares y Teléfonos',
  'Celulares y Smartphones'
]

describe('Breadcrumb is rendered', () => {
  test('then it should display the required components', () => {
    renderWithRouter(<Breadcrumb categories={categoriesList} />)
    expect(screen.getByText('Celulares y Teléfonos >')).toBeDefined()
    expect(screen.getByText('Celulares y Smartphones')).toBeDefined()
  })
})
