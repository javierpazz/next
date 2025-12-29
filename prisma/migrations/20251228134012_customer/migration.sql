/*
  Warnings:

  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priceBuy` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inStock` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minStock` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `porIva` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "priceBuy" SET NOT NULL,
ALTER COLUMN "inStock" SET NOT NULL,
ALTER COLUMN "minStock" SET NOT NULL,
ALTER COLUMN "porIva" SET NOT NULL,
ALTER COLUMN "rating" SET NOT NULL;
