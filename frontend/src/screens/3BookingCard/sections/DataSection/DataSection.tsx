import { Card, CardContent } from "../../../../components/ui/card";

export const DataSection = ({
    guests,
    beds,
    area,
}: {
    guests: number;
    beds: number;
    area: number;
}) => {
    return (
        <Card className="w-full bg-white rounded-lg mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-6 space-y-4">
                <h2 className="font-bold text-[22px] text-black leading-normal">
                    Характеристики жилья
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Гостей</span>
                        <span className="font-medium text-gray-900">{guests}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Кроватей</span>
                        <span className="font-medium text-gray-900">{beds}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Площадь</span>
                        <span className="font-medium text-gray-900">{area} м²</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
