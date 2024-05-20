/*
  Warnings:

  - You are about to drop the column `logo` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `logoUrl` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logo",
ADD COLUMN     "logoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "photo",
ADD COLUMN     "photoUrl" TEXT;
