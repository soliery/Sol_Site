import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const NAV = ["/", "/factorio", "/king-of-meat", "/redesigns", "/advertising", "/music"];

const labels = {
  "/": "About",
  "/factorio": "Factorio",
  "/king-of-meat": "King of Meat",
  "/redesigns": "Redesigns",
  "/advertising": "Advertising",
  "/music": "Music"
};

const getVideos = (name) =>
  Array(4).fill(0).map((_, i) => ({
    title: `${name} ${i + 1}`,
    video: "https://youtube.com",
    description: "Example work"
  }));

const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#2a1b14]/70 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition-all duration-300 group">
    <h3 className="text-white mb-2 font-semibold group-hover:text-blue-300 transition-colors">{title}</h3>
    <div className="aspect-video mb-2 overflow-hidden rounded-lg">
      <iframe src={video} className="w-full h-full" allowFullScreen />
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

const Background = () => {
  const generateCurve = (i, type) => {
    const amplitude = type === 'blue' ? 120 + i * 15 : 80 + i * 20;
    const frequency = 0.0015;
    const phase = i * 250;
    const yBase = 150 + i * 60;
    
    let d = `M -100 ${yBase}`;
    for (let x = 0; x <= 2200; x += 400) {
      const cp1x = x + 200;
      const cp1y = yBase + Math.sin((x + phase) * frequency) * amplitude;
      const cp2x = x + 400;
      const cp2y = yBase + Math.sin((x + 400 + phase) * frequency) * amplitude;
      d += ` C ${cp1x} ${cp1y}, ${cp1x} ${cp2y}, ${cp2x} ${cp2y}`;
    }
    return d;
  };

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#0f0a08]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1c120d] via-[#140e0b] to-[#1a1425] opacity-90" />

      {/* Brown paths */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1920 1080">
        {Array.from({ length: 6 }).map((_, i) => (
          <path
            key={`brown-${i}`}
            d={generateCurve(i, 'brown')}
            stroke={`rgba(139, 94, 60, ${0.1 + i * 0.03})`}
            strokeWidth={1 + i}
            fill="none"
          />
        ))}
      </svg>

      {/* Blue glowing paths */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`blue-${i}`}
            d={generateCurve(i, 'blue')}
            stroke="url(#blueGrad)"
            strokeWidth={1.5 + i * 0.3}
            fill="none"
            className="animate-pulse"
            style={{ 
              animationDuration: `${5 + i}s`,
              filter: `blur(${1 + i * 0.5}px)`
            }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0a08_85%)]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#2b1a13] to-[#3a261d] border-b border-white/5" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gray-600 border-2 border-white/20 shadow-xl" />
      <div className="pb-1">
        <h1 className="text-2xl font-bold tracking-tight">Your Name</h1>
        <p className="text-blue-400/80 text-sm font-medium">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex gap-6 px-6 pt-16 pb-4 border-b border-white/10 bg-[#0f0a08]/60 backdrop-blur-md">
      {NAV.map((path) => (
        <Link
          key={path}
          to={path}
          className={`relative px-2 py-1 transition-colors duration-300 ${location.pathname === path ? "text-blue-400" : "text-gray-400 hover:text-white"}`}
        >
          {location.pathname === path && (
            <span className="absolute inset-0 rounded-md bg-blue-500/15 blur-lg"></span>
          )}
          <span className="relative z-10">{labels[path]}</span>
        </Link>
      ))}
    </div>
  );
};

const Page = ({ name }) => (
  <div className="p-6">
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {getVideos(name).map((item, i) => (
        <VideoCard key={i} {...item} />
      ))}
    </div>
  </div>
);

export default function Portfolio() {
  return (
    <Router>
      <div className="relative min-h-screen text-white font-sans selection:bg-blue-500/30">
        <Background />
        <Header />
        <NavBar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <div className="p-10 max-w-3xl mx-auto text-center md:text-left">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">About Me</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Sound designer & composer specializing in immersive audio environments for games, cinema, and interactive media. 
                  Focused on creating unique sonic identities and emotional impact.
                </p>
              </div>
            } />
            <Route path="/factorio" element={<Page name="Factorio" />} />
            <Route path="/king-of-meat" element={<Page name="King of Meat" />} />
            <Route path="/redesigns" element={<Page name="Redesigns" />} />
            <Route path="/advertising" element={<Page name="Advertising" />} />
            <Route path="/music" element={<Page name="Music" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
