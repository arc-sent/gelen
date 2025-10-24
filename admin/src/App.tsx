import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookingIndex } from "./screens/2Booking";
import { AuthorazitionSection } from "./screens/1Authorazition";
import MainLayout from "./Main";
import { CreateBooking } from "./screens/3CreateBooking";
import { BookingCardEdit } from "./screens/4BookingCardEdit";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorazitionSection />} />
        <Route element={<MainLayout />}>
          <Route path="/booking" element={<ProtectedRoute><BookingIndex /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateBooking /></ProtectedRoute>} />
          <Route path="/card/:id" element={<ProtectedRoute><BookingCardEdit /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
};
