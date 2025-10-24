import { Card, CardContent } from "../../../../components/ui/card";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useState } from "react";
import axios from "axios";

export const LocationMapSection = ({ address, setAddress, coords, loading, showMap }: { address: string, setAddress: React.Dispatch<React.SetStateAction<string>>, coords: [number, number] | null, loading: boolean, showMap: () => Promise<void> }): JSX.Element => {

  return (
    <Card className="w-full bg-white rounded-lg shadow-sm border mb-8" id="locationCard">
      <CardContent className="p-6 space-y-4">
        {/* Поле и кнопка в одной линии, адаптив */}
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Введите адрес"
            className="flex-1 min-w-[200px] font-normal text-sm text-black leading-normal resize-none overflow-hidden border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
          />
          <button
            onClick={showMap}
            className="px-4 py-2 bg-[#6fa759] hover:bg-[#5d8f4a] text-white font-medium rounded min-w-[120px] flex-shrink-0"
          >
            Показать карту
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">Загрузка карты...</p>}

        {coords && (
          <Card className="bg-[#e5e3df] border rounded-lg overflow-hidden mt-4">
            <CardContent className="p-0 h-64 md:h-80 lg:h-96 relative">
              <YMaps>
                <Map
                  defaultState={{ center: coords, zoom: 15 }}
                  state={{ center: coords, zoom: 15 }}
                  width="100%"
                  height="100%"
                >
                  <Placemark geometry={coords} />
                </Map>
              </YMaps>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
