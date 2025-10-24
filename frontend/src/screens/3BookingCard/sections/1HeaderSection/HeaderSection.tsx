import { Button } from "../../../../components/ui/button";
import { ShareIcon } from "lucide-react";
import { useState } from "react";

export const HeaderSection = ({ id, title, address }: { id: number, title: string, address: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const url = `${import.meta.env.VITE_FRONTEND}/card/${id}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Не удалось скопировать ссылку:", err);
        }
    };

    return (
        <header className="mb-8">
            <div className="mb-4">
                <h1 className="[font-family:'Inter',Helvetica] font-bold text-black text-[22px] leading-normal tracking-[0] mb-1">
                    {title}
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#7f7f7f]">
                        {address}
                    </span>

                    <button className="[font-family:'Inter',Helvetica] font-normal text-[#2d6cb4] text-xs hover:underline">
                        <a href="#locationCard">
                            Показать на карте
                        </a>
                    </button>
                </div>

                <div className="flex justify-start sm:justify-end">
                    <Button
                        variant="ghost"
                        className="h-auto flex items-center gap-2.5 p-0"
                    >
                        <ShareIcon className="w-4 h-4" />
                        <button onClick={handleCopy} className="[font-family:'Inter',Helvetica] font-normal text-black text-sm">
                            {copied ? "Скопировано!" : "Скопировать ссылку"}
                        </button>
                    </Button>
                </div>
            </div>
        </header>
    )
}