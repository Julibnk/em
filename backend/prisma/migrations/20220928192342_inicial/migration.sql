-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GOD', 'ACCOUNT_ADMIN', 'ACCOUNT_USER');

-- CreateEnum
CREATE TYPE "DictionaryKey" AS ENUM ('HOLA');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('DRAFT', 'SENT', 'SCHEDULED', 'ERROR');

-- CreateEnum
CREATE TYPE "TemplateStatus" AS ENUM ('NOT_SENT', 'ACTIVE', 'ERROR');

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "vat" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "addressNumber" INTEGER NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "region" VARCHAR(2) NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "accountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "mail" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("accountId","id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "accountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "destinationPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("accountId","id")
);

-- CreateTable
CREATE TABLE "Category" (
    "accountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("accountId","id")
);

-- CreateTable
CREATE TABLE "MetaAccount" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "accountId" UUID NOT NULL,

    CONSTRAINT "MetaAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "metaAccountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TemplateStatus" NOT NULL,
    "shortDescription" TEXT,
    "preview" TEXT,
    "hasVariable1" BOOLEAN,
    "hasVariable2" BOOLEAN,
    "hasVariable3" BOOLEAN,
    "variable1" TEXT,
    "variable2" TEXT,
    "variable3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "accountId" UUID,
    "categoryId" UUID,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("metaAccountId","id")
);

-- CreateTable
CREATE TABLE "Message" (
    "metaAccountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "status" "MessageStatus" NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "scheduled" BOOLEAN NOT NULL,
    "destinationPrefix" TEXT NOT NULL,
    "destinationPhone" TEXT NOT NULL,
    "scheduleDate" TIMESTAMP(3),
    "variable1" TEXT,
    "variable2" TEXT,
    "variable3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "templateId" UUID NOT NULL,
    "phoneId" UUID NOT NULL,
    "accountId" UUID,
    "contactId" UUID,
    "categoryId" UUID,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("metaAccountId","id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "metaAccountId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "prefix" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createUsername" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUsername" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("metaAccountId","id")
);

-- CreateTable
CREATE TABLE "Dictionary" (
    "id" UUID NOT NULL,
    "key" "DictionaryKey" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DictionaryText" (
    "id" UUID NOT NULL,
    "key" "DictionaryKey" NOT NULL,
    "language" VARCHAR(2) NOT NULL,
    "value" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "DictionaryText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MetaAccount_accountId_key" ON "MetaAccount"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_key_value_key" ON "Dictionary"("key", "value");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryText_key_language_value_key" ON "DictionaryText"("key", "language", "value");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaAccount" ADD CONSTRAINT "MetaAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_metaAccountId_fkey" FOREIGN KEY ("metaAccountId") REFERENCES "MetaAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_contactId_fkey" FOREIGN KEY ("accountId", "contactId") REFERENCES "Contact"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_accountId_categoryId_fkey" FOREIGN KEY ("accountId", "categoryId") REFERENCES "Category"("accountId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_metaAccountId_fkey" FOREIGN KEY ("metaAccountId") REFERENCES "MetaAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_metaAccountId_templateId_fkey" FOREIGN KEY ("metaAccountId", "templateId") REFERENCES "Template"("metaAccountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_metaAccountId_phoneId_fkey" FOREIGN KEY ("metaAccountId", "phoneId") REFERENCES "Phone"("metaAccountId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_metaAccountId_fkey" FOREIGN KEY ("metaAccountId") REFERENCES "MetaAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryText" ADD CONSTRAINT "DictionaryText_key_value_fkey" FOREIGN KEY ("key", "value") REFERENCES "Dictionary"("key", "value") ON DELETE RESTRICT ON UPDATE CASCADE;
