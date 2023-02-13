import { screen } from '@testing-library/react'
import React from 'react'
import Header from './header'
import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useHref: jest.fn()
}))

describe('When Header is rendered', () => {
  test('should display the required components', () => {
    renderWithRouter(<Header/>)
    const header = screen.getByRole('banner')
    expect(header).toBeDefined()
  })
})
