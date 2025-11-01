/*
  Warnings:

  - Added the required column `categoryId` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PromptCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PromptCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromptCategory_name_key" ON "PromptCategory"("name");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PromptCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
