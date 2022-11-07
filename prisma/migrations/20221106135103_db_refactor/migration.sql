/*
  Warnings:

  - The values [GOD,ACCOUNT_USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createUsername` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createUsername` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createUsername` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `destinationPhone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `Contact` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createUsername` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `destinationPhone` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `destinationPrefix` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `metaAccountId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `phoneId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createUsername` on the `MetaAccount` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `MetaAccount` table. All the data in the column will be lost.
  - The primary key for the `Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createUsername` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `metaAccountId` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `createUsername` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateUsername` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountPhoneId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `accountId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `Template` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ACCOUNT_ADMIN', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_accountId_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_accountId_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_metaAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_metaAccountId_phoneId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_metaAccountId_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_metaAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_accountId_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_metaAccountId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "createUsername",
DROP COLUMN "createdAt",
DROP COLUMN "phoneNumber",
DROP COLUMN "updateUsername",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createUsername",
DROP COLUMN "deleted",
DROP COLUMN "updateUsername",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "createUsername",
DROP COLUMN "destinationPhone",
DROP COLUMN "updateUsername";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "createUsername",
DROP COLUMN "destinationPhone",
DROP COLUMN "destinationPrefix",
DROP COLUMN "metaAccountId",
DROP COLUMN "phoneId",
DROP COLUMN "updateUsername",
ADD COLUMN     "accountPhoneId" UUID NOT NULL,
ALTER COLUMN "accountId" SET NOT NULL,
ALTER COLUMN "contactId" SET NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("accountId", "id");

-- AlterTable
ALTER TABLE "MetaAccount" DROP COLUMN "createUsername",
DROP COLUMN "updateUsername";

-- AlterTable
ALTER TABLE "Template" DROP CONSTRAINT "Template_pkey",
DROP COLUMN "createUsername",
DROP COLUMN "deleted",
DROP COLUMN "metaAccountId",
DROP COLUMN "updateUsername",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "accountId" SET NOT NULL,
ADD CONSTRAINT "Template_pkey" PRIMARY KEY ("accountId", "id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createUsername",
DROP COLUMN "updateUsername";

-- DropTable
DROP TABLE "Phone";

-- CreateTable
CREATE TABLE "AccountPhone" (
    "accountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "prefix" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountPhone_pkey" PRIMARY KEY ("accountId","id")
);

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_templateId_fkey" FOREIGN KEY ("accountId", "templateId") REFERENCES "Template"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_accountPhoneId_fkey" FOREIGN KEY ("accountId", "accountPhoneId") REFERENCES "AccountPhone"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_contactId_fkey" FOREIGN KEY ("accountId", "contactId") REFERENCES "Contact"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountPhone" ADD CONSTRAINT "AccountPhone_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
