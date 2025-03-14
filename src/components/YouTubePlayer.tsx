import React, { useContext, useEffect, useRef } from "react";
import { YouTubeContext } from "../components/YoutubeAPIProvider";

interface YouTubePlayerProps {
  videoId: string;
  aspectRatio: string;
}
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


const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const isApiLoaded = useContext(YouTubeContext);
  const playerRef = useRef<any>(null);
  const containerId = `youtube-player-${videoId}`;

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
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [isApiLoaded]);

  return <div id={containerId} style={{ width: "100%", height: "400px" }} />;
};

export default YouTubePlayer;
