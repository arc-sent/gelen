import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import type { NavigateFunction } from "react-router-dom";

type ServerImage = {
    id: number;
    path: string;
    bookingId: number;
};

type Props = {
    id: string | undefined;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    serverImages: ServerImage[];
    setServerImages: React.Dispatch<React.SetStateAction<ServerImage[]>>;
    handleFiles: (selected: FileList | null) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingBooking: React.Dispatch<React.SetStateAction<boolean>>;
    navigate: NavigateFunction
};

export const GallerySection = ({
    id,
    files,
    setFiles,
    serverImages,
    setServerImages,
    handleFiles,
    handleDrop,
    isDragging,
    setIsDragging,
    setLoadingBooking,
    navigate
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const url = import.meta.env.VITE_URL;

    // объединяем серверные изображения и локальные файлы
    const allImages = [...serverImages.map(img => img.path), ...files];

    const nextImage = () =>
        setCurrentIndex((prev) => (prev + 1) % allImages.length);

    const prevImage = () =>
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

    const handleFilesWithIndex = (selected: FileList | null) => {
        handleFiles(selected);
        if (selected && selected.length > 0) {
            // после добавления новых файлов переключаемся на последний
            setTimeout(() => {
                setCurrentIndex(allImages.length + selected.length - 1);
            }, 0);
        }
    };

    const removeImage = async (index: number) => {

        const isServerImage = index < serverImages.length;
        if (isServerImage) {
            const image = serverImages[index];
            try {
                setLoadingBooking(true)
                await axios.delete(`${url}/uploads/${id}/${image.path}`, {
                    withCredentials: true
                });
                setServerImages(prev => prev.filter((_, i) => i !== index));
            } catch (err: any) {
                if (err.response && err.response.status === 401) {
                    alert("Сессия истекла. Пожалуйста, войдите заново.");
                    navigate("/");
                    return;
                } else {
                    alert('Ошибка при удалении изображения с сервера');
                }


            } finally {
                setLoadingBooking(false)
            }
        } else {
            setFiles(prev => prev.filter((_, i) => i !== index - serverImages.length));
        }

        // корректируем индекс текущего изображения
        if (currentIndex >= allImages.length - 1) {
            setCurrentIndex(allImages.length - 2 >= 0 ? allImages.length - 2 : 0);
        }
    };

    return (
        <section className="w-full bg-white rounded-lg shadow-sm border mb-8 p-6">
            {/* Загрузка файлов */}
            <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 cursor-pointer ${isDragging ? "border-[#66BB6A] bg-blue-50" : "border-gray-300 hover:border-[#59a35d]"
                    }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".jpg"
                    multiple
                    hidden
                    onChange={(e) => handleFilesWithIndex(e.target.files)}
                />
                <p className="text-gray-600">
                    Перетащите сюда изображения <span className="text-[#66BB6A]">или выберите вручную</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Поддерживаются только JPG файлы</p>
            </div>

            {allImages.length > 0 && (
                <>
                    {/* Главное изображение */}
                    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[450px] lg:h-[590px] rounded-lg overflow-hidden group mt-[20px]">
                        <img
                            key={currentIndex}
                            src={currentIndex < serverImages.length
                                ? `${url}/images/${id}/${allImages[currentIndex]}`
                                : URL.createObjectURL(allImages[currentIndex] as File)}
                            alt="Главное фото"
                            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
                        />

                        <button
                            onClick={prevImage}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-1.5 sm:p-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-label="Влево"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-1.5 sm:p-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-label="Вправо"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/50 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            {currentIndex + 1}/{allImages.length}
                        </div>
                    </div>

                    {/* Миниатюры */}
                    <div className="flex sm:grid sm:grid-flow-col gap-2 mt-3 justify-start overflow-x-auto sm:overflow-hidden cursor-grab scrollbar-hide">
                        {allImages.map((img, index) => (
                            <div
                                key={index}
                                className={`relative group flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md overflow-hidden border-[2px] sm:border-[3px] ${currentIndex === index ? "border-[#66BB6A]" : "border-transparent"
                                    }`}
                            >
                                <img
                                    onClick={() => setCurrentIndex(index)}
                                    src={
                                        index < serverImages.length
                                            ? `${url}/images/${id}/${img}`
                                            : URL.createObjectURL(img as File)
                                    }
                                    alt={`Превью ${index + 1}`}
                                    className="w-full h-full object-cover select-none pointer-events-auto cursor-pointer"
                                />

                                {/* Кнопка удаления */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // чтобы не переключало картинку
                                        removeImage(index);
                                    }}
                                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                    title="Удалить изображение"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>


                </>
            )}
        </section>
    );
};
