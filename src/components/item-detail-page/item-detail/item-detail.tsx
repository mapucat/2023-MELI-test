import React from 'react'
import { currencyFormat } from '../../../helpers/currency/currency'
import type IItemDetail from '../../../types/item-detail'
import './item-detail.scss'

interface Props {

  /**
   *
   */
  item: IItemDetail

  /**
   * Additional properties
   */
  [x: string]: any
}

const ItemDetail: React.FC<Props> = ({ item }) => {
  return (
    <article className='item-detail'>
      <div className='item-detail__main'>
        <img className='item-detail__img' src={item.picture} alt={item.title}></img>
        <div className='item-detail__description'>
          <h4>Descripción del producto</h4>
          <p>{item.description}</p>
        </div>
      </div>
      <div className='item-detail__basic-info'>
        <p>{`${item.condition} - ${item.sold_quantity} vendidos`}</p>
        <h3 className='item-detail__name'>{item.title}</h3>
        <h2 className='item-detail__price'>
          <span>{currencyFormat(item.price.amount)}</span>
        </h2>
        <button className='item-detail__buy-button'>
          Comprar
        </button>
      </div>
    </article>
  )
}

export default ItemDetail
