-- CreateTable
CREATE TABLE "public"."libraries" (
    "id" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "libraries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."libraries" ADD CONSTRAINT "libraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
