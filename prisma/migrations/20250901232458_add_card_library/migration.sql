/*
  Warnings:

  - You are about to drop the column `animeId` on the `libraries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."libraries" DROP COLUMN "animeId",
ALTER COLUMN "userEmail" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."card_libraries" (
    "id" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "name" TEXT,
    "status" TEXT,
    "type" TEXT,
    "score" INTEGER,
    "episodes" INTEGER,
    "chapters" INTEGER,
    "libraryId" TEXT NOT NULL,

    CONSTRAINT "card_libraries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."card_libraries" ADD CONSTRAINT "card_libraries_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "public"."libraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
