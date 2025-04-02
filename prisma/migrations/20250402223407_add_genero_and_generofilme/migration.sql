/*
  Warnings:

  - You are about to drop the column `generoId` on the `Filme` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Filme_generoId_idx";

-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "generoId";

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneroFilme" (
    "id" SERIAL NOT NULL,
    "idGenero" INTEGER NOT NULL,
    "idFilme" INTEGER NOT NULL,

    CONSTRAINT "GeneroFilme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeneroFilme_idGenero_idx" ON "GeneroFilme"("idGenero");

-- CreateIndex
CREATE INDEX "GeneroFilme_idFilme_idx" ON "GeneroFilme"("idFilme");

-- CreateIndex
CREATE UNIQUE INDEX "GeneroFilme_idGenero_idFilme_key" ON "GeneroFilme"("idGenero", "idFilme");

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_idGenero_fkey" FOREIGN KEY ("idGenero") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
