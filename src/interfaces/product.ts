export interface Product {
  productId: number,
  userId: number,
  productType: string
  productName: string,
  productDescription: string,
  productPrice: number,
  productAvailability: string,
  productOnline: boolean,
  productStock: number,
  productRating: number,
  userEmail: string
}

export interface ProductUpdate {
  productType: string,
  productName: string,
  productDescription: string,
  productPrice: number,
  productOnline: boolean,
  productStock: number
}