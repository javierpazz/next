/*
  Warnings:

  - You are about to drop the column `codConId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_codConId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "codConId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_config_fkey" FOREIGN KEY ("id_config") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
