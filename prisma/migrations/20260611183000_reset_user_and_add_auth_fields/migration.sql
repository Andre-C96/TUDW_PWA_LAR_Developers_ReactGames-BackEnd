-- Clear existing user-related data so the user table can be reshaped safely.
TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;

-- Prisma enum for the new user role column.
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USUARIO');

-- Reshape the user table to match the current schema.
ALTER TABLE "user"
    DROP COLUMN "username",
    ADD COLUMN     "email" TEXT NOT NULL,
    ADD COLUMN     "password" TEXT NOT NULL,
    ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USUARIO',
    ADD COLUMN     "refreshToken" TEXT,
    ADD COLUMN     "deletedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
