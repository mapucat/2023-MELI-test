import { screen } from '@testing-library/react'
import React from 'react'
import PreviewItem from './preview-item'
import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'
import type IPreviewItem from '../../../types/search-data'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useHref: jest.fn()
}))

const testItem: IPreviewItem = {
  id: "MLA1184760504",
  title: "Quantum Q20 Dual Sim 128 Gb Azul 4 Gb Ram",
  price: {
    currency: "ARS",
    amount: 38999
  },
  picture: "http://http2.mlstatic.com/D_919873-MLA50185644201_062022-I.jpg",
  condition: "new",
  free_shipping: true,
  city: "Villa Urquiza"
}

describe('PreviewItem is rendered', () => {
  test('then it should display the required components', () => {
    renderWithRouter(<PreviewItem item={testItem}/>)
    const previewItemElement: HTMLElement = screen.getByRole('article')
    expect(previewItemElement).toBeDefined()
    screen.getAllByRole('link')
      .map((link) =>
        expect(link).toHaveProperty('href', 'http://localhost/items/MLA1184760504'))
    expect(screen.getByText(testItem.title)).toBeInTheDocument()
    expect(screen.getByText('$ 38,999')).toBeInTheDocument()
    expect(screen.getByText(testItem.city)).toBeInTheDocument()
  })
})
