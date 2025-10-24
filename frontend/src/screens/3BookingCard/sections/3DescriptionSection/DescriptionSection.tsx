
import { Card, CardContent } from "../../../../components/ui/card";

export const DescriptionSection = ({
  subTitle,
  description,
}: {
  subTitle?: string;
  description?: string;
}) => {
  const paragraphs = description
    ? description
      .split(/\n\s*\n|(?=Комплектация|Правила проживания|Какой же отдых|Для комфортного|На территории|Вода в квартире)/gi)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
    : [];

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6 space-y-4">
        <h2 className="font-bold text-[22px] text-black leading-normal">
          {subTitle || "Описание квартиры"}
        </h2>

        {paragraphs.length > 0 ? (
          <div className="space-y-4 text-sm leading-relaxed text-[#212529] font-normal">
            {paragraphs.map((p, index) => (
              <p key={index} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[#999] text-sm">Описание временно недоступно</p>
        )}
      </CardContent>
    </Card>
  );
};


