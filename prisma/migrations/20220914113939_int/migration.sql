/*
  Warnings:

  - You are about to alter the column `weight` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `height` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "weight" SET DATA TYPE INTEGER,
ALTER COLUMN "height" SET DATA TYPE INTEGER;
