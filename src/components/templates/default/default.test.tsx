import { screen } from '@testing-library/react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { renderWithRouter } from '../../../helpers/test-facilities/test-facilities'
import DefaultTemplate from './default'

describe('When DefaultTemplate is setted', () => {
  test('It should display the required page', () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<DefaultTemplate/>}>
          <Route index element={<span data-testid='main-page' />} />
          <Route path='/other-page' element={ <span data-testid='other-page' />}/>
        </Route>
      </Routes>,
      { route: '/' }
    )
    expect(screen.getByTestId('main-page')).toBeEmptyDOMElement()
  })
})
