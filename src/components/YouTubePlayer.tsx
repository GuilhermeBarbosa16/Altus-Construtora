import React, { useEffect, useRef, useState } from 'react';

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
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  aspectRatio?: string; // Adicionando a propriedade aspectRatio
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, aspectRatio = '16/9' }) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.YT) {
          setIsApiLoaded(true);
          resolve();
        } else {
          window.onYouTubeIframeAPIReady = () => {
            setIsApiLoaded(true);
            resolve();
          };

          if (!document.querySelector("#youtube-api-script")) {
            const script = document.createElement('script');
            script.id = "youtube-api-script";
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            script.onerror = () => reject('Erro ao carregar a API do YouTube');
            document.body.appendChild(script);
          }
        }
      });
    };

    const initializePlayer = () => {
      if (!window.YT || !containerRef.current) {
        setError("A API do YouTube não foi carregada corretamente.");
        return;
      }

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            fs: 1,
            playsinline: 1,
          },
          events: {
            onReady: () => setIsPlayerReady(true),
            onError: () => setError('Erro ao iniciar o player'),
          },
        });
      } catch (err) {
        setError('Falha ao inicializar o player');
      }
    };

    loadYouTubeAPI()
      .then(() => initializePlayer())
      .catch((err) => setError(String(err)));

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Calcular a proporção
  const [width, height] = aspectRatio.split('/').map(Number);
  const aspectRatioValue = height / width;

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: `${aspectRatioValue * 100}%` }}>
      {!isApiLoaded && <div>Carregando API do YouTube...</div>}
      {!isPlayerReady && <div>Carregando vídeo...</div>}
  
      {/* Container que mantém o aspecto definido */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
        {/* Estilização extra para forçar o preenchimento */}
        <style>
          {`
            iframe {
              width: 100% !important;
              height: 100% !important;
              position: absolute;
              top: 0;
              left: 0;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default YouTubePlayer;