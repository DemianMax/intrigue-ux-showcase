import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Languages, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageNavigationMenu = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Languages className="h-5 w-5 mr-2" />
            {t("selectLanguage")}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="flex flex-col gap-2">
              <li>
                <Button
                  variant="ghost"
                  className="flex items-center w-full justify-start"
                  onClick={() => setLanguage("pt")}
                >
                  {language === "pt" && <Check className="h-4 w-4 mr-2 text-brand-accent" />}
                  {!language || language !== "pt" && <span className="w-4 mr-2" />}
                  {t("portuguese")}
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="flex items-center w-full justify-start"
                  onClick={() => setLanguage("en")}
                >
                  {language === "en" && <Check className="h-4 w-4 mr-2 text-brand-accent" />}
                  {!language || language !== "en" && <span className="w-4 mr-2" />}
                  {t("english")}
                </Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LanguageNavigationMenu;
