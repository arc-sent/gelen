-- CreateEnum
CREATE TYPE "BookingCategory" AS ENUM ('APARTMENTS', 'ROOMS', 'HOUSES', 'HOUSES_COTTAGES');

-- CreateEnum
CREATE TYPE "BookingSubCategory" AS ENUM ('ONE_ROOM', 'TWO_ROOMS', 'THREE_ROOMS', 'APARTMENT', 'STUDIO', 'MINI_HOTEL', 'GUEST_HOUSE', 'PRIVATE_SECTOR', 'TOWNHOUSE', 'DACHA');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "BookingCategory" NOT NULL,
    "subcategory" "BookingSubCategory",
    "guests" TEXT NOT NULL,
    "beds" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "checkIn" TEXT NOT NULL,
    "childRules" BOOLEAN NOT NULL,
    "smokingRules" BOOLEAN NOT NULL,
    "petRules" BOOLEAN NOT NULL,
    "partyRules" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "bedLinen" BOOLEAN NOT NULL,
    "airConditioner" BOOLEAN NOT NULL,
    "tv" BOOLEAN NOT NULL,
    "towels" BOOLEAN NOT NULL,
    "hairDryer" BOOLEAN NOT NULL,
    "pool" BOOLEAN NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
