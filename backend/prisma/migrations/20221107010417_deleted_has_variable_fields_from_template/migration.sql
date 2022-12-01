/*
  Warnings:

  - You are about to drop the column `hasVariable1` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `hasVariable2` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `hasVariable3` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "hasVariable1",
DROP COLUMN "hasVariable2",
DROP COLUMN "hasVariable3";
