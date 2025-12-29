export interface Product {
  id: string;
  codPro:    string;
  codigoPro: string;
  medPro:    string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  porIva: number;
  priceBuy: number;
  minStock: number;
  rating: number;
  numReviews: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //todo: type: Type;
  gender: Category;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  porIva: number;
  quantity: number;
  size: Size;
  image: string;
}


export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


type Category = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';