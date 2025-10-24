import { Card } from "../../../components/ui/card";
import { BookingWithSeasonalPrice } from "../../interfaces/booking.interface";

function pluralize(number: number, one: string, few: string, many: string) {
    const n = Math.abs(number);
    if (n % 10 === 1 && n % 100 !== 11) return one;
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return few;
    return many;
}

export const CardBooking = ({ booking }: { booking: BookingWithSeasonalPrice }) => {
    const url = import.meta.env.VITE_URL;

    return (

        <div className="w-full flex justify-center">
            <Card
                key={booking.id}
                className="w-full max-w-[830px] overflow-hidden rounded-lg shadow-sm"
            >
                <div className="flex flex-col sm:flex-row bg-white rounded-2xl">
                    {/* Изображение */}

                    <div className="w-full sm:w-[250px] flex-shrink-0 h-48 sm:h-48">
                        {booking.image?.[0] ? (
                            <img
                                src={`${url}/images/${booking.id}/${booking.image[0].path}`}
                                alt={booking.title}
                                className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                                Нет изображения
                            </div>
                        )}
                    </div>


                    {/* Контент */}
                    <div className="flex flex-1 min-w-0 flex-col sm:flex-row">
                        {/* Основная информация */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
                            <div className="min-w-0 mb-3">
                                <div className="text-xs text-gray-400 mb-1 break-words truncate max-w-full">
                                    {booking.title}
                                </div>

                                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 leading-snug break-words">
                                    {booking.subTitle}
                                </h3>
                            </div>

                            {/* Характеристики */}
                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                    {booking.guests} {pluralize(booking.guests, 'гость', 'гостя', 'гостей')}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                    {booking.beds} {pluralize(booking.beds, 'кровать', 'кровати', 'кроватей')}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded">
                                    {booking.area} м²
                                </span>
                            </div>


                            {/* Адрес */}
                            <div className="text-[11px] sm:text-xs text-gray-500 truncate max-w-full">
                                {booking.address}
                            </div>
                        </div>

                        {/* Цена */}
                        <div className="w-full sm:w-[160px] flex-shrink-0 border-0 sm:border-l border-gray-200 min-w-0">
                            <div className="h-full flex flex-col justify-end p-4 sm:p-5 text-left sm:text-right">
                                {booking.seasonalPrices?.[0] ? (
                                    <div className="text-sm text-gray-500 whitespace-nowrap">
                                        <span className="font-bold text-gray-900 text-sm">
                                            {booking.seasonalPrices[0].price} ₽
                                        </span>
                                        <span className="ml-1">за сутки</span>
                                    </div>
                                ) : (
                                    <div className=" text-xs sm:text-sm text-center font-medium">
                                        <span>Цена недоступна</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

{/* <div className="w-full sm:w-[250px] flex-shrink-0">
    <img
        src="/ocean.jpg"
        alt="image"
        className="w-full h-48 sm:h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
    />
</div> */}

