/**
 * Item preview interface
 */
export default interface IPreviewItem {
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
}

export interface ISearchData {
  /**
   * Api author
   */
  author: {
    name: string
    lastname: string
  }

  /**
   * items category
   */
  categories: string[]

  /**
   * Result items
   */
  items: IPreviewItem[]
}
