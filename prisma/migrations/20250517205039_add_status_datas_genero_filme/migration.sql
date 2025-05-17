/*
  Warnings:

  - Added the required column `updatedAt` to the `GeneroFilme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneroFilme" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
