import React from 'react'
import {
  Routes, Route
} from 'react-router-dom'

import DefaultTemplate from './components/templates/default/default'
import SearchPage from './pages/search/search.page'

const PagesRoutes: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultTemplate/>}>
        <Route index element={<SearchPage/>} />
        <Route path="/search" element={<h2>Item list</h2>} />
        <Route path="/search/:id" element={<h2>Item view</h2>} />
      </Route>
    </Routes>
  )
}

export default PagesRoutes
