import { RulesSection } from "./sections/4RulesSection/RulesSection";
import { BookingSection } from "./sections/6SidebarSection/SidebarSection";
import { DescriptionSection } from "./sections/3DescriptionSection/DescriptionSection";
import { LocationMapSection } from "./sections/5LocationMapSection/LocationMapSection";
import { СonveniencesSection } from "./sections/5СonveniencesSection/СonveniencesSection";
import { HeaderSection } from "./sections/1HeaderSection/HeaderSection";
import { GallerySection } from "./sections/2GallerySection/GallerySection";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Button } from "../../components/ui/button";

export const BookingCardEdit = (): JSX.Element => {
    const { id } = useParams();
    const url = import.meta.env.VITE_URL

    const navigate = useNavigate()

    const [errorBooking, setErrorBooking] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    //HeaderSection
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

    //GallerySection
    const [files, setFiles] = useState<File[]>([]);
    const [image, setImage] = useState<{
        id: number
        path: string,
        bookingId: number
    }[]>([]);
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
        { id?: number, startDate: string; endDate: string; price: number }[]
    >([]);

    useEffect(() => {
        const getBookingInfo = async () => {

            const getBooking = await axios.get(`${url}/bookings/${id}`, {
                validateStatus: () => true,
                withCredentials: true,
            });

            if (getBooking.status === 404) {
                setErrorBooking(true)
                setErrorMessage(getBooking.data.message)
            }

            const dataBooking = getBooking.data

            console.log("dataBooking", dataBooking);

            setImage(dataBooking.image);

            setTitle(dataBooking.title);
            setCategory(dataBooking.category.id);
            setSubcategory(dataBooking.subcategory.id);
            setGuests(dataBooking.guests);
            setBeds(dataBooking.beds);
            setArea(dataBooking.area);
            setPriority(dataBooking.priority);
            // setCategories(dataBooking);
            // setAvailableSubcategories(dataBooking);
            //GallerySection

            //DescriptionSection
            setSubTitle(dataBooking.subTitle);
            setDescription(dataBooking.description);

            //RulesSection
            setCheckIn(dataBooking.checkIn);
            setExit(dataBooking.exit);
            setRules({
                childRules: dataBooking.childRules,
                smokingRules: dataBooking.smokingRules,
                petRules: dataBooking.petRules,
                partyRules: dataBooking.partyRules,
            });

            //СonveniencesSection
            setAmenitiesState({
                wifi: dataBooking.wifi,
                bedLinen: dataBooking.bedLinen,
                airConditioner: dataBooking.airConditioner,
                tv: dataBooking.tv,
                towels: dataBooking.towels,
                hairDryer: dataBooking.hairDryer,
                pool: dataBooking.pool,
            });

            //LocationSection
            setAddress(dataBooking.address);
            setCoords([dataBooking.lat, dataBooking.long]);

            //SidebarSection
            setPhone(dataBooking.phone);
            setSeasonalPrices(dataBooking.seasonalPrices);
        }

        getBookingInfo()
    }, [id, url])

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

    const handleSubmit = async () => {
        // Проверка заголовка и подзаголовка
        if (!title.trim()) return alert("Введите заголовок");
        if (!subTitle.trim()) return alert("Введите подзаголовок");
        if (!description.trim()) return alert("Введите описание");

        // Проверка категории и подкатегории
        if (!category) return alert("Выберите категорию");
        if (!subcategory) return alert("Выберите подкатегорию");

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

        const formData = new FormData();

        files.forEach(file => formData.append('files', file));

        if (!image.length && !files.length) return alert("Добавьте хотя бы одну фотографию");

        try {
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

            console.log('dataBooking', dataBooking);

            const createBooking = await axios.put(`${url}/bookings/${id}`, dataBooking);

            if (files.length !== 0) {
                const response = await axios.post(`${url}/uploads/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Ответ сервера:", response.data);
            }
        } catch (err) {
            console.log('Произошла ошибка при отправке данных:', err)

            alert("Ошибка при отправке данных. Посмотртите консоль для справки");
        }
    };

    const deleteSubmit = async () => {
        try {
            const deleteBooking = await axios.delete(`${url}/bookings/${id}`)

            navigate('/booking')
            window.scrollTo(0, 0)
        } catch (err) {
            console.log('Произошла ошибка при удалении данных:', err)

            alert("Ошибка при отправке данных. Посмотртите консоль для справки");
        }
    }

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
                            id={id}
                            serverImages={image} setServerImages={setImage}
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
                                className="w-full py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl mb-8"
                                onClick={handleSubmit}
                            >
                                Сохарнить
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full py-3 border-gray-400 text-gray-700 hover:bg-gray-50 rounded-2xl"
                                onClick={deleteSubmit}
                            >
                                Удалить
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
