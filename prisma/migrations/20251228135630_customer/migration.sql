/*
  Warnings:

  - The `size` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sizes` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `itemsInOrder` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "itemsInOrder" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "size",
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "priceBuy" DROP NOT NULL,
ALTER COLUMN "inStock" DROP NOT NULL,
ALTER COLUMN "minStock" DROP NOT NULL,
ALTER COLUMN "porIva" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "numReviews" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
DROP COLUMN "sizes",
ADD COLUMN     "sizes" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'client';

-- DropEnum
DROP TYPE "Size";
