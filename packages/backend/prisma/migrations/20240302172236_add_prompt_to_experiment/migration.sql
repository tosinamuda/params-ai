/*
  Warnings:

  - Added the required column `categoryPromptMap` to the `Experiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experiment" ADD COLUMN     "categoryPromptMap" JSONB NOT NULL,
ADD COLUMN     "interfaces" TEXT[];
