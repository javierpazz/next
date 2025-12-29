/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `priceBuy` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `inStock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `minStock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `porIva` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `rating` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "priceBuy" DROP DEFAULT,
ALTER COLUMN "priceBuy" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "inStock" DROP DEFAULT,
ALTER COLUMN "inStock" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "minStock" DROP DEFAULT,
ALTER COLUMN "minStock" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "porIva" DROP DEFAULT,
ALTER COLUMN "porIva" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,2);
