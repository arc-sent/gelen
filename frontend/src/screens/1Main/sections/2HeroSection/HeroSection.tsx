import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = (): JSX.Element => {
    return (
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center">
            <img
                src="/8882.jpg"
                alt="Геленджик"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(51,36,0,0.6) 0%, rgba(0,0,0,0.6) 100%)'
                }}
            />


            <div className="relative z-10 px-6 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-11">
                    Отдых у моря в Геленджике
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed mb-10">
                    Откройте для себя Геленджик — курортный рай у Чёрного моря. Здесь вы
                    найдёте уютные квартиры, комфортабельные номера и просторные дома для
                    аренды без посредников. Планируйте идеальный отпуск без лишних хлопот.
                </p>
                <Link
                    to="/booking"
                    onClick={() => window.scrollTo(0, 0)}
                    className="px-8 py-3 rounded-full bg-[#6fa759] hover:bg-[#5d8f4a] text-white font-semibold text-base shadow-md transition">
                    Начать поиск
                </Link>
            </div>
        </section>
    );
};
