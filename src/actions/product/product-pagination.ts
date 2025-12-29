"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { getConfigs } from "../configuration/get-configs";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 0. Obtener Punto de Venta
        let pVenta = "";
        const configs = await getConfigs();
        if (configs) {
        const conf = configs[0];
        pVenta = conf._id;
        }


    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      //! Por género
      where: {
        gender: gender,
        id_config: pVenta,
        ecoActive: true,
      },
    });

    // 2. Obtener el total de páginas
    // todo:
    const totalCount = await prisma.product.count({
    where: {
      gender: gender,
      id_config: pVenta,
      ecoActive: true,
    },
    });
    
    const totalPages = Math.ceil(totalCount / take);

    // return {
    //   currentPage: page,
    //   totalPages: totalPages,
    //   products: products.map((product) => ({
    //     ...product,
    //     images: product.ProductImage.map((image) => image.url),
    //   })),
    // };

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,

        slug: product.slug ?? product.id,

        images: product.ProductImage.map((image) => image.url),

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

        sizes: product.sizes as any,
        tags: product.tags ?? [],

        gender: product.gender ?? "unisex",
      })),
    };

  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
