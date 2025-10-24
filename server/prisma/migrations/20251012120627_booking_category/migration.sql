/*
  Warnings:

  - You are about to drop the column `category` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "category",
DROP COLUMN "subcategory",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "subcategoryId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "public"."BookingCategory";

-- DropEnum
DROP TYPE "public"."BookingSubCategory";

-- CreateTable
CREATE TABLE "BookingCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BookingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BookingSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingCategory_name_key" ON "BookingCategory"("name");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "BookingSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSubCategory" ADD CONSTRAINT "BookingSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
