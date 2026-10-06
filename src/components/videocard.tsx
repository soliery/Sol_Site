import { useEffect, useRef } from "react";

const loadYT = () =>
  new Promise((res) => {
    if (window.YT?.Player) return res();
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script");
      s.id = "yt-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
    const t = setInterval(() => window.YT?.Player && (clearInterval(t), res()), 100);
  });

const VideoCard = ({ title, video, description, isActive, onPlay, playerRef }) => {
  const iframeRef = useRef(null);
  const id = video.split("embed/")[1];
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;
    (async () => {
      await loadYT();
      if (cancelled || !iframeRef.current) return;
      if (!playerRef.current[id]) {
        new YT.Player(iframeRef.current, {
          width: "100%", height: "100%", videoId: id,
          events: {
            onReady: (e) => {
              playerRef.current[id] = e.target;
              e.target.playVideo();
            }
          }
        });
      } else {
        playerRef.current[id].playVideo();
      }
    })();
    return () => { cancelled = true; };
  }, [isActive]);

  return (
    <div className="bg-[#2a1c10]/70 rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition shadow-lg">
      <h3 className="text-white mb-3 text-xl font-medium">{title}</h3>
      <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden relative">
        <div ref={iframeRef} className="w-full h-full" />
        {!isActive && (
          <button onClick={onPlay} className="absolute inset-0 w-full h-full cursor-pointer">
            <img src={thumb} alt={title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
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
