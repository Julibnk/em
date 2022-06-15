/*
  Warnings:

  - You are about to drop the column `number` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `contactAccountId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `categoryAccountId` on the `Template` table. All the data in the column will be lost.
  - Added the required column `addressNumber` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationPhone` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationPhone` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationPrefix` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentDate` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Phone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `Phone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('DRAFT', 'SENT', 'SCHEDULED', 'ERROR');

-- CreateEnum
CREATE TYPE "TemplateStatus" AS ENUM ('NOT_SENT', 'ACTIVE', 'ERROR');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_contactAccountId_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_categoryAccountId_categoryId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "number",
ADD COLUMN     "addressNumber" INTEGER NOT NULL,
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "destinationPhone" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "prefix" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "contactAccountId",
ADD COLUMN     "accountId" UUID,
ADD COLUMN     "categoryId" UUID,
ADD COLUMN     "destinationPhone" TEXT NOT NULL,
ADD COLUMN     "destinationPrefix" TEXT NOT NULL,
ADD COLUMN     "scheduleDate" TIMESTAMP(3),
ADD COLUMN     "scheduled" BOOLEAN NOT NULL,
ADD COLUMN     "sentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "MessageStatus" NOT NULL,
ADD COLUMN     "variable1" TEXT,
ADD COLUMN     "variable2" TEXT,
ADD COLUMN     "variable3" TEXT;

-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "prefix" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "categoryAccountId",
ADD COLUMN     "accountId" UUID,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasVariable1" BOOLEAN,
ADD COLUMN     "hasVariable2" BOOLEAN,
ADD COLUMN     "hasVariable3" BOOLEAN,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "preview" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "status" "TemplateStatus" NOT NULL,
ADD COLUMN     "variable1" TEXT,
ADD COLUMN     "variable2" TEXT,
ADD COLUMN     "variable3" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mail" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_contactId_fkey" FOREIGN KEY ("accountId", "contactId") REFERENCES "Contact"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;
