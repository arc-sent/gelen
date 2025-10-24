/*
  Warnings:

  - Added the required column `exit` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "exit" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;
