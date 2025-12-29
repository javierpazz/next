/*
  Warnings:

  - Made the column `numReviews` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "numReviews" SET NOT NULL;
