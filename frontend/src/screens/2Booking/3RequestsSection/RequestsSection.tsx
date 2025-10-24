import { Badge } from "../../../components/ui/badge";

export const RequestsSection = () => {
    const popularTags = [
        "Апартаменты и квартиры",
        "Комнаты",
        "Дома и коттеджи",
        "Хостелы",
        "Частный сектор",
        "1-комнатные",
        "2-комнатные",
        "3-комнатные",
        "4-комнатные",
        "С кондиционером",
        "С хорошими отзывами",
        "С парковкой",
        "С доступом для инвалидов",
        "С джакузи",
        "С интернетом",
        "Заезд с животными",
        "Для вечеринок",
        "На Новый Год",
        "С отчётными документами",
        "Мгновенное бронирование",
        "Горящие предложения",
        "Отели",
        "Мини-отели",
        "Гостевые дома",
        "Апарт-отели",
        "Студии",
        "Базы отдыха",
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Популярные запросы:
            </h2>
            <div className="flex flex-wrap gap-3">
                {popularTags.map((tag, index) => (
                    <Badge
                        key={index}
                        variant="outline"
                        className="px-4 py-2 rounded-full border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </section>
    )
}