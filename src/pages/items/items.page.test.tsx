/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../helpers/test-facilities/test-facilities'
import { type ApiResponse } from '../../types/api-response.d'
import * as itemService from '../../services/items.service'
import ItemsPage from './items.page'
import { act } from 'react-dom/test-utils'

import response from '../../../__mocks__/api-items-success-response.json'

describe('ItemsPage is rendered', () => {
  beforeEach(() =>
    jest.spyOn(itemService, "getItems").mockImplementation(async () => await Promise.resolve(response as ApiResponse)))

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
    renderWithRouter(<ItemsPage />)
    act(() => { window.history.pushState({}, 'Test page', '/items?search=') })
    // Breadcrumb
    await waitFor(() => expect(screen.queryByText('Celulares y Teléfonos >')).toBeNull())
    await waitFor(() => expect(screen.queryByText('Celulares y Smartphones')).toBeNull())
    // Items quantity
    await waitFor(() => expect(screen.queryAllByRole('article').length).toBe(0))
  })
})
