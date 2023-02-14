import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PreviewItem from '../../components/items-page/preview-item/preview-item'
import Breadcrumb from '../../components/ui/breadcrumb/breadcrumb'
import { getItems } from '../../services/items.service'
import { type SuccessResponse, type ApiResponse } from '../../types/api-response'
import type IPreviewItem from '../../types/search-data'
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
  const mounted = useRef<boolean>(false)
  const [items, setItems] = useState<IPreviewItem[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const getSearchValue = (): string => {
    let search = ''
    const queryParam = new URLSearchParams(location.search).get('search')
    const searchLocation = location.state?.search
    if (queryParam !== null) {
      search = queryParam
    } else if (searchLocation !== null) {
      search = searchLocation
    }
    return search
  }

  if (!mounted.current) {
    const search = getSearchValue()
    if (search !== '') {
      getItems(search).then(({ data: responseWrapper }: { data: ApiResponse }) => {
        const data = (responseWrapper.response as SuccessResponse).data
        setItems(data.items)
        setCategories(data.categories)
      }).catch((error) => { console.dir(error) })
    }
    mounted.current = true
  }

  return (
    <section className='items-page'>
      { categories.length > 0 && <Breadcrumb categories={ categories } /> }
      <div className='items-page__list'>
        {
          (items.length > 0)
            ? items.map((item: IPreviewItem, index) =>
              <React.Fragment key={item.id}>
                <PreviewItem item={item}/>
                { index !== items.length - 1
                  ? <hr className='items-page__divider'/>
                  : null }
              </React.Fragment>)
            : null }
      </div>
    </section>
  )
}

export default ItemsPage
