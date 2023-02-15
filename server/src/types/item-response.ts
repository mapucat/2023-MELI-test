import { getConfig } from '../helpers/get-config/get-config'
import MELIItemResult from "./meli-item-result"
import MELIItemDescriptionResult from "./meli-item-description-result"

/**
 * Item class 
 */
class ItemDetail {
  /**
   * item id
   */
  id: string
  
  /**
   * title description
   */
  title: string

  /**
   * product price
   */
  price: {
    currency: string
    amount: number
  }

  /**
   * item picture url
   */
  picture: string

  /**
   * item condition
   */
  condition: string

  /**
   * item has free shiping
   */
  free_shipping: boolean

  /**
   * sold items quantity
   */
  sold_quantity: number

  /**
   * item's description
   */
  description: string

  /**
   * 
   * @param item item result from api search
   */
  constructor(item: MELIItemResult, itemDescription: MELIItemDescriptionResult) {
    this.id = item.id
    this.title = item.title
    this.price = { 
      currency: item.currency_id, 
      amount: item.price
    }
    this.picture = item.pictures[0].url
    this.condition = item.condition
    this.free_shipping = item.shipping.free_shipping
    this.sold_quantity = item.sold_quantity
    this.description = itemDescription.plain_text
  }
} 

class ItemResponse {

  /**
   * Api author
   */
  author: {
    name: string,
    lastname: string
  }

  /**
   * Item found
   */
  item: ItemDetail

  constructor(itemResult: MELIItemResult, itemDescriptionResult: MELIItemDescriptionResult) {
    this.author = getConfig('author') as { name: string, lastname: string }
    this.item = new ItemDetail(itemResult, itemDescriptionResult)
  }
}

export default ItemResponse
