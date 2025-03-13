import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
  }
}

interface YouTubePlayerProps {
  videoId: string;
  aspectRatio?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  aspectRatio = "16/9",
}) => {
  const playerRef = useRef<any>(null);
  const containerId = `youtube-player-${videoId}`; // Garante um ID único para cada vídeo
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar a API do YouTube uma única vez
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
      script.onerror = () => setError("Erro ao carregar a API do YouTube");

      document.body.appendChild(script);
    };

    loadYouTubeAPI();
  }, []);

  // Criar o player quando a API estiver pronta
  useEffect(() => {
    if (!isApiLoaded) return;

    const createPlayer = () => {
      try {
        playerRef.current = new window.YT.Player(containerId, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            fs: 1,
            playsinline: 1,
          },
          events: {
            onReady: () => setIsPlayerReady(true),
            onError: () => setError("Erro ao iniciar o player"),
          },
        });
      } catch (err) {
        setError("Falha ao inicializar o (player recarregar a pagina)");
      }
    };

    createPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [isApiLoaded, videoId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const [width, height] = aspectRatio.split("/").map(Number);
  const aspectRatioValue = (height / width) * 100;

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: `${aspectRatioValue}%` }}>
      {!isApiLoaded && <div>Carregando API do YouTube...</div>}
      {!isPlayerReady && <div>Carregando vídeo...</div>}

      {/* ID ÚNICO PARA CADA VÍDEO */}
      <div id={containerId} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

export default YouTubePlayer;
