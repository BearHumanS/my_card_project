export interface Card {
  name: string
  corpName: string
  tags: string[]
  benfit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export interface AdBanner {
  title: string
  description: string
  link: string
}
