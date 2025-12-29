'use server';

import prisma from '@/lib/prisma';


export const getProductBySlug = async( slug: string ) => {


  try {

    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true
      },
      where: {
        slug: slug,
      }
    })


    if ( !product ) return null;

    return {
      ...product,
      slug: product.slug ?? product.id,
        price: product.price ?? 0,
        porIva: product.porIva ?? 0,
        inStock: product.inStock ?? 0,
        priceBuy: product.priceBuy ?? 0,
        minStock: product.minStock ?? 0,
        rating: product.rating ?? 0,
        numReviews: product.numReviews ?? 0,
        codPro: product.codPro ?? "",
        codigoPro: product.codigoPro ?? "",
        medPro: product.medPro ?? "",
        gender: product.gender ?? "unisex",
      images: product.ProductImage.map( image => image.url )
    };

    
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug');
  }



}