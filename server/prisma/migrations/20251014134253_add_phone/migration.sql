/*
  Warnings:

  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "subTitle" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT;
