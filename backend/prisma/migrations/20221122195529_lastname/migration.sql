/*
  Warnings:

  - You are about to drop the column `surname` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "surname",
ADD COLUMN     "lastName" TEXT;
