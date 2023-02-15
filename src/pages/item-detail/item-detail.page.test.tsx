import Router from "react-router-dom"
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../helpers/test-facilities/test-facilities'
import { type ApiResponse } from '../../types/api-response'
import * as itemService from '../../services/items.service'
import ItemDetailPage from './item-detail.page'

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

const response = {
  meta: { status: 200, message: "Data found" },
  response: {
    success: true,
    data: {
      author: { name: "Maria Paula", lastname: "Rodriguez Escobar" },
      item: {
        id: "MLA1184760504", title: "Quantum Q20 Dual Sim 128 Gb  Azul 4 Gb Ram", price: { currency: "ARS", amount: 40999 }, picture: "http://http2.mlstatic.com/D_919873-MLA50185644201_062022-O.jpg", condition: "new", free_shipping: true, sold_quantity: 50, description: "Fotografía profesional en tu bolsillo\nDescubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.\n\nAdemás, con la cámara frontal con flash preparate para compartir selfies más iluminadas en tus redes sociales.\n\nMayor rendimiento\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.\n\nDesbloqueo facial y dactilar\nMáxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.\n\nBatería de duración superior\n¡Desenchufate! Con la súper batería de 4000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas."
      }
    }
  }
} as ApiResponse

describe('ItemsPage is rendered', () => {
  beforeEach(() => {
    // jest.mock('react-router-dom', () => ({
    //   useParams: jest.fn().mockReturnValue({ id: 'MLA1184760504' })
    // }))

    jest.spyOn(itemService, "getItemDetail").mockImplementation(async () => await Promise.resolve(response))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('when param id is setted then it should display the required components', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'MLA1184760504' })

    renderWithRouter(<ItemDetailPage />, { route: '/items/MLA1184760504' })
    // Breadcrumb
    // expect(await screen.findByText('Celulares y Teléfonos >')).toBeDefined()
    // expect(await screen.findByText('Celulares y Smartphones')).toBeDefined()
    // Items quantity should be 1
    await waitFor(() => expect(screen.getAllByRole('article')?.length).toBe(1))
  })

  test('when search query param is NOT setted then it should display none components', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '' })
    renderWithRouter(<ItemDetailPage />, { route: '/items/' })
    // Breadcrumb
    // await waitFor(() => expect(screen.queryByText('Celulares y Teléfonos >')).toBeNull())
    // await waitFor(() => expect(screen.queryByText('Celulares y Smartphones')).toBeNull())
    // Items quantity
    await waitFor(() => expect(screen.queryAllByRole('article')?.length).toBe(0))
  })
})
