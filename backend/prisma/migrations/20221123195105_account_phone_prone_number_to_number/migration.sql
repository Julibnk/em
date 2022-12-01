/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `AccountPhone` table. All the data in the column will be lost.
  - Added the required column `number` to the `AccountPhone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountPhone" DROP COLUMN "phoneNumber",
ADD COLUMN     "number" TEXT NOT NULL;
