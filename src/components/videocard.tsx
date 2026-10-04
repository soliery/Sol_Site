import { useEffect, useRef } from "react";

const VideoCard = ({ title, video, description, isActive, onPlay, playerRef }) => {
  const iframeRef = useRef(null);
  const playerCreated = useRef(false);
  const videoId = video.split("embed/")[1];
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Создаём player один раз при монтировании
  useEffect(() => {
    if (!playerCreated.current && iframeRef.current && window.YT) {
      playerCreated.current = true;
      const player = new YT.Player(iframeRef.current, {
        events: {
          onReady: (e) => {
            playerRef.current[videoId] = e.target;
          }
        }
      });
    }
  }, []);

  // Управляем воспроизведением
  useEffect(() => {
    const player = playerRef.current[videoId];
    if (!player) return;
    if (isActive) {
      player.playVideo();
    } else {
      player.stopVideo();
    }
  }, [isActive]);

  return (
    <div className="bg-[#2a1b14]/70 rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition shadow-lg">
      <h3 className="text-white mb-3 text-3xl font-medium">{title}</h3>
      <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden relative">
        <iframe
          ref={iframeRef}
          src={`${video}?enablejsapi=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
        />
        {!isActive && (
          <button onClick={onPlay} className="absolute inset-0 w-full h-full cursor-pointer">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
      <p className="text-gray-300 text-sm whitespace-pre-line">{description}</p>
    </div>
  );
};

export default VideoCard;   
