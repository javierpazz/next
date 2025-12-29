/*
  Warnings:

  - The `sizes` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "priceBuy" SET DEFAULT 0,
ALTER COLUMN "inStock" SET DEFAULT 0,
ALTER COLUMN "minStock" SET DEFAULT 0,
ALTER COLUMN "porIva" SET DEFAULT 0,
ALTER COLUMN "rating" SET DEFAULT 0,
DROP COLUMN "sizes",
ADD COLUMN     "sizes" TEXT[];
