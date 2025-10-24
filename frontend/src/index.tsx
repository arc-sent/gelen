import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

// src/main.tsx
// import { ViteSSG } from 'vite-ssg';
// import { App } from './App';
// import { HelmetProvider } from 'react-helmet-async';
// import axios from 'axios';

// interface Booking {
//   id: number;
//   title: string;
//   subTitle: string;
// }

// async function getBookingRoutes(): Promise<{ path: string; data?: Booking }[]> {
//   try {
//     const url = import.meta.env.VITE_URL;
//     const { data } = await axios.get(`${url}/bookings/ssr`);
//     const bookingRoutes = data.map((b: Booking) => ({
//       path: `/card/${b.id}`,
//       data: b,
//     }));
//     return [{ path: '/' }, ...bookingRoutes];
//   } catch (err) {
//     console.error('Ошибка получения карточек для pre-render', err);
//     return [{ path: '/' }];
//   }
// }

// export const createApp = ViteSSG(
//   () => (
//     <HelmetProvider>
//       <App />
//     </HelmetProvider>
//   ),
//   async () => {
//     const routes = await getBookingRoutes();
//     return {
//       routes: routes.map(r => r.path),
//     };
//   },
// );
