import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import axios from "axios";

interface seasonalPrices {
  id?: number, startDate: string; endDate: string; price: number;
}

export const BookingSection = ({ phone, setPhone, seasonalPrices, setSeasonalPrices, setLoadingBooking }: { phone: string, setPhone: React.Dispatch<React.SetStateAction<string>>, seasonalPrices: seasonalPrices[], setSeasonalPrices: React.Dispatch<React.SetStateAction<seasonalPrices[]>>, setLoadingBooking: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
  const url = import.meta.env.VITE_URL

  const [newPeriod, setNewPeriod] = useState({
    start: "",
    end: "",
    price: "",
  });

  const addPeriod = () => {
    if (!newPeriod.start || !newPeriod.end || !newPeriod.price) return;
    setSeasonalPrices((prev) => [
      ...prev,
      {
        startDate: newPeriod.start,
        endDate: newPeriod.end,
        price: Number(newPeriod.price),
      },
    ]);
    setNewPeriod({ start: "", end: "", price: "" });
  };


  const handleDeleteSeasonalPrice = async (id?: number) => {
    try {
      setLoadingBooking(true)
      setSeasonalPrices(prev => prev.filter(item => item.id !== id));

      if (id) {
        await axios.delete(`${url}/bookings/seasonsprice/${id}`,
          {
            withCredentials: true
          }
        );
      }
    } catch (err) {
      alert("Ошибка при удалении сезонной цены");
      console.error(err);
    } finally {
      setLoadingBooking(false)
    }
  };

  return (
    <section className="w-full relative">
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-5 space-y-4">

          {/* --- Таблица периодов --- */}
          <table className="w-full table-auto border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-700 font-semibold break-words">Период</th>
                <th className="p-3 text-right text-gray-700 font-semibold break-words">Цена</th>
                <th className="p-3 text-center text-gray-700 font-semibold break-words">Действия</th>
              </tr>
            </thead>
            <tbody>
              {seasonalPrices.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-3 text-gray-800 break-words">
                    {new Date(item.startDate).toLocaleDateString()} — {new Date(item.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right text-gray-800 font-medium break-words">
                    {item.price.toLocaleString()} ₽
                  </td>
                  <td className="p-3 text-center break-words">
                    <button
                      onClick={() => handleDeleteSeasonalPrice(item.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md font-medium transition-colors duration-150"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Добавление периода --- */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Начало</label>
              <input
                type="date"
                aria-label="Дата начала"
                value={newPeriod.start}
                onChange={(e) => setNewPeriod((p) => ({ ...p, start: e.target.value }))}
                className="h-[42px] px-3 rounded-[3px] border border-[#d8d8d8] text-sm w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Конец</label>
              <input
                aria-label="Дата конца"
                type="date"
                value={newPeriod.end}
                onChange={(e) => setNewPeriod((p) => ({ ...p, end: e.target.value }))}
                className="h-[42px] px-3 rounded-[3px] border border-[#d8d8d8] text-sm w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Цена</label>
              <input
                type="number"
                placeholder="Цена"
                value={newPeriod.price}
                onChange={(e) => setNewPeriod((p) => ({ ...p, price: e.target.value }))}
                className="h-[42px] px-3 rounded-[3px] border border-[#d8d8d8] text-sm w-full"
              />
            </div>

            <Button
              onClick={addPeriod}
              className=" mt-[10px] h-[42px] w-full bg-[#6fa759] hover:bg-[#5d8f4a] text-white rounded-[3px]"
            >
              Добавить период
            </Button>
          </div>

          {/* --- Телефон --- */}
          <div className="mt-3">
            <label className="block text-sm text-gray-600 mb-1">
              Номер телефона владельца
            </label>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[42px] px-4 rounded-[3px] border border-[#d8d8d8] text-sm"
            />
          </div>

        </CardContent>
      </Card>
    </section>


  );
};


