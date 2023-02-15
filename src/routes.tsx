import React from 'react'
import {
  Routes, Route, Navigate
} from 'react-router-dom'

import DefaultTemplate from './components/templates/default/default'
import SearchPage from './pages/search/search.page'
import ItemsPage from './pages/items/items.page'
import ItemDetailPage from './pages/item-detail/item-detail.page'

const PagesRoutes: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultTemplate/>}>
        <Route index element={<SearchPage/>} />
        <Route path="/items" element={<ItemsPage/>}/>
        <Route path="/items/:id" element={<ItemDetailPage/>} />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default PagesRoutes
