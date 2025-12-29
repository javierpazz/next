// src/mappers/prisma-product-to-form.ts
import { Product as PrismaProduct, ProductImage } from '@prisma/client';
import { Product } from '@/interfaces';

export function prismaProductToForm(
  product: PrismaProduct & { ProductImage?: ProductImage[] }
): Partial<Product> {
  return {
    id: product.id,
    title: product.title,
    description: product.description,

    slug: product.slug ?? undefined,

    images: product.ProductImage?.map(img => img.url) ?? [],

    inStock: product.inStock ?? undefined,
    price: product.price ?? undefined,
    porIva: product.porIva ?? undefined,

    sizes: product.sizes as any,
    tags: product.tags ?? [],

    gender: product.gender as any,
  };
}
