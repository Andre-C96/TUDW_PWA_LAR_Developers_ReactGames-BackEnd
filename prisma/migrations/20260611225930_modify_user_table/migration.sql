-- AlterTable
ALTER TABLE "boardgame" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "boardgameTranslation" ADD COLUMN     "deletedAt" TIMESTAMP(3);
