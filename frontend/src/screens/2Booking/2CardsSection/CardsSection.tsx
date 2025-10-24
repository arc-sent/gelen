import { CardBooking } from "./CardBooking";
import { Button } from "../../../components/ui/button";
import { BookingWithSeasonalPrice } from "../../interfaces/booking.interface";
import { Link } from "react-router-dom";
import { FiInbox } from "react-icons/fi"; // иконка "папка/почта"
import { motion } from "framer-motion"; // для лёгкой анимации появления

export const CardsSection = ({
    bookings,
    handleClick,
    click
}: {
    bookings: BookingWithSeasonalPrice[];
    handleClick: () => Promise<void>;
    click: boolean;
}) => {
    return (
        <main className="flex-1">
            {bookings.length === 0 ? (
                <motion.div
                    className="flex flex-col items-center justify-center py-20 px-4 sm:py-16 sm:px-6 md:py-24 md:px-8 text-gray-400 min-h-[50vh]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FiInbox size={48} className="mb-4 text-gray-300" />
                    <p className="text-base sm:text-lg md:text-xl font-medium mb-2 text-center">
                        Пока что ничего нет
                    </p>
                    <p className="text-sm sm:text-base md:text-base text-gray-500 mb-6 text-center">
                        Попробуйте обновить страницу или проверить позже
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-4 flex flex-col items-center">
                    {bookings.map((booking) => (
                        <Link
                            key={booking.id}
                            to={`/card/${booking.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="block w-full"
                        >
                            <CardBooking booking={booking} />
                        </Link>
                    ))}
                </div>
            )}

            {!click && (
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        className="w-full max-w-[850px] py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl transition-all duration-200"
                        onClick={handleClick}
                    >
                        {bookings.length === 0 ? "Обновить" : "Смотреть все"}
                    </Button>
                </div>
            )}
        </main>
    );
};


