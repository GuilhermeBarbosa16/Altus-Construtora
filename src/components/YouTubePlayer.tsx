import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
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
  const containerId = `youtube-player-${videoId}`;
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);

  // Carrega a API do YouTube apenas uma vez
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        setIsApiLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;

      script.onload = () => {
        if (window.YT) {
          setIsApiLoaded(true);
        }
      };

      document.body.appendChild(script);
    };

    loadYouTubeAPI();

    // Remove a função global quando o componente for desmontado
    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  // Cria o player quando a API estiver carregada
  useEffect(() => {
    if (isApiLoaded && window.YT) {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

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
      });
    }
  }, [isApiLoaded, videoId]);

  const [width, height] = aspectRatio.split("/").map(Number);
  const aspectRatioValue = (height / width) * 100;

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: `${aspectRatioValue}%` }}>
      <div id={containerId} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

export default YouTubePlayer;
