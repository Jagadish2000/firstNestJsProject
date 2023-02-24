/*
  Warnings:

  - You are about to drop the column `title` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "pagenum" TEXT,
ALTER COLUMN "link" DROP NOT NULL;
