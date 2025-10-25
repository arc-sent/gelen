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
    const url = import.meta.env.VITE_URL;
    const navigate = useNavigate();

    const [errorBooking, setErrorBooking] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingBooking, setLoadingBooking] = useState(true);

    //HeaderSection
    const [title, setTitle] = useState("");
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
    const [priority, setPriority] = useState(false);

    //GallerySection
    const [files, setFiles] = useState<File[]>([]);
    const [image, setImage] = useState<{ id: number; path: string; bookingId: number }[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    //DescriptionSection
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");

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
        { id?: number; startDate: string; endDate: string; price: number }[]
    >([]);

    // === Загрузка данных бронирования ===
    useEffect(() => {
        const getBookingInfo = async () => {
            try {
                setLoadingBooking(true);

                const getBooking = await axios.get(`${url}/bookings/${id}`, {
                    validateStatus: () => true,
                    withCredentials: true,
                });

                if (getBooking.status === 404) {
                    setErrorBooking(true);
                    setErrorMessage(getBooking.data.message);
                    return;
                }

                const dataBooking = getBooking.data;
                console.log("dataBooking", dataBooking);

                //Header
                setTitle(dataBooking.title);
                setCategory(dataBooking.category.id);
                setSubcategory(dataBooking.subcategory.id);
                setGuests(dataBooking.guests);
                setBeds(dataBooking.beds);
                setArea(dataBooking.area);
                setPriority(dataBooking.priority);

                //Gallery
                setImage(dataBooking.image);

                //Description
                setSubTitle(dataBooking.subTitle);
                setDescription(dataBooking.description);

                //Rules
                setCheckIn(dataBooking.checkIn);
                setExit(dataBooking.exit);
                setRules({
                    childRules: dataBooking.childRules,
                    smokingRules: dataBooking.smokingRules,
                    petRules: dataBooking.petRules,
                    partyRules: dataBooking.partyRules,
                });

                //Conveniences
                setAmenitiesState({
                    wifi: dataBooking.wifi,
                    bedLinen: dataBooking.bedLinen,
                    airConditioner: dataBooking.airConditioner,
                    tv: dataBooking.tv,
                    towels: dataBooking.towels,
                    hairDryer: dataBooking.hairDryer,
                    pool: dataBooking.pool,
                });

                //Location
                setAddress(dataBooking.address);
                setCoords([dataBooking.lat, dataBooking.long]);

                //Sidebar
                setPhone(dataBooking.phone);
                setSeasonalPrices(dataBooking.seasonalPrices);
            } catch (err) {
                console.error("Ошибка при загрузке данных:", err);
                setErrorBooking(true);
                setErrorMessage("Не удалось загрузить данные бронирования.");
            } finally {
                setLoadingBooking(false);
            }
        };

        getBookingInfo();
    }, [id, url]);

    // === Геокодирование карты ===
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
                setCoords([pos[1], pos[0]]);
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

    // === Сохранение данных ===
    const handleSubmit = async () => {
        if (!title.trim()) return alert("Введите заголовок");
        if (!subTitle.trim()) return alert("Введите подзаголовок");
        if (!description.trim()) return alert("Введите описание");
        if (!category) return alert("Выберите категорию");
        if (!subcategory) return alert("Выберите подкатегорию");
        if (!guests || guests <= 0) return alert("Введите корректное количество гостей");
        if (!beds || beds <= 0) return alert("Введите количество кроватей");
        if (!area || area <= 0) return alert("Введите площадь");
        if (!address.trim() || !coords) return alert("Введите адрес и дождитесь карты");
        if (!phone.trim()) return alert("Введите номер телефона");
        if (!seasonalPrices.length) return alert("Добавьте хотя бы один период с ценой");

        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
            return alert("Введите корректный номер телефона (только цифры)");
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        if (!image.length && !files.length) return alert("Добавьте хотя бы одну фотографию");

        try {
            setLoadingBooking(true);
            const dataBooking = {
                title,
                subTitle,
                description,
                categoryId: category,
                subcategoryId: subcategory,
                guests,
                beds,
                area,
                address,
                checkIn,
                exit,
                priority,
                childRules: rules.childRules,
                smokingRules: rules.smokingRules,
                petRules: rules.petRules,
                partyRules: rules.partyRules,
                wifi: amenitiesState.wifi,
                bedLinen: amenitiesState.bedLinen,
                airConditioner: amenitiesState.airConditioner,
                tv: amenitiesState.tv,
                towels: amenitiesState.towels,
                hairDryer: amenitiesState.hairDryer,
                pool: amenitiesState.pool,
                lat: coords[0],
                long: coords[1],
                phone,
                seasonalPrices,
            };

            console.log("dataBooking", dataBooking);

            await axios.put(`${url}/bookings/${id}`, dataBooking, {
                withCredentials: true,
            });

            if (files.length !== 0) {
                const response = await axios.post(`${url}/uploads/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
                console.log("Ответ сервера:", response.data);
            }

        } catch (err) {
            console.log("Ошибка при отправке данных:", err);
            alert("Ошибка при сохранении данных. Проверь консоль.");
        } finally {
            setLoadingBooking(false);
        }
    };

    const deleteSubmit = async () => {
        try {
            await axios.delete(`${url}/bookings/${id}`);
            navigate("/booking");
            window.scrollTo(0, 0);
        } catch (err) {
            console.log("Ошибка при удалении:", err);
            alert("Ошибка при удалении данных. Проверь консоль.");
        }
    };

    // === Работа с файлами ===
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

    if (loadingBooking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700 p-6">
                <p className="text-xl animate-pulse">Загрузка данных бронирования...</p>
            </div>
        );
    }

    if (errorBooking) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                <p className="text-lg">{errorMessage || "Ошибка при загрузке данных."}</p>
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
                            navigate={navigate}
                            setLoadingBooking={setLoadingBooking}
                            id={id}
                            serverImages={image} setServerImages={setImage}
                            files={files} setFiles={setFiles}
                            isDragging={isDragging} setIsDragging={setIsDragging}
                            handleFiles={handleFiles} handleDrop={handleDrop}
                        />

                        <DescriptionSection
                            subTitle={subTitle} setSubTitle={setSubTitle}
                            description={description} setDescription={setDescription}
                        />

                        <RulesSection
                            checkIn={checkIn} setCheckIn={setCheckIn}
                            exit={exit} setExit={setExit}
                            rules={rules} setRules={setRules}
                        />

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
                                Сохранить
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
                            navigate={navigate}
                            setLoadingBooking={setLoadingBooking}
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

