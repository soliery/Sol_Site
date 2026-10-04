interface VideoCardProps {
  title: string;
  video: string;
  description: string;
  isActive: boolean;
  onPlay: () => void;
}

const VideoCard = ({
  title,
  video,
  description,
  isActive,
  onPlay,
}: VideoCardProps) => {
  // Extract YouTube video ID from an embed URL
  const videoId = video.match(/embed\/([^?&]+)/)?.[1];

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  return (
    <article className="bg-[#2a1b14]/70 rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition shadow-lg">
      <h3 className="text-white mb-3 text-3xl font-medium">
        {title}
      </h3>

      <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden relative">
        {isActive ? (
          <iframe
            key={video}
            src={`${video}?autoplay=1`}
            className="w-full h-full"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            className="absolute inset-0 w-full h-full cursor-pointer group"
            aria-label={`Play ${title}`}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-black/80 group-hover:scale-105 transition">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      <p className="text-gray-300 text-sm whitespace-pre-line">
        {description}
      </p>
    </article>
  );
};

export default VideoCard;
