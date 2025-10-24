import { SideSection } from "./1SideSection/SideSection";
import { CardsSection } from "./2CardsSection/CardsSection";
import { RequestsSection } from "./3RequestsSection/RequestsSection";
import { useEffect, useState } from "react";
import axios from "axios";

type Subcategory = {
    id: number;
    name: string;
    selected: boolean;
};

type AccommodationType = {
    id: number;
    name: string;
    selected: boolean;
    subcategories: Subcategory[];
};


export const BookingIndex = (): JSX.Element => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [minPriceStr, setMinPriceStr] = useState("0");
    const [maxPriceStr, setMaxPriceStr] = useState("20000");
    const url = import.meta.env.VITE_URL;
    const [accommodationTypes, setAccommodationTypes] = useState<AccommodationType[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [errorBooking, setErrorBooking] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [bookings, setBookings] = useState<any[]>([]);
    const [click, setClick] = useState(false);

    const CATEGORY_TRANSLATIONS: Record<string, string> = {
        APARTMENTS: "Квартиры",
        ROOMS: "Комнаты",
        HOUSES: "Дома"
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

    const UpdateBookings = async () => {
        try {
            const req = await axios.post(`${url}/category/many`,
                {
                    categories: accommodationTypes,
                    priceMin: minPrice,
                    priceMax: maxPrice
                }
            );

            setBookings(req.data)
        } catch (err) {
            console.error('Произошла ошибка', err)
        }
    }

    const handleGetAll = async () => {
        try {
            const req = await axios.get(`${url}/bookings`);

            setBookings(req.data)
            setClick(true)
        } catch (err) {
            console.error('Произошла ошибка', err)
        }
    }

    useEffect(() => {
        if (!isFiltered) return;
        UpdateBookings();
    }, [minPrice, maxPrice, accommodationTypes]);


    useEffect(() => {
        fetch(`${url}/category`)
            .then((res) => res.json())
            .then((data) => {
                const mapped: AccommodationType[] = data.map((cat: any) => ({
                    id: cat.id,
                    name: CATEGORY_TRANSLATIONS[cat.name] || cat.name, // перевод категории
                    subName: cat.name,
                    selected: false,
                    subcategories: cat.subCategories.map((sub: any) => ({
                        id: sub.id,
                        name: SUBCATEGORY_TRANSLATIONS[sub.name] || sub.name, // перевод подкатегории
                        subName: cat.name,
                        selected: false,
                    })),
                }));

                setAccommodationTypes(mapped);
            })
            .catch((err) => console.error("Ошибка загрузки категорий:", err));
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${url}/bookings/priority`, {
                    validateStatus: () => true
                });

                if (res.status === 404) {
                    setErrorBooking(true);
                    const fallback = await axios.get(`${url}/bookings/random`, {
                        validateStatus: () => true
                    });
                    if (fallback.status === 404) {
                        setErrorMessage(fallback.data.message);
                    } else {
                        setBookings(fallback.data);
                    }
                } else {
                    setBookings(res.data);
                }
            } catch (err: any) {
                setErrorMessage('Ошибка загрузки данных');
            }
        };

        fetchBookings()
    }, [url]);

    if (errorBooking) {
        return <h1>{errorMessage}</h1>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    <SideSection
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        minPriceStr={minPriceStr} setMinPriceStr={setMinPriceStr}
                        maxPriceStr={maxPriceStr} setMaxPriceStr={setMaxPriceStr}
                        accommodationTypes={accommodationTypes} setAccommodationTypes={setAccommodationTypes}
                        setIsFiltered={setIsFiltered}
                        setClick={setClick}
                    />

                    <CardsSection
                        bookings={bookings}
                        handleClick={handleGetAll}
                        click={click}
                    />
                </div>

                <div className="mt-[60px]">
                    <div className="mb-12">
                        <p className="text-gray-700 leading-relaxed text-left">
                            Хотите снять жильё в Геленджике без лишних поисков и переплат? У нас всё
                            просто: на сайте собраны только проверенные варианты — квартиры, дома и
                            апартаменты в лучших районах города. Выбирайте по фото, читайте
                            описание, бронируйте в пару кликов и приезжайте отдыхать с комфортом. С
                            нами вы экономите время и находите именно то жильё, которое сделает
                            отпуск по-настоящему уютным.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

