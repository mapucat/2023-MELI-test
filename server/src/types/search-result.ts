export interface MELIPreviewItem {
  id: string
  title: string
  currency_id: string
  price: number
  category_id: string
  thumbnail: string
  condition: string
  shipping: {
    free_shipping: boolean
  }
  seller_address: { 
    city: { name: string }
  } 
}

export interface MELIFilter {
  id: string,
  values: {
    path_from_root: {
      name: string
    }[]
  }[]
}

interface MELISearchResult {
  results: MELIPreviewItem[]
  filters: MELIFilter[]
}

export default MELISearchResult
