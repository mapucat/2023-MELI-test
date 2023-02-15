import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../helpers/test-facilities/test-facilities'
import { type ApiResponse } from '../../types/api-response.d'
import * as itemService from '../../services/items.service'
import ItemsPage from './items.page'

const response = {
  meta: { status: 200, message: "Data found" },
  response: {
    success: true,
    data: {
      author: { name: "Maria Paula", lastname: "Rodriguez Escobar" },
      categories: ["Celulares y Teléfonos", "Celulares y Smartphones"],
      items: [{ id: "MLA1128679881", title: "Zte Blade V30 Vita 128 Gb  Gris 3 Gb Ram", price: { currency: "ARS", amount: 44999 }, picture: "http://http2.mlstatic.com/D_857357-MLA52130650460_102022-I.jpg", condition: "new", free_shipping: true, city: "C.A.B.A" }, { id: "MLA1266352786", title: "Telefono Celular Alcatel 3h Plus 64gb 3gb Ram Space Gray", price: { currency: "ARS", amount: 39299 }, picture: "http://http2.mlstatic.com/D_630013-MLA50879230016_072022-I.jpg", condition: "new", free_shipping: true, city: "C.A.B.A" }, { id: "MLA1330728270", title: " Moto E20 32 Gb  Azul Aqua 2 Gb Ram", price: { currency: "ARS", amount: 37989 }, picture: "http://http2.mlstatic.com/D_701445-MLA48048696977_102021-I.jpg", condition: "new", free_shipping: true, city: "La Plata" }, { id: "MLA1142471087", title: " Moto G22 128 Gb  Iceberg Blue 4 Gb Ram", price: { currency: "ARS", amount: 64999 }, picture: "http://http2.mlstatic.com/D_724765-MLA50262139770_062022-I.jpg", condition: "new", free_shipping: true, city: "Villa Celina" }]
    }
  }
} as ApiResponse

describe('ItemsPage is rendered', () => {
  beforeEach(() =>
    jest.spyOn(itemService, "getItems").mockImplementation(async () => await Promise.resolve(response)))

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('when search query param is setted then it should display the required components', async () => {
    renderWithRouter(<ItemsPage />, { route: '/items?search=celular' })
    // Breadcrumb
    expect(await screen.findByText('Celulares y Teléfonos >')).toBeDefined()
    expect(await screen.findByText('Celulares y Smartphones')).toBeDefined()
    // Items quantity
    await waitFor(() => expect(screen.getAllByRole('article').length).toBe(4))
  })

  test('when search query param is NOT setted then it should display none components', async () => {
    renderWithRouter(<ItemsPage />, { route: '/items?search=' })
    // Breadcrumb
    await waitFor(() => expect(screen.queryByText('Celulares y Teléfonos >')).toBeNull())
    await waitFor(() => expect(screen.queryByText('Celulares y Smartphones')).toBeNull())
    // Items quantity
    await waitFor(() => expect(screen.queryAllByRole('article').length).toBe(0))
  })
})
