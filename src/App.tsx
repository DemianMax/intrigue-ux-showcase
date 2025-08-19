import BackToTopButton from "@/components/BackToTopButton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectCasePage from "./pages/ProjectCasePage";
import Resume from "./pages/Resume";
import Playground from "./pages/Playground";
import UnderConstruction from "./pages/UnderConstruction"; // Importa a página UnderConstruction
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const isAuthorized = () => {
  return localStorage.getItem("underConstructionAuthorized") === "true";
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="lovable-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Rota para UnderConstruction enquanto não autorizado */}
              {!isAuthorized() && (
                <Route path="*" element={<UnderConstruction />} />
              )}

              {/* Rotas normais, só liberadas após autorização */}
              {isAuthorized() && (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/curriculo" element={<Resume />} />
                  <Route path="/playground" element={<Playground />} />
                  <Route path="/projeto/:projectId" element={<ProjectCasePage />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
            <BackToTopButton />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
