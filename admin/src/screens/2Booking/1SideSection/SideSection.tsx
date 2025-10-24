import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
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

export const SideSection = (
    {
        minPriceStr,
        maxPriceStr,
        accommodationTypes,
        setMinPrice,
        setMaxPrice,
        setMinPriceStr,
        setMaxPriceStr,
        setAccommodationTypes,
        setIsFiltered,
        setClick
    }:
        {
            minPriceStr: string,
            maxPriceStr: string,
            accommodationTypes: AccommodationType[],
            setMinPrice: React.Dispatch<React.SetStateAction<number>>,
            setMaxPrice: React.Dispatch<React.SetStateAction<number>>,
            setMinPriceStr: React.Dispatch<React.SetStateAction<string>>,
            setMaxPriceStr: React.Dispatch<React.SetStateAction<string>>,
            setAccommodationTypes: React.Dispatch<React.SetStateAction<AccommodationType[]>>,
            setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
            setClick: React.Dispatch<React.SetStateAction<boolean>>
        }) => {


    const toggleType = (index: number) => {
        setIsFiltered(true)
        setClick(true)
        setAccommodationTypes((prev) =>
            prev.map((t, i) => {
                if (i !== index) return t

                const newSelected = !t.selected;

                if (newSelected) {
                    t.subcategories = t.subcategories.map((s) => ({ ...s, selected: false }));
                }


                return { ...t, selected: !t.selected }
            })
        );
    };

    // Переключает вложенный подтип
    const toggleSubType = (typeIndex: number, subIndex: number) => {
        setIsFiltered(true)
        setClick(true)
        setAccommodationTypes((prev) =>
            prev.map((t, i) => {
                if (i !== typeIndex) return t;

                if (t.selected) {
                    t.selected = false;
                }

                return {
                    ...t,
                    subcategories: t.subcategories.map((s, j) =>
                        j === subIndex ? { ...s, selected: !s.selected } : s
                    ),
                };
            })
        );
    };

    return (
        <aside className="w-full lg:w-80 flex-shrink-0">
            <Card className="bg-white rounded-lg shadow-sm">
                <CardContent className="p-6">
                    {/* <div className="relative mb-7">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                    </div> */}

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-6">Варианты размещения</h3>
                        <div className="space-y-4">
                            {accommodationTypes.map((type, index) => (
                                <div key={type.id} className="space-y-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={type.selected}
                                            onChange={() => toggleType(index)}
                                            className="w-4 h-4 border-gray-300 rounded accent-[#66BB6A] group-hover:accent-[#59a35d] cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{type.name}</span>
                                    </label>

                                    {type.subcategories.map((sub, subIndex) => (
                                        <label key={sub.id} className="flex items-center gap-3 ml-7 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={sub.selected}
                                                onChange={() => toggleSubType(index, subIndex)}
                                                className="w-4 h-4 border-gray-300 rounded accent-[#66BB6A] group-hover:accent-[#59a35d] cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-600">{sub.name}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Цена за сутки</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    value={minPriceStr}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/^0+(?=\d)/, "");
                                        if (value === "") value = "0";
                                        setClick(true)
                                        setIsFiltered(true)
                                        setMinPriceStr(value);
                                        setMinPrice(Number(value));
                                    }}
                                    placeholder="0"
                                    className="flex-1 rounded-lg border-gray-200"
                                />
                                <span className="text-gray-400">—</span>
                                <Input
                                    type="number"
                                    value={maxPriceStr}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/^0+(?=\d)/, "");
                                        if (value === "") value = "0";
                                        setClick(true)
                                        setIsFiltered(true)
                                        setMaxPriceStr(value);
                                        setMaxPrice(Number(value));
                                    }}
                                    placeholder="20000"
                                    className="flex-1 rounded-lg border-gray-200"
                                />

                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </aside>
    );
};
