import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Link } from "react-router-dom";

interface SeasonalPrice {
  startDate: string,
  endDate: string,
  price: number
}

export const SidebarSection = (
  {
    seasonalPrices,
    phone
  }:
    {
      seasonalPrices: SeasonalPrice[] | undefined,
      phone: string
    }
): JSX.Element => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ru-RU");

  return (
    <section className="w-full relative">
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-5 space-y-4">

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f6f6f6]">
              <tr>
                <th className="p-2 text-left text-gray-700 font-semibold break-words">Период</th>
                <th className="p-2 text-right text-gray-700 font-semibold break-words">Цена / сутки</th>
              </tr>
            </thead>
            <tbody>
              {(seasonalPrices?.length ?? 0) > 0 ? (
                seasonalPrices?.map((item, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="p-2">
                      {formatDate(item.startDate)} — {formatDate(item.endDate)}
                    </td>
                    <td className="p-2 text-right">
                      {item.price.toLocaleString()} ₽
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 text-gray-500" colSpan={2}>
                    Добавьте периоды и цены
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-gray-600 text-sm leading-relaxed my-[20px]">
            Бронирование обсуждается индивидуально.
            Позвоните владельцу или{" "}
            <Link to="/#OffersSection" className="text-[#2d6cb4] hover:underline">
              узнайте подробнее
            </Link>.
          </div>

          <Button className="w-full h-[42px] bg-[#6fa759] hover:bg-[#5d8f4a] text-white rounded-[3px] border border-solid border-[#00000026]">
            <a href={`tel:${phone}`} className="w-full h-full flex items-center justify-center">
              <span className="[font-family:'Inter',Helvetica] font-normal text-sm">
                Позвонить владельцу
              </span>
            </a>
          </Button>

        </CardContent>
      </Card>
    </section>
  );
};


//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("ru-RU", {
//       day: "2-digit",
//       month: "2-digit",
//     });

//   return (
//     <section className="w-full relative">
//       <Card className="bg-white rounded-lg shadow-sm">
//         <CardContent className="p-5 space-y-4">

//           <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-[#f6f6f6]">
//               <tr>
//                 <th className="p-2 text-left">Период</th>
//                 <th className="p-2 text-right">Цена / сутки</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(seasonalPrices?.length ?? 0) > 0 ? (
//                 seasonalPrices.map((item, i) => (
//                   <tr key={i} className="border-t border-gray-200">
//                     <td className="p-2">
//                       {formatDate(item.startDate)} — {formatDate(item.endDate)}
//                     </td>
//                     <td className="p-2 text-right">
//                       {item.price.toLocaleString()} ₽
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="p-2 text-gray-500" colSpan={2}>
//                     Добавьте периоды и цены
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <Button className="w-full h-[42px] bg-[#6fa759] hover:bg-[#5d8f4a] text-white rounded-[3px] border border-solid border-[#00000026]">
//             <span className="[font-family:'Inter',Helvetica] font-normal text-sm">
//               Позвонить собственику
//             </span>
//           </Button>
//         </CardContent>
//       </Card>
//     </section>
//   );
// };

// export const SidebarSection = (): JSX.Element => {
//   const [checkIn, setCheckIn] = useState<string>("2025-06-26");
//   const [checkOut, setCheckOut] = useState<string>("2025-06-28");

//   const PREPAYMENT_PERCENT = 0.25; // % предоплаты
//   const DEPOSIT_AMOUNT = 3000; // залог (можно менять)

//   const prices: Record<string, number> = {
//     "Июнь": 10000,
//     "Июль": 10000,
//     "Август": 7000,
//     "Межсезон": 5000,
//   };

//   // расчет суммы
//   const calculateTotal = () => {
//     if (!checkIn || !checkOut) return 0;
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     let total = 0;

//     for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
//       const month = d.getMonth(); // 0-январь, 5-июнь, 6-июль, 7-август
//       if (month === 5) total += prices["Июнь"];
//       else if (month === 6) total += prices["Июль"];
//       else if (month === 7) total += prices["Август"];
//       else total += prices["Межсезон"];
//     }

//     return total;
//   };

//   const total = calculateTotal();
//   const prepayment = Math.round(total * PREPAYMENT_PERCENT);
//   const remainingPayment = total - prepayment;

//   const paymentBreakdown = [
//     {
//       label: "Предоплата",
//       amount: `${prepayment.toLocaleString()} ₽`,
//       bgColor: "bg-[#f6f6f6]",
//     },
//     {
//       label: "Оплата при заселении",
//       amount: `${remainingPayment.toLocaleString()} ₽`,
//       bgColor: "bg-[#f6f6f6]",
//     },
//     {
//       label: "Залог (возвращается)",
//       amount: `${DEPOSIT_AMOUNT.toLocaleString()} ₽`,
//       bgColor: "bg-[#f6f6f6]",
//     },
//   ];

//   return (
//     <section className="w-full relative">
//       <Card className="bg-white rounded-lg shadow-sm">
//         <CardContent className="p-5 space-y-4">

//           <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-[#f6f6f6]">
//               <tr>
//                 <th className="p-2 text-left">Период</th>
//                 <th className="p-2 text-right">Цена / сутки</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(prices).map(([season, price], i) => (
//                 <tr key={i} className="border-t border-gray-200">
//                   <td className="p-2">{season}</td>
//                   <td className="p-2 text-right">{price.toLocaleString()} ₽</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               className="h-[42px] px-4 rounded-[3px] border border-solid border-[#d8d8d8] text-sm"
//               placeholder="Выберите дату"
//             />
//             <input
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               className="h-[42px] px-4 rounded-[3px] border border-solid border-[#d8d8d8] text-sm"
//               placeholder="Выберите дату"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm">
//               Итого за{" "}
//               {checkIn && checkOut
//                 ? Math.max(
//                   1,
//                   Math.round(
//                     (new Date(checkOut).getTime() -
//                       new Date(checkIn).getTime()) /
//                     (1000 * 60 * 60 * 24)
//                   )
//                 )
//                 : 0}{" "}
//               суток
//             </span>
//             <span className="[font-family:'Inter',Helvetica] font-bold text-black text-base">
//               {total.toLocaleString()} ₽
//             </span>
//           </div>

//           <div className="space-y-2">
//             {paymentBreakdown.map((payment, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center justify-between h-[42px] px-2.5 ${payment.bgColor} rounded-[3px]`}
//               >
//                 <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm">
//                   {payment.label}
//                 </span>
//                 <span className="[font-family:'Inter',Helvetica] font-bold text-black text-sm">
//                   {payment.amount}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <Button className="w-full h-[42px] bg-[#6fa759] hover:bg-[#5d8f4a] text-white rounded-[3px] border border-solid border-[#00000026]">
//             <span className="[font-family:'Inter',Helvetica] font-normal text-sm">
//               Позвонить собственику
//             </span>
//           </Button>
//         </CardContent>
//       </Card>
//     </section>
//   );
// };