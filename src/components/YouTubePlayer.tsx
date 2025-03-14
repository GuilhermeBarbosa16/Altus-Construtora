import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
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
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
        events: {
          onReady: () => setIsPlayerReady(true),
          onError: (e: any) => console.error("Erro no player:", e),
        },
      });
    };

    if (window.YT) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const [width, height] = aspectRatio.split("/").map(Number);
  const aspectRatioValue = (height / width) * 100;

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: `${aspectRatioValue}%` }}>
      {!isPlayerReady && <div>Carregando vídeo...</div>}
      <div id={containerId} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

export default YouTubePlayer;
