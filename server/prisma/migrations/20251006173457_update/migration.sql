/*
  Warnings:

  - You are about to drop the column `descriotion` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "descriotion",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
