import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { BookingWithSeasonalPrice } from "../../interfaces/booking.interface";
import { CardBooking } from "./CardBooking";
import { Link } from "react-router-dom";

export const CardsSection = (
    {
        bookings,
        handleClick,
        click
    }:
        {
            bookings: BookingWithSeasonalPrice[],
            handleClick: () => Promise<void>,
            click: boolean
        }) => {

    return (
        <main className="flex-1">
            <div className="space-y-4 flex flex-col items-center">
                {bookings.map((booking) => (
                    <Link
                        to={`/card/${booking.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="block w-full"
                    >
                        <CardBooking booking={booking} key={booking.id} />
                    </Link>
                ))}
            </div>
            {
                !click &&

                <div className="text-center mt-5">
                    <Button
                        variant="outline"
                        className="w-full max-w-[850px] py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl"
                        onClick={handleClick}
                    >
                        Смотреть все
                    </Button>
                </div>

            }

        </main>
    )
}

// const propertyListings = [
//     {
//         id: 1,
//         title: "Гостевой дом «Ной Плюс, подогреваемый бассейн, завтрак включен, парковка»",
//         type: "Комната",
//         roomTitle: "Двухместный номер (мансарда), бассейн, завтрак, море 600 м",
//         guests: "2 гостя",
//         beds: "1 кровать",
//         area: "14 м²",
//         distance: "600 м до моря",
//         address: "Геленджик, Средняя улица, 31",
//         price: "3 998 ₽",
//         hasBreakfast: true,
//         additionalInfo: "обед, ужин оплачивается отдельно",
//         image: "/background.svg",
//     },
//     {
//         id: 2,
//         title: "Гостевой дом «Уютный»",
//         type: "Комната",
//         roomTitle: "Двухместный номер в 10 минутах от моря, мангал, бассейн, общая кухня",
//         guests: "1 гость",
//         beds: "1 кровать",
//         area: "20 м²",
//         address: "Геленджик, Геленджикский проспект, 167Г",
//         price: "30 000 ₽",
//         hasBreakfast: false,
//         isGoodDeal: true,
//         image: "/background-2.svg",
//     },
//     {
//         id: 3,
//         title: "Гостевой дом «Ной Плюс, подогреваемый бассейн, завтрак включен, парковка»",
//         type: "Комната",
//         roomTitle: "Двухместный номер (мансарда), бассейн, завтрак, море 600 м",
//         guests: "2 гостя",
//         beds: "1 кровать",
//         area: "14 м²",
//         distance: "600 м до моря",
//         address: "Геленджик, Средняя улица, 31",
//         price: "3 998 ₽",
//         hasBreakfast: true,
//         additionalInfo: "обед, ужин оплачивается отдельно",
//         image: "/background.svg",
//     },
// ];