-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookingSubCategory" DROP CONSTRAINT "BookingSubCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeasonalPrice" DROP CONSTRAINT "SeasonalPrice_bookingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "subcategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "BookingSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSubCategory" ADD CONSTRAINT "BookingSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonalPrice" ADD CONSTRAINT "SeasonalPrice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
