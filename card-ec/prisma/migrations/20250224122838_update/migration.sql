/*
  Warnings:

  - You are about to drop the column `price` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `Purchase_price` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sales_price` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "price",
ADD COLUMN     "Purchase_price" TEXT NOT NULL,
ADD COLUMN     "Sales_price" TEXT NOT NULL;
