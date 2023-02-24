/*
  Warnings:

  - You are about to drop the column `BookmarkId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `BookId` on the `Bookmark` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_BookId_fkey";

-- DropIndex
DROP INDEX "Bookmark_BookId_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "BookmarkId",
ADD COLUMN     "bookmarkId" INTEGER;

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "BookId",
ADD COLUMN     "bookId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_bookId_key" ON "Bookmark"("bookId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
