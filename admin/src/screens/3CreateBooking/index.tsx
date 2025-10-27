import { RulesSection } from "./sections/4RulesSection/RulesSection";
import { BookingSection } from "./sections/6SidebarSection/SidebarSection";
import { DescriptionSection } from "./sections/3DescriptionSection/DescriptionSection";
import { LocationMapSection } from "./sections/5LocationMapSection/LocationMapSection";
import { СonveniencesSection } from "./sections/5СonveniencesSection/СonveniencesSection";
import { HeaderSection } from "./sections/1HeaderSection/HeaderSection";
import { GallerySection } from "./sections/2GallerySection/GallerySection";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const CreateBooking = (): JSX.Element => {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_URL

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<number | null>(null);
    const [subcategory, setSubcategory] = useState<number | null>(null);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [area, setArea] = useState(0);
    const [categories, setCategories] = useState<
        { id: number; name: string; subCategories: { id: number; name: string }[] }[]
    >([]);
    const [availableSubcategories, setAvailableSubcategories] = useState<
        { id: number; name: string }[]
    >([]);
    const [priority, setPriority] = useState(false)
    const [loadingBooking, setLoadingBooking] = useState(false);

    //GallerySection
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    //DescriptionSection
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');

    //RulesSection
    const [checkIn, setCheckIn] = useState("14:00");
    const [exit, setExit] = useState("12:00");
    const [rules, setRules] = useState<Record<string, boolean>>({
        childRules: false,
        smokingRules: false,
        petRules: false,
        partyRules: false,
    });

    //СonveniencesSection
    const [amenitiesState, setAmenitiesState] = useState({
        wifi: false,
        bedLinen: false,
        airConditioner: false,
        tv: false,
        towels: false,
        hairDryer: false,
        pool: false,
    });

    //LocationSection
    const [address, setAddress] = useState("");
    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(false);

    //SidebarSection
    const [phone, setPhone] = useState<string>("");
    const [seasonalPrices, setSeasonalPrices] = useState<
        { startDate: string; endDate: string; price: number }[]
    >([]);

    const showMap = async () => {
        if (!address) return;
        setLoading(true);
        try {
            const res = await axios.get("https://geocode-maps.yandex.ru/1.x/", {
                params: {
                    apikey: import.meta.env.VITE_YANDEX_API_KEY,
                    format: "json",
                    geocode: address,
                },
            });

            const geoObject =
                res.data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

            if (geoObject) {
                const pos = geoObject.Point.pos.split(" ").map(Number);
                setCoords([pos[1], pos[0]]); // [lat, long]
            } else {
                alert("Адрес не найден");
                setCoords(null);
            }
        } catch (err) {
            console.error("Ошибка геокодирования:", err);
            setCoords(null);
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async () => {
    //     // Проверка заголовка и подзаголовка
    //     if (!title.trim()) return alert("Введите заголовок");
    //     if (!subTitle.trim()) return alert("Введите подзаголовок");
    //     if (!description.trim()) return alert("Введите описание");

    //     // Проверка категории и подкатегории
    //     if (!category) return alert("Выберите категорию");
    //     if (category !== 4) {
    //         if (!subcategory) return alert("Выберите подкатегорию");
    //     }

    //     // Проверка числовых полей
    //     if (!guests || guests <= 0) return alert("Введите корректное количество гостей");
    //     if (!beds || beds <= 0) return alert("Введите количество кроватей");
    //     if (!area || area <= 0) return alert("Введите площадь");

    //     // Проверка адреса
    //     if (!address.trim() || !coords) return alert("Введите адрес и дождитесь загрузки карты");

    //     // Проверка телефона
    //     if (!phone.trim()) {
    //         return alert("Введите номер телефона");
    //     }

    //     // Простая проверка формата: только цифры, длина от 10 до 15
    //     const phoneRegex = /^\d{10,15}$/;
    //     if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
    //         return alert("Введите корректный номер телефона (только цифры)");
    //     }

    //     // Проверка сезонных цен
    //     if (!seasonalPrices.length) return alert("Добавьте хотя бы один период с ценой");

    //     // Проверка файлов
    //     if (!files.length) return alert("Добавьте хотя бы одну фотографию");

    //     const formData = new FormData();

    //     files.forEach(file => formData.append('files', file));

    //     try {
    //         setLoadingBooking(true)
    //         const dataBooking = {
    //             title: title,
    //             subTitle: subTitle,
    //             description: description,
    //             categoryId: category,
    //             subcategoryId: subcategory,
    //             guests: guests,
    //             beds: beds,
    //             area: area,
    //             address: address,
    //             checkIn,
    //             exit,
    //             priority: priority,

    //             // Правила проживания
    //             childRules: rules.childRules,
    //             smokingRules: rules.smokingRules,
    //             petRules: rules.petRules,
    //             partyRules: rules.partyRules,

    //             // Удобства
    //             wifi: amenitiesState.wifi,
    //             bedLinen: amenitiesState.bedLinen,
    //             airConditioner: amenitiesState.airConditioner,
    //             tv: amenitiesState.tv,
    //             towels: amenitiesState.towels,
    //             hairDryer: amenitiesState.hairDryer,
    //             pool: amenitiesState.pool,

    //             // Геолокация
    //             lat: coords[0],
    //             long: coords[1],

    //             phone: phone,
    //             seasonalPrices: seasonalPrices
    //         };

    //         const createBooking = await axios.post(`${url}/bookings`, dataBooking, {
    //             withCredentials: true
    //         });

    //         const resCreateBooking = createBooking.data.booking;

    //         await axios.post(`${url}/uploads/${resCreateBooking.id}`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //             withCredentials: true
    //         });

    //         navigate(`/card/${resCreateBooking.id}`);
    //     } catch (err: any) {
    //         console.log('Произошла ошибка при отправке данных:', err)

    //         if (err.response && err.response.status === 401) {
    //             alert("Сессия истекла. Пожалуйста, войдите заново.");
    //             navigate("/");
    //             return;
    //         } else {
    //             alert("Ошибка при отправке данных. Посмотртите консоль для справки");
    //         }
    //     } finally {
    //         setLoadingBooking(false);
    //     }
    // };


    const handleSubmit = async () => {
        // Проверка заголовка и подзаголовка
        if (!title.trim()) return alert("Введите заголовок");
        if (!subTitle.trim()) return alert("Введите подзаголовок");
        if (!description.trim()) return alert("Введите описание");

        // Проверка категории и подкатегории
        if (!category) return alert("Выберите категорию");
        if (category !== 4) {
            if (!subcategory) return alert("Выберите подкатегорию");
        }

        // Проверка числовых полей
        if (!guests || guests <= 0) return alert("Введите корректное количество гостей");
        if (!beds || beds <= 0) return alert("Введите количество кроватей");
        if (!area || area <= 0) return alert("Введите площадь");

        // Проверка адреса
        if (!address.trim() || !coords) return alert("Введите адрес и дождитесь загрузки карты");

        // Проверка телефона
        if (!phone.trim()) {
            return alert("Введите номер телефона");
        }

        // Простая проверка формата: только цифры, длина от 10 до 15
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
            return alert("Введите корректный номер телефона (только цифры)");
        }

        // Проверка сезонных цен
        if (!seasonalPrices.length) return alert("Добавьте хотя бы один период с ценой");

        // Проверка файлов
        if (!files.length) return alert("Добавьте хотя бы одну фотографию");

        // Проверка размера файлов (максимум 10MB на файл)
        const maxSize = 10 * 1024 * 1024; // 10MB
        for (let file of files) {
            if (file.size > maxSize) {
                return alert(`Файл ${file.name} слишком большой. Максимальный размер: 10MB`);
            }
        }

        try {
            setLoadingBooking(true);

            const dataBooking = {
                title: title,
                subTitle: subTitle,
                description: description,
                categoryId: category,
                subcategoryId: subcategory,
                guests: guests,
                beds: beds,
                area: area,
                address: address,
                checkIn,
                exit,
                priority: priority,

                // Правила проживания
                childRules: rules.childRules,
                smokingRules: rules.smokingRules,
                petRules: rules.petRules,
                partyRules: rules.partyRules,

                // Удобства
                wifi: amenitiesState.wifi,
                bedLinen: amenitiesState.bedLinen,
                airConditioner: amenitiesState.airConditioner,
                tv: amenitiesState.tv,
                towels: amenitiesState.towels,
                hairDryer: amenitiesState.hairDryer,
                pool: amenitiesState.pool,

                // Геолокация
                lat: coords[0],
                long: coords[1],

                phone: phone,
                seasonalPrices: seasonalPrices
            };

            // 1. Сначала создаем бронирование
            const createBooking = await axios.post(`${url}/bookings`, dataBooking, {
                withCredentials: true,
                timeout: 30000
            });

            const resCreateBooking = createBooking.data.booking;

            // 2. Затем загружаем файлы с улучшенной обработкой
            if (files.length > 0) {
                try {
                    await uploadFilesInBatches(resCreateBooking.id, files, 2);
                } catch (uploadError) {
                    console.error('Ошибка загрузки файлов:', uploadError);
                    alert('Бронирование создано, но некоторые файлы не загрузились. Вы можете добавить их позже.');
                }
            }

            navigate(`/card/${resCreateBooking.id}`);

        } catch (err: any) {
            handleSubmitError(err);
        } finally {
            setLoadingBooking(false);
        }
    };

    const uploadFilesInBatches = async (bookingId: number, files: File[], batchSize: number) => {
        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            const uploadPromises = batch.map(file => uploadSingleFile(bookingId, file));

            await Promise.all(uploadPromises);

            // Пауза между батчами для избежания перегрузки
            if (i + batchSize < files.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    };

    const uploadSingleFile = async (bookingId: number, file: File) => {
        const formData = new FormData();
        formData.append('files', file);

        return axios.post(`${url}/uploads/${bookingId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            timeout: 60000
        });
    };

    const handleSubmitError = (err: any) => {
        console.log('Произошла ошибка при отправке данных:', err);

        if (err.code === 'ERR_HTTP2_PROTOCOL_ERROR') {
            alert("Проблема с соединением. Пожалуйста, попробуйте еще раз или уменьшите размер файлов.");
        } else if (err.code === 'ECONNABORTED') {
            alert("Превышено время ожидания. Пожалуйста, проверьте интернет-соединение.");
        } else if (err.response?.status === 401) {
            alert("Сессия истекла. Пожалуйста, войдите заново.");
            navigate("/");
        } else if (err.response?.status === 413) {
            alert("Слишком большой размер файлов. Пожалуйста, уменьшите размер фотографий.");
        } else if (err.response?.status === 429) {
            alert("Слишком много запросов. Пожалуйста, подождите немного.");
        } else {
            alert("Ошибка при отправке данных. Пожалуйста, попробуйте еще раз.");
        }
    };


    const handleFiles = (selected: FileList | null) => {
        if (!selected) return;
        const validFiles = Array.from(selected).filter((f) => f.type === "image/jpeg");
        if (validFiles.length !== selected.length) {
            alert("Можно загружать только JPG файлы");
        }
        setFiles((prev) => [...prev, ...validFiles]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    useEffect(() => {
        console.log("priority", priority)
    }, [priority])

    if (loadingBooking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700 p-6">
                <p className="text-xl animate-pulse">Отправка данных бронирования на сервер...</p>
            </div>
        );
    }

    return (
        <main className="bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <HeaderSection
                            title={title} setTitle={setTitle}
                            category={category} setCategory={setCategory}
                            subcategory={subcategory} setSubcategory={setSubcategory}
                            guests={guests} setGuests={setGuests}
                            beds={beds} setBeds={setBeds}
                            area={area} setArea={setArea}
                            categories={categories} setCategories={setCategories}
                            availableSubcategories={availableSubcategories} setAvailableSubcategories={setAvailableSubcategories}
                            priority={priority} setPriority={setPriority}
                        />

                        <GallerySection
                            files={files} setFiles={setFiles}
                            isDragging={isDragging} setIsDragging={setIsDragging}
                            handleFiles={handleFiles} handleDrop={handleDrop} />

                        <DescriptionSection
                            subTitle={subTitle} setSubTitle={setSubTitle}
                            description={description} setDescription={setDescription} />

                        <RulesSection
                            checkIn={checkIn} setCheckIn={setCheckIn}
                            exit={exit} setExit={setExit}
                            rules={rules} setRules={setRules} />

                        <СonveniencesSection
                            amenitiesState={amenitiesState}
                            setAmenitiesState={setAmenitiesState}
                        />

                        <LocationMapSection
                            address={address} setAddress={setAddress}
                            coords={coords}
                            loading={loading}
                            showMap={showMap}
                        />

                        <div className="w-full">
                            <Button
                                variant="outline"
                                className="w-full py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl"
                                onClick={handleSubmit}
                            >
                                Сохарнить
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <BookingSection
                            phone={phone}
                            setPhone={setPhone}
                            seasonalPrices={seasonalPrices}
                            setSeasonalPrices={setSeasonalPrices}
                        />
                    </div>

                </div>
            </div>
        </main>
    );
};
