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

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<any>(null);
  const containerId = `youtube-player-${videoId}`;
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

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (isApiLoaded && window.YT) {
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
        },
      });
    }
  }, [isApiLoaded]);

  return <div id={containerId} style={{ width: "100%", height: "400px" }} />;
};

export default YouTubePlayer;
