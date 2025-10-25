import { Card, CardContent } from "../../../../components/ui/card";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface LocationMapSectionProps {
  lat: number;
  long: number;
  address: string;
}

export const LocationMapSection = ({ lat, long, address }: LocationMapSectionProps): JSX.Element => {
  return (
    <Card className="w-full bg-white rounded-lg shadow-sm border mb-8" id="locationCard">
      <CardContent className="p-6">
        <header className="mb-5">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-black text-[22px] leading-normal break-words">
            {address}
          </h2>

        </header>

        <Card className="bg-[#e5e3df] border rounded-lg overflow-hidden">
          <CardContent className="p-0 h-64 md:h-80 lg:h-96 relative">
            <YMaps>
              <Map
                defaultState={{ center: [lat, long], zoom: 15 }}
                width="100%"
                height="100%"
              >
                <Placemark geometry={[lat, long]} />
              </Map>
            </YMaps>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
