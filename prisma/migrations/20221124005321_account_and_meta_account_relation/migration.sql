/*
  Warnings:

  - You are about to drop the column `accountId` on the `MetaAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[metaAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metaAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MetaAccount" DROP CONSTRAINT "MetaAccount_accountId_fkey";

-- DropIndex
DROP INDEX "MetaAccount_accountId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "metaAccountId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "MetaAccount" DROP COLUMN "accountId";

-- CreateIndex
CREATE UNIQUE INDEX "Account_metaAccountId_key" ON "Account"("metaAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_metaAccountId_fkey" FOREIGN KEY ("metaAccountId") REFERENCES "MetaAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
