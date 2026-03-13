-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "codConId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_codConId_fkey" FOREIGN KEY ("codConId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
