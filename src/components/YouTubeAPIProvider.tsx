import React, { useEffect, useState, createContext, ReactNode } from "react";

export const YouTubeContext = createContext<boolean>(false);

interface YouTubeAPIProviderProps {
  children: ReactNode;
}

const YouTubeAPIProvider: React.FC<YouTubeAPIProviderProps> = ({ children }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);

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
      document.body.appendChild(script);
    };

    loadYouTubeAPI();
  }, []);

  return (
    <YouTubeContext.Provider value={isApiLoaded}>
      {children}
    </YouTubeContext.Provider>
  );
};

export default YouTubeAPIProvider;
