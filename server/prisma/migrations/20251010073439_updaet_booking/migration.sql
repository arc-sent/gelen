/*
  Warnings:

  - You are about to drop the column `additionalInfo` on the `Booking` table. All the data in the column will be lost.
  - Changed the type of `guests` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `beds` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `area` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "additionalInfo",
DROP COLUMN "guests",
ADD COLUMN     "guests" INTEGER NOT NULL,
DROP COLUMN "beds",
ADD COLUMN     "beds" INTEGER NOT NULL,
DROP COLUMN "area",
ADD COLUMN     "area" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
