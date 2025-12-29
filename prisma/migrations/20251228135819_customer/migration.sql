/*
  Warnings:

  - The `sizes` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `size` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "itemsInOrder" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes",
ADD COLUMN     "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
