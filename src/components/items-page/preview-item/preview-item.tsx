import React from 'react'
import { Link } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import FreeShippingImg from '../../../assets/images/shipping18.png'
import type IPreviewItem from '../../../types/search-data'
import './preview-item.scss'

interface Props {

  /**
   *
   */
  item: IPreviewItem

  /**
   * Additional properties
   */
  [x: string]: any
}

const PreviewItem: React.FC<Props> = ({ item }) => {
  return (
    <article className='preview-item'>
      <Link to={`/items/${item.id}`} className='preview-item__img'>
        <img src={item.picture} alt={item.title}></img>
      </Link>
      <Link to={`/items/${item.id}`} className='preview-item__detail'>
        <h2 className='preview-item__price'>
          <CurrencyFormat
            value={item.price.amount}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'$ '}/>
          { item.free_shipping ? <img src={FreeShippingImg} alt='Envío gratis'></img> : null }
        </h2>
        <h3 className='preview-item__name'>{ item.title }</h3>
      </Link>
    </article>
  )
}

export default PreviewItem