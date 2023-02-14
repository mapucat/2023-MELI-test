import MELISearchResult, { MELIFilter, MELIPreviewItem } from "./search-result"
import { getConfig } from '../helpers/get-config/get-config'

/**
 * Item class 
 */
class PreviewItem {
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
   * item's city disponibility
   */
  city: string

  /**
   * 
   * @param item item result from api search
   */
  constructor(item: MELIPreviewItem) {
    this.id = item.id
    this.title = item.title
    this.price = { 
      currency: item.currency_id, 
      amount: item.price
    }
    this.picture = item.thumbnail
    this.condition = item.condition
    this.free_shipping = item.shipping.free_shipping
    this.city = item.seller_address?.city.name
  }
} 

export class SearchResponse {

  /**
   * Api author
   */
  author: {
    name: string,
    lastname: string
  }

  /**
   * items category
   */
  categories: string[]

  items: PreviewItem[]

  constructor(searchResponse: MELISearchResult) {
    this.author = getConfig('author') as { name: string, lastname: string }
    this.categories = this.getCategories(searchResponse.filters)
    this.items = searchResponse.results.map(item => new PreviewItem(item))
  }

  /**
   * Get items categories
   * @param filters 
   * @returns a category list
   */
  private getCategories(filters: MELIFilter[]): string[] {
    const categoryList = filters.find((element) => element.id === 'category')?.values[0].path_from_root
    return categoryList?.map((value) => value.name) || []
  }

  static IsEmpty(searchResponse: SearchResponse | null): boolean {
    return !searchResponse || !searchResponse?.items?.length
  }
}