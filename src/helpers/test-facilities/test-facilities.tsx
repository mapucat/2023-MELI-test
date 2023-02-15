import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...render(ui, { wrapper: BrowserRouter })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { renderWithRouter }
