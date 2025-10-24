import { Card, CardContent } from "../../../../components/ui/card";
import { Rules } from "../../interfaces";

export const RulesSection = ({ checkIn, exit, rules }: { checkIn: string, exit: string, rules: Rules }): JSX.Element => {

  const checkInOutData = [
    {
      label: "Заезд",
      time: `после ${checkIn}`,
    },
    {
      label: "Отъезд",
      time: `до ${exit}`,
    },
  ];

  const amenityRules = [
    {
      icon:
        rules?.childRules ?
          "/imageCardInho/baby-icon.svg"
          :
          "/imageCardInho/baby-no-icon.svg",
      text: rules?.childRules
        ? "можно с детьми любого возраста"
        : "размещение с детьми не допускается",
    },
    {
      icon:
        rules?.smokingRules ?
          "/imageCardInho/smoke-icon.svg"
          :
          "/imageCardInho/smoke-no-icon.svg",
      text: rules?.smokingRules
        ? "курение разрешено в специально отведенных местах"
        : "курение запрещено на всей территории",
    },
    {
      icon:
        rules?.petRules ?
          "/imageCardInho/pet-icon.svg"
          :
          "/imageCardInho/pet-no-icon.svg",
      text: rules?.petRules
        ? "разрешено проживание с питомцами"
        : "нельзя с питомцами",
    },
    {
      icon:
        rules?.partyRules ?
          "/imageCardInho/party-icon.svg"
          :
          "/imageCardInho/patry-no-icon.svg",
      text: rules?.partyRules
        ? "разрешены вечеринки и мероприятия"
        : "без вечеринок и мероприятий",
    },
  ];

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6">
        <h2 className="mb-6 [font-family:'Inter',Helvetica] font-bold text-black text-[22px] tracking-[0] leading-[normal]">
          Правила объекта размещения
        </h2>

        <div className="flex gap-[142px] mb-8">
          {checkInOutData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="[font-family:'Inter',Helvetica] font-medium text-black text-base leading-[normal] tracking-[0] mb-2">
                {item.label}
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm leading-[normal] tracking-[0]">
                {item.time}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {amenityRules.map((rule, index) => (
            <div key={index} className="flex items-center gap-[35px]">
              <img className="w-[25px] h-[25px]" alt="Icon" src={rule.icon} />
              <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm leading-[normal] tracking-[0]">
                {rule.text}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
