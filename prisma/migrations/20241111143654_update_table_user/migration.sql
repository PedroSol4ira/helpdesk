/*
  Warnings:

  - You are about to alter the column `userType` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `userType` INTEGER NOT NULL;
