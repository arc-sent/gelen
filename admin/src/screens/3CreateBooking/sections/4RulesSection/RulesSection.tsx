import { Card, CardContent } from "../../../../components/ui/card";
import { useState } from "react";

export const RulesSection = ({ checkIn, setCheckIn, exit, setExit, rules, setRules }: { checkIn: string, setCheckIn: React.Dispatch<React.SetStateAction<string>>, exit: string, setExit: React.Dispatch<React.SetStateAction<string>>, rules: Record<string, boolean>, setRules: React.Dispatch<React.SetStateAction<Record<string, boolean>>> }): JSX.Element => {

  const handleToggle = (key: keyof typeof rules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const amenityRules = [
    {
      key: "childRules" as const,
      iconYes: "/imageCardInho/baby-icon.svg",
      iconNo: "/imageCardInho/baby-no-icon.svg",
      textYes: "можно с детьми любого возраста",
      textNo: "размещение с детьми не допускается",
    },
    {
      key: "smokingRules" as const,
      iconYes: "/imageCardInho/smoke-icon.svg",
      iconNo: "/imageCardInho/smoke-no-icon.svg",
      textYes: "курение разрешено в специально отведенных местах",
      textNo: "курение запрещено на всей территории",
    },
    {
      key: "petRules" as const,
      iconYes: "/imageCardInho/pet-icon.svg",
      iconNo: "/imageCardInho/pet-no-icon.svg",
      textYes: "разрешено проживание с питомцами",
      textNo: "нельзя с питомцами",
    },
    {
      key: "partyRules" as const,
      iconYes: "/imageCardInho/party-icon.svg",
      iconNo: "/imageCardInho/patry-no-icon.svg",
      textYes: "разрешены вечеринки и мероприятия",
      textNo: "без вечеринок и мероприятий",
    },
  ];

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6">
        <h2 className="mb-6 font-bold text-black text-[22px] leading-[normal]">
          Правила объекта размещения
        </h2>

        {/* Время заезда и отъезда */}
        <div className="flex flex-col sm:flex-row sm:gap-[142px] mb-8">
          {[
            { label: "Заезд", value: checkIn, setValue: setCheckIn },
            { label: "Отъезд", value: exit, setValue: setExit },
          ].map((item, index) => (
            <div key={index} className="flex flex-col mb-4 sm:mb-0">
              <label className="font-medium text-black text-base mb-2">{item.label}</label>
              <div className="flex items-center gap-2">
                <span>{item.label === "Заезд" ? "после" : "до"}</span>
                <input
                  type="time"
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                  className="border-2 border-gray-300 hover:border-[#59a35d] rounded px-2 py-1 text-sm"
                  aria-label="Время заезда/выезда"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Правила с чекбоксами */}
        <div className="flex flex-col gap-4">
          {amenityRules.map((rule) => (
            <label
              key={rule.key}
              className="flex items-center gap-3 sm:gap-4 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={rules[rule.key]}
                onChange={() => handleToggle(rule.key)}
                className="w-5 h-5 accent-[#66BB6A] hover:accent-[#59a35d]"
              />
              <img className="w-[25px] h-[25px]" alt="Icon" src={rules[rule.key] ? rule.iconYes : rule.iconNo} />
              <span className="font-normal text-black text-sm">
                {rules[rule.key] ? rule.textYes : rule.textNo}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
