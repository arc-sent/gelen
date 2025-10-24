import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ElementLight } from "./screens/1Main";
import { BookingIndex } from "./screens/2Booking";
import { FooterSection } from "./screens/1Main/sections/7FooterSection/footerSection";
import { Header } from "./screens/1Main/sections/1HeaderSection/Header";
import { BookingCardInfo } from "./screens/3BookingCard";
import { Navigate } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ElementLight />} />
        <Route path="/booking" element={<BookingIndex />} />
        <Route path="/card/:id" element={<BookingCardInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FooterSection />
    </BrowserRouter>
  )
};
