import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const GallerySection = ({ id, images }: { id: number, images: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const url = import.meta.env.VITE_URL

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <section className="w-full bg-white rounded-lg shadow-sm border mb-8">
            <div className="relative w-full h-[240px] sm:h-[320px] md:h-[450px] lg:h-[590px] rounded-lg overflow-hidden group">
                <img
                    key={currentIndex}
                    src={`${url}/images/${id}/${images[currentIndex]}`}
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
                    {currentIndex + 1}/{images.length}
                </div>
            </div>


            <div
                className="flex sm:grid sm:grid-flow-col gap-2 mt-3 justify-start overflow-x-auto sm:overflow-hidden cursor-grab scrollbar-hide"
                onMouseDown={(e) => {
                    const slider = e.currentTarget;
                    let startX = e.pageX - slider.offsetLeft;
                    let scrollLeft = slider.scrollLeft;

                    const onMouseMove = (eMove: MouseEvent) => {
                        const x = eMove.pageX - slider.offsetLeft;
                        const walk = x - startX;
                        slider.scrollLeft = scrollLeft - walk;
                    };

                    const onMouseUp = () => {
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                    };

                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                }}
            >
                {images.map((img: string, index: number) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md overflow-hidden border-[2px] sm:border-[3px] ${currentIndex === index ? "border-[#66BB6A]" : "border-transparent"
                            }`}
                    >
                        <img
                            src={`${url}/images/${id}/${img}`}
                            alt={`Превью ${index + 1}`}
                            className="w-full h-full object-cover select-none pointer-events-none"
                        />
                    </button>
                ))}
            </div>
        </section>

    )
}