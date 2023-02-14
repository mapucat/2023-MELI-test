import { screen } from '@testing-library/react'
import Header from './header'
import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useHref: jest.fn()
}))

describe('Header is rendered', () => {
  test('then it should display the required components', () => {
    renderWithRouter(<Header/>)
    const header = screen.getByRole('banner')
    expect(header).toBeDefined()
  })
})
