/*
  Warnings:

  - Added the required column `userEmail` to the `libraries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."libraries" ADD COLUMN     "userEmail" TEXT NOT NULL;
