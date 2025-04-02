-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "apelido" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "tipo_usuario" TEXT NOT NULL DEFAULT 'comum';
