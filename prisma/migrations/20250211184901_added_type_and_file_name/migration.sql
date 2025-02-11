/*
  Warnings:

  - You are about to drop the column `name` on the `File` table. All the data in the column will be lost.
  - Added the required column `file_name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "name",
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "original_name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
