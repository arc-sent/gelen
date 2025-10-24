import { Button } from "../../../../components/ui/button";
import { CardBooking } from "../../../2Booking/2CardsSection/CardBooking";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookingWithSeasonalPrice } from "../../../interfaces/booking.interface";

export const OffersSection = (): JSX.Element => {
  const url = import.meta.env.VITE_URL;
  const [errorBooking, setErrorBooking] = useState(false)
  const [errorBookingRandom, setErrorBookingRandom] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [bookings, setBookings] = useState<BookingWithSeasonalPrice[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${url}/bookings/priority`, {
          validateStatus: () => true
        });

        if (res.status === 404) {
          setErrorBooking(true);
          const fallback = await axios.get(`${url}/bookings/random`, {
            validateStatus: () => true
          });
          if (fallback.status === 404) {
            setErrorMessage(fallback.data.message);
          } else {
            setBookings(fallback.data);
          }
        } else {
          setBookings(res.data);
        }
      } catch (err: any) {
        setErrorMessage('Ошибка загрузки данных');
      }
    };

    fetchBookings();
  }, [url]);


  if (errorBookingRandom) {
    return <h1>{errorMessage}</h1>
  }

  return (
    <div>
      <section className="w-full pt-[128px] md:pt-[142px] lg:pt-[156px] bg-white" id="OffersSection">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Отдых в Геленджике: выбери жильё у моря
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mt-[45px]">
            Найди идеальный вариант для твоего отдыха: квартиры, номера и дома с удобным расположением у моря.
          </p>
        </div>
      </section>


      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-4 flex flex-col items-center">
            {bookings.map((booking: BookingWithSeasonalPrice) => (
              <Link
                to={`/card/${booking.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="block w-full"
              >
                <CardBooking booking={booking} key={booking.id} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="text-center mt-10">
              <Link to='/booking' onClick={() => window.scrollTo(0, 0)}>
                <Button
                  variant="outline"
                  className="w-full max-w-[850px] py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl"
                >
                  Смотреть все
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section >
    </div >
  );
};