import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5 text-brand-dark" />
          <span className="sr-only">{t("selectLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt")}>
          {language === "pt" ? (
            <Check className="h-4 w-4 text-brand-accent mr-2" />
          ) : (
            <span className="w-4 mr-2" />
          )}
          {t("portuguese")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          {language === "en" ? (
            <Check className="h-4 w-4 text-brand-accent mr-2" />
          ) : (
            <span className="w-4 mr-2" />
          )}
          {t("english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
