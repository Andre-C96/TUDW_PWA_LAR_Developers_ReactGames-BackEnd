/*
  Warnings:

  - You are about to drop the `boardgameTraslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "boardgameTraslation" DROP CONSTRAINT "boardgameTraslation_boardgameId_fkey";

-- DropTable
DROP TABLE "boardgameTraslation";

-- CreateTable
CREATE TABLE "boardgameTranslation" (
    "id" SERIAL NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boardgameTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boardgameTranslation" ADD CONSTRAINT "boardgameTranslation_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
