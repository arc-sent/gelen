import { Card, CardContent } from "../../../../components/ui/card";
import { useState } from "react";

interface AmenitiesInterface {
  wifi: boolean;
  bedLinen: boolean;
  airConditioner: boolean;
  tv: boolean;
  towels: boolean;
  hairDryer: boolean;
  pool: boolean;
}

export const СonveniencesSection = ({ amenitiesState, setAmenitiesState }: { amenitiesState: AmenitiesInterface, setAmenitiesState: React.Dispatch<React.SetStateAction<AmenitiesInterface>> }): JSX.Element => {
  const amenities = [
    { key: "wifi" as const, icon: "/imageCardInho/Icon-4.svg", text: "беспроводной интернет Wi-Fi" },
    { key: "bedLinen" as const, icon: "/imageCardInho/Icon-5.svg", text: "постельное белье" },
    { key: "airConditioner" as const, icon: "/imageCardInho/Icon-6.svg", text: "кондиционер" },
    { key: "tv" as const, icon: "/imageCardInho/Icon-7.svg", text: "телевизор" },
    { key: "towels" as const, icon: "/imageCardInho/Icon-8.svg", text: "полотенца" },
    { key: "hairDryer" as const, icon: "/imageCardInho/Icon-9.svg", text: "фен" },
    { key: "pool" as const, icon: "/imageCardInho/pool.svg", text: "бассейн" },
  ];

  const toggleAmenity = (key: keyof typeof amenitiesState) => {
    setAmenitiesState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6">
        <h2 className="font-bold text-black text-[22px] leading-normal mb-6">
          Основные удобства
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {amenities.map((amenity) => (
            <label key={amenity.key} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={amenitiesState[amenity.key]}
                onChange={() => toggleAmenity(amenity.key)}
                className="w-5 h-5 accent-[#66BB6A] hover:accent-[#59a35d]"
              />
              <img
                className="w-6 h-6 flex-shrink-0"
                alt="Icon"
                src={amenity.icon}
              />
              <span className="font-normal text-black text-sm leading-normal">
                {amenity.text}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

