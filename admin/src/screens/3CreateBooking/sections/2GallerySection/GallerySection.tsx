import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const GallerySection = ({
    files,
    handleFiles,
    handleDrop,
    isDragging,
    setIsDragging,
    setFiles,
}: {
    files: File[];
    handleFiles: (selected: FileList | null) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % files.length);
    const prevImage = () =>
        setCurrentIndex((prev) => (prev - 1 + files.length) % files.length);

    return (
        <div className="mb-6">
            <section className="w-full bg-white rounded-lg shadow-sm border mb-8 p-6">
                {/* Загрузка файлов */}
                <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 cursor-pointer ${isDragging ? "border-[#66BB6A] bg-blue-50" : "border-gray-300 hover:border-[#59a35d]"
                        }`}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".jpg"
                        multiple
                        hidden
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <p className="text-gray-600">
                        Перетащите сюда изображения{" "}
                        <span className="text-[#66BB6A]">или выберите вручную</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Поддерживаются только JPG файлы</p>
                </div>

                {files.length > 0 && (
                    <>
                        {/* Главное изображение */}
                        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[450px] lg:h-[590px] rounded-lg overflow-hidden group mt-[20px]">
                            <img
                                key={currentIndex}
                                src={URL.createObjectURL(files[currentIndex])}
                                alt="Главное фото"
                                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
                            />

                            <button
                                onClick={prevImage}
                                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-1.5 sm:p-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                aria-label="Предыдущее изображение"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-1.5 sm:p-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                aria-label="Следующее изображение"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/50 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                {currentIndex + 1}/{files.length}
                            </div>
                        </div>

                        {/* Миниатюры */}
                        <div className="flex sm:grid sm:grid-flow-col gap-2 mt-3 justify-start overflow-x-auto sm:overflow-hidden cursor-grab scrollbar-hide">
                            {files.map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md overflow-hidden border-[2px] sm:border-[3px] ${currentIndex === index ? "border-[#66BB6A]" : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover select-none pointer-events-none"
                                    />
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};
