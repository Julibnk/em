/*
  Warnings:

  - You are about to drop the column `scheduled` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `variable1` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `variable2` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `variable3` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_accountId_categoryId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "scheduled",
DROP COLUMN "variable1",
DROP COLUMN "variable2",
DROP COLUMN "variable3",
ADD COLUMN     "parameter1" TEXT,
ADD COLUMN     "parameter2" TEXT,
ADD COLUMN     "parameter3" TEXT;
