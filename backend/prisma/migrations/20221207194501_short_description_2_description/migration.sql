/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "shortDescription",
ADD COLUMN     "description" TEXT;
