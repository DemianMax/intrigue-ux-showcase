
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  // Função genérica para pegar keys aninhadas:
  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let translation: any = translations[language];

      for (const k of keys) {
        if (translation && translation[k] !== undefined) {
          translation = translation[k];
        } else {
          console.warn(`Translation key "${key}" not found for language "${language}"`);
          return key;  // fallback: retorna a própria chave se não encontrar
        }
      }

      return typeof translation === 'string' ? translation : key;
    } catch (error) {
      console.error(`Error getting translation for key "${key}":`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    // Return a safe fallback instead of throwing an error
    return {
      language: 'pt' as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
};
