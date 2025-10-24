import { Card, CardContent } from "../../../../components/ui/card";
import { useState, useEffect, useRef } from "react";

export const DescriptionSection = ({ subTitle, setSubTitle, description, setDescription }: { subTitle: string, setSubTitle: React.Dispatch<React.SetStateAction<string>>, description: string, setDescription: React.Dispatch<React.SetStateAction<string>> }) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const subTitleRef = useRef<HTMLTextAreaElement>(null);

  // Авто-рост textarea под содержимое
  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px";
    }
    if (subTitleRef.current) {
      subTitleRef.current.style.height = "auto";
      subTitleRef.current.style.height = subTitleRef.current.scrollHeight + "px";
    }
  }, [description, subTitle]);

  return (
    <Card className="w-full bg-white rounded-lg mb-8">
      <CardContent className="p-6 space-y-4">
        <textarea
          ref={subTitleRef}
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Введите подзаголовок"
          className="w-full font-bold text-[22px] text-black leading-normal resize-none overflow-hidden border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
        />

        <textarea
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание квартиры"
          className="w-full text-sm leading-relaxed text-[#212529] font-normal resize-none overflow-hidden border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-[#59a35d] whitespace-pre-line"
        />
      </CardContent>
    </Card>

  );
};
