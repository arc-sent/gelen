import { Card, CardContent } from "../../../../components/ui/card";
import { useState, useEffect, useRef } from "react";

export const HeaderSection = ({
    title,
    setTitle,
    category,
    setCategory,
    subcategory,
    setSubcategory,
    guests,
    setGuests,
    beds,
    setBeds,
    area,
    setArea,
    categories,
    setCategories,
    availableSubcategories,
    setAvailableSubcategories,
    priority,
    setPriority
}: {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    category: number | null;
    setCategory: React.Dispatch<React.SetStateAction<number | null>>;
    subcategory: number | null;
    setSubcategory: React.Dispatch<React.SetStateAction<number | null>>;
    guests: number;
    setGuests: React.Dispatch<React.SetStateAction<number>>;
    beds: number;
    setBeds: React.Dispatch<React.SetStateAction<number>>;
    area: number;
    setArea: React.Dispatch<React.SetStateAction<number>>;
    categories: {
        id: number;
        name: string;
        subCategories: {
            id: number;
            name: string;
        }[];
    }[],
    setCategories: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        subCategories: {
            id: number;
            name: string;
        }[];
    }[]>>,
    availableSubcategories: {
        id: number;
        name: string;
    }[],
    setAvailableSubcategories: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
    }[]>>,
    priority: boolean,
    setPriority: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const url = import.meta.env.VITE_URL
    // Переводы категорий и подкатегорий
    const CATEGORY_TRANSLATIONS: Record<string, string> = {
        APARTMENTS: "Квартиры",
        ROOMS: "Комнаты",
        HOUSES: "Дома",
        HOUSES_COTTAGES: "Дома/Коттеджи",
    };

    const SUBCATEGORY_TRANSLATIONS: Record<string, string> = {
        ONE_ROOM: "Однокомнатная",
        TWO_ROOMS: "Двухкомнатная",
        THREE_ROOMS: "Трёхкомнатная",
        APARTMENT: "Апартаменты",
        STUDIO: "Студия",
        MINI_HOTEL: "Мини-отель",
        GUEST_HOUSE: "Гостевой дом",
        PRIVATE_SECTOR: "Частный сектор",
        TOWNHOUSE: "Таунхаус",
        DACHA: "Дача",
    };

    // Автоматическая подстройка высоты textarea
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height = titleRef.current.scrollHeight + "px";
        }
    }, [title]);

    // Загружаем категории из API
    useEffect(() => {
        fetch(`${url}/category`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Ошибка загрузки категорий:", err));
    }, []);

    // Фильтруем подкатегории при выборе категории
    useEffect(() => {
        if (category) {
            const selected = categories.find((c) => c.id === category);
            setAvailableSubcategories(selected ? selected.subCategories : []);
            setSubcategory(null);
        } else {
            setAvailableSubcategories([]);
        }
    }, [category, categories, setSubcategory]);

    return (
        <Card className="w-full bg-white rounded-lg mb-8">
            <CardContent className="p-6 space-y-4">
                {/* Заголовок */}
                <textarea
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок"
                    className="w-full font-bold text-[22px] text-black leading-normal resize-none overflow-hidden border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                />

                <div className="col-span-2 md:col-span-1 flex items-center space-x-2 mt-2">
                    <input
                        type="checkbox"
                        checked={priority}
                        onChange={(e) => setPriority(e.target.checked)}
                        id="priority"
                        className="w-6 h-6 rounded-lg accent-[#66BB6A] hover:accent-[#59a35d] transition-colors duration-200 cursor-pointer"
                    />
                    <label htmlFor="priority" className="text-sm text-gray-700 cursor-pointer select-none">
                        Приоритетное размещение
                    </label>
                </div>

                {/* Поля */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {/* Категория */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Категория</label>
                        <select
                            value={category ?? ""}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            aria-label="Выберите категорию"
                            className="w-full border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {CATEGORY_TRANSLATIONS[cat.name] || cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Подкатегория */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Подкатегория</label>
                        <select
                            value={subcategory ?? ""}
                            onChange={(e) => setSubcategory(Number(e.target.value))}
                            disabled={!availableSubcategories.length}
                            aria-label="Выберите подкатегорию"
                            className="w-full border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                        >
                            <option value="">
                                {availableSubcategories.length ? "Выберите подкатегорию" : "Нет подкатегорий"}
                            </option>
                            {availableSubcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {SUBCATEGORY_TRANSLATIONS[sub.name] || sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Гостей */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Гостей</label>
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                            placeholder="2"
                        />
                    </div>

                    {/* Кроватей */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Кроватей</label>
                        <input
                            type="number"
                            value={beds}
                            onChange={(e) => setBeds(Number(e.target.value))}
                            className="w-full border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                            placeholder="1"
                        />
                    </div>

                    {/* Площадь */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Площадь (м²)</label>
                        <input
                            type="number"
                            value={area}
                            onChange={(e) => setArea(Number(e.target.value))}
                            className="w-full border-2 border-gray-300 rounded p-1 focus:outline-none focus:border-[#59a35d]"
                            placeholder="40"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
