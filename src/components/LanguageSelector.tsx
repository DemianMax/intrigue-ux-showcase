import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

type LanguageCode = "pt" | "en";

const languages: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇺🇸" },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full px-4 py-2 shadow-sm bg-white text-sm font-medium transition hover:bg-gray-50"
        >
          <span className="text-xl">{languages[language].flag}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-xl border bg-white shadow-xl w-44 p-1"
      >
        {Object.entries(languages).map(([key, { label, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setLanguage(key as LanguageCode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              language === key
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{flag}</span>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
