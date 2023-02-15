import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PreviewItem from '../../components/items-page/preview-item/preview-item'
import Breadcrumb from '../../components/ui/breadcrumb/breadcrumb'
import { getItems } from '../../services/items.service'
import { type SuccessResponse, type ApiResponse } from '../../types/api-response.d'
import type IPreviewItem from '../../types/search-data.d'
import './items.page.scss'

interface Props {
  /**
   * page classname
   */
  className?: string

  /**
   * Additional properties
   */
  [x: string]: any
}

const ItemsPage: React.FC<Props> = () => {
  const location = useLocation()
  const [items, setItems] = useState<IPreviewItem[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('search')
    if (search !== null) {
      getItems(search)
        .then((responseWrapper: ApiResponse) => {
          const data = (responseWrapper.response as SuccessResponse).data
          setItems(data.items)
          setCategories(data.categories)
        }).catch((error) => { console.dir(error) })
    }
  }, [location.search])

  return (
    <section className='items-page'>
      {categories.length > 0 && <Breadcrumb categories={categories} />}
      <div className='items-page__list'>
        {
          (items.length > 0) &&
          items.map((item: IPreviewItem, index) =>
            <React.Fragment key={item.id}>
              <PreviewItem item={item} />
              {index !== items.length - 1 &&
                <hr className='items-page__divider' />}
            </React.Fragment>)
        }
      </div>
    </section>
  )
}

export default ItemsPage
