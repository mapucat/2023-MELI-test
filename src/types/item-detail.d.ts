/**
 * Item interface
 */
export default interface IItemDetail {
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
}

export interface IItemDetailData {
  /**
   * Api author
   */
  author: {
    name: string
    lastname: string
  }

  /**
   * Result items
   */
  item: IItemDetail
}
