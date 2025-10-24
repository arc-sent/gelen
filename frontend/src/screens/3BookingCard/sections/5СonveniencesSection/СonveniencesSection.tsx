import { Card, CardContent } from "../../../../components/ui/card";
import { Conveniences } from "../../interfaces";


export const ConeniencesSection = ({ conveniences }: { conveniences: Conveniences }): JSX.Element => {
  const amenities = [
    { boolean: conveniences.wifi, icon: "/imageCardInho/Icon-4.svg", text: "беспроводной интернет Wi-Fi" },
    { boolean: conveniences.bedLinen, icon: "/imageCardInho/Icon-5.svg", text: "постельное белье" },
    { boolean: conveniences.airConditioner, icon: "/imageCardInho/Icon-6.svg", text: "кондиционер" },
    { boolean: conveniences.tv, icon: "/imageCardInho/Icon-7.svg", text: "телевизор" },
    { boolean: conveniences.towels, icon: "/imageCardInho/Icon-8.svg", text: "полотенца" },
    { boolean: conveniences.hairDryer, icon: "/imageCardInho/Icon-9.svg", text: "фен" },
    { boolean: conveniences.pool, icon: "/imageCardInho/pool.svg", text: "бассейн" },
  ];

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6">
        <h2 className="[font-family:'Inter',Helvetica] font-bold text-black text-[22px] leading-normal mb-6">
          Основные удобства
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {amenities.map((amenity, index) => {
            if (!amenity.boolean) return

            return (<div key={index} className="flex items-center gap-2.5">
              <img
                className="w-6 h-6 flex-shrink-0"
                alt="Icon"
                src={amenity.icon}
              />
              <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm leading-normal">
                {amenity.text}
              </span>
            </div>)
          })}
        </div>
      </CardContent>
    </Card>
  );
};
