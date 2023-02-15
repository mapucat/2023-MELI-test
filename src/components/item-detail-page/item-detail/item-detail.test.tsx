import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'
import ItemDetail from './item-detail'
import type IItemDetail from '../../../types/item-detail'

const testItem: IItemDetail = {
  id: "MLA1184760504",
  title: "Quantum Q20 Dual Sim 128 Gb Azul 4 Gb Ram",
  price: { currency: "ARS", amount: 40999 },
  picture: "http://http2.mlstatic.com/D_919873-MLA50185644201_062022-O.jpg",
  condition: "new",
  free_shipping: true,
  sold_quantity: 50,
  description: "Fotografía profesional en tu bolsillo\nDescubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.\n\nAdemás, con la cámara frontal con flash preparate para compartir selfies más iluminadas en tus redes sociales.\n\nMayor rendimiento\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.\n\nDesbloqueo facial y dactilar\nMáxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.\n\nBatería de duración superior\n¡Desenchufate! Con la súper batería de 4000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas."
}

describe('ItemDetail is rendered', () => {
  test('then it should display the required components', () => {
    renderWithRouter(<ItemDetail item={testItem} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText(testItem.title)).toBeInTheDocument()
    expect(screen.getByText('$ 40,999')).toBeInTheDocument()
  })
})
