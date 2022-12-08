/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Template` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_accountId_categoryId_fkey";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "TemplatesOnCategories" (
    "accountId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "templateId" UUID NOT NULL,

    CONSTRAINT "TemplatesOnCategories_pkey" PRIMARY KEY ("accountId","categoryId","templateId")
);

-- AddForeignKey
ALTER TABLE "TemplatesOnCategories" ADD CONSTRAINT "TemplatesOnCategories_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplatesOnCategories" ADD CONSTRAINT "TemplatesOnCategories_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplatesOnCategories" ADD CONSTRAINT "TemplatesOnCategories_accountId_templateId_fkey" FOREIGN KEY ("accountId", "templateId") REFERENCES "Template"("accountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
