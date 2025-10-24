import { OffersSection } from "./sections/3OffersSection/OffersSection";
import { ContactsSection } from "./sections/6ContactsSection/ContactsSection";
import { BookingSteps } from "./sections/4BookingSteps/BookingSteps";
import { FAQSection } from "./sections/5FAQSection/FAQSection";
import { HeroSection } from "./sections/2HeroSection/HeroSection";
import { Helmet } from "react-helmet-async";

export const ElementLight = (): JSX.Element => {
  const pageTitle = "Бронирование — Отдых в Геленджике";
  const pageDescription = "Лучшие предложения по отдыху в Геленджике. Забронируйте прямо сейчас!";
  const urlFrontend = import.meta.env.VITE_URL;

  return (
    <div className="bg-[#f6f6f6] w-full min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${urlFrontend}/booking`} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${urlFrontend}/booking`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <HeroSection />
      <OffersSection />
      <BookingSteps />
      <FAQSection />
      <ContactsSection />
    </div>
  );
};


