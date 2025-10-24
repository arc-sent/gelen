import { RulesSection } from "./sections/4RulesSection/RulesSection";
import { SidebarSection } from "./sections/6SidebarSection/SidebarSection";
import { DescriptionSection } from "./sections/3DescriptionSection/DescriptionSection";
import { LocationMapSection } from "./sections/5LocationMapSection/LocationMapSection";
import { ConeniencesSection } from "./sections/5СonveniencesSection/СonveniencesSection";
import { HeaderSection } from "./sections/1HeaderSection/HeaderSection";
import { GallerySection } from "./sections/2GallerySection/GallerySection";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { DataSection } from "./sections/DataSection/DataSection";
import { Booking, Image } from "../interfaces/booking.interface";
import { Conveniences } from "./interfaces";
import { Rules } from "./interfaces";
import { Helmet } from "react-helmet-async";

export const BookingCardInfo = (): JSX.Element => {
  const params = useParams();
  const id = params.id
  const url = import.meta.env.VITE_URL;
  const urlFrontend = import.meta.env.VITE_FRONTEND;

  const [errorBooking, setErrorBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dataBooking, setDataBooking] = useState<Booking | null>(null);
  const [rules, setRules] = useState<Rules>({
    childRules: false,
    smokingRules: false,
    petRules: false,
    partyRules: false,
  });
  const [conveniences, setConveniences] = useState<Conveniences>({
    wifi: false,
    bedLinen: false,
    airConditioner: false,
    tv: false,
    towels: false,
    hairDryer: false,
    pool: false,
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return; // если id нет — не запрашиваем

    const getBookingInfo = async () => {
      try {
        const res = await axios.get(`${url}/bookings/${id}`, {
          validateStatus: () => true
        });

        if (res.status === 404 || !res.data) {
          setErrorBooking(true);
          setErrorMessage(res.data?.message || "Бронь не найдена");
          return;
        }

        setDataBooking(res.data);
      } catch {
        setErrorBooking(true);
        setErrorMessage("Ошибка загрузки данных бронирования");
      }
    };

    getBookingInfo();
  }, [id, url]);

  useEffect(() => {
    if (!dataBooking) return;

    setRules({
      childRules: dataBooking.childRules,
      smokingRules: dataBooking.smokingRules,
      petRules: dataBooking.petRules,
      partyRules: dataBooking.partyRules,
    });

    setConveniences({
      wifi: dataBooking.wifi,
      bedLinen: dataBooking.bedLinen,
      airConditioner: dataBooking.airConditioner,
      tv: dataBooking.tv,
      towels: dataBooking.towels,
      hairDryer: dataBooking.hairDryer,
      pool: dataBooking.pool,
    });

    setImages(dataBooking.image?.map((item) => item.path) || []);
  }, [dataBooking]);

  if (errorBooking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-6">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Ошибка</h1>
        <p className="mb-4 text-center">{errorMessage}</p>
        <Link to='/' onClick={() => window.scrollTo(0, 0)}>
          На главную
        </Link>
      </div>
    );
  }

  if (!dataBooking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700 p-6">
        <p className="text-xl animate-pulse">Загрузка данных бронирования...</p>
      </div>
    );
  }

  return (
    <main className="bg-white w-full">
      <Helmet>
        <title>{dataBooking.title} — Отдых в Геленджике</title>
        <meta name="description" content={dataBooking.subTitle} />
        <meta property="og:title" content={dataBooking.title} />
        <meta property="og:description" content={dataBooking.subTitle} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${urlFrontend}/card/${dataBooking.id}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HeaderSection
          title={dataBooking.title}
          address={dataBooking.address}
          id={dataBooking.id}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GallerySection id={dataBooking.id} images={images} />
            <DataSection
              guests={dataBooking.guests}
              beds={dataBooking.beds}
              area={dataBooking.area}
            />
            <DescriptionSection subTitle={dataBooking.subTitle} description={dataBooking.description} />
            <RulesSection checkIn={dataBooking.checkIn} exit={dataBooking.exit} rules={rules} />
            <ConeniencesSection conveniences={conveniences} />
            <LocationMapSection lat={dataBooking.lat} long={dataBooking.long} address={dataBooking.address} />
          </div>

          <div className="lg:col-span-1">
            <SidebarSection
              seasonalPrices={dataBooking.seasonalPrices}
              phone={dataBooking.phone}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
