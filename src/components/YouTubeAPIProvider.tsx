import React, { createContext, useContext, useEffect, useState } from "react";

interface YouTubeAPIContextType {
  isApiLoaded: boolean;
}

const YouTubeAPIContext = createContext<YouTubeAPIContextType | undefined>(undefined);

export const YouTubeAPIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        setIsApiLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = () => setIsApiLoaded(true);
      script.onerror = () => console.error("Erro ao carregar a API do YouTube");

      document.body.appendChild(script);
    };

    loadYouTubeAPI();
  }, []);

  return (
    <YouTubeAPIContext.Provider value={{ isApiLoaded }}>
      {children}
    </YouTubeAPIContext.Provider>
  );
};

export const useYouTubeAPI = (): YouTubeAPIContextType => {
  const context = useContext(YouTubeAPIContext);
  if (!context) {
    throw new Error("useYouTubeAPI deve ser usado dentro de YouTubeAPIProvider");
  }
  return context;
};
