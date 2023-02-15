/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useRef, useState } from "react"

// import Breadcrumb from '../../components/ui/breadcrumb/breadcrumb'
import ItemDetail from '../../components/item-detail-page/item-detail/item-detail'
import { getItemDetail } from '../../services/items.service'
import { useParams } from 'react-router-dom'
import { type ApiResponse, type SuccessResponse } from "../../types/api-response"

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

const ItemDetailPage: React.FC<Props> = () => {
  const mounted = useRef<boolean>(false)
  const [item, setItem] = useState(null)
  // const [categories, setCategories] = useState<string[]>([])
  const { id } = useParams()

  if (!mounted.current) {
    if (id !== '' && id !== undefined) {
      getItemDetail(id)
        .then(({ response }: ApiResponse) => {
          const data = (response as SuccessResponse).data
          setItem(data.item)
          // setCategories(data.categories)
        }).catch((error) => { console.dir(error) })
    }
    mounted.current = true
  }

  // { categories.length > 0 && <Breadcrumb list={ categories } /> }
  return (
    <section>
      { item !== null && <ItemDetail item={item}></ItemDetail> }
    </section>
  )
}

export default ItemDetailPage
