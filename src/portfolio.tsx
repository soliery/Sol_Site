import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// ==========================================
// 1. YOUR DATA
// ==========================================
const CONTENT_DATA = {
  "/factorio": {
    intro: "Sound designer & composer for games and interactive media. Focused on creating high-quality audio experiences.",
    videos: [{ title: "Factorio Project", video: "https://youtube.com", description: "Example work." }]
  },
  "/king-of-meat": { intro: "Briefly describe your work here.", videos: [] },
  "/redesigns": { intro: "Briefly describe your work here.", videos: [] },
  "/advertising": { intro: "Briefly describe your work here.", videos: [] },
  "/music": { intro: "Briefly describe your work here.", videos: [] }
};

// ==========================================
// 2. COMPONENTS
// ==========================================

const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#2a1b14]/80 rounded-xl p-4 border border-white/10 hover:border-blue-400/40 transition shadow-lg">
    <h3 className="text-white mb-2 font-semibold">{title}</h3>
    <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden">
      <iframe src={video} className="w-full h-full" allowFullScreen />
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

const NAV = [
  { path: "/", label: "About" },
  { path: "/factorio", label: "Factorio" },
  { path: "/king-of-meat", label: "King of Meat" },
  { path: "/redesigns", label: "Redesigns" },
  { path: "/advertising", label: "Advertising" },
  { path: "/music", label: "Music" },
];

const Background = () => {
  const generate = (phase, amp, y) => {
    let path = "";
    for (let x = -100; x <= 2200; x += 40) {
      const yy = Math.sin((x + phase) / 120) * amp + y;
      path += `${x === -100 ? 'M' : 'L'} ${x} ${yy} `;
    }
    return path;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a1412]">
      {/* Lighter background for PC compatibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#251a15] via-[#1a1412] to-[#2d1e18]" />
      
      <svg className="absolute inset-0 w-full h-full opacity-70" preserveAspectRatio="none">
        {Array.from({ length: 42 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 45, 35 + i * 2, 80 + i * 28)}
            // Brighter blue for PC visibility
            stroke={`rgba(147,197,253,${0.3 + i * 0.01})`} 
            strokeWidth={2} // Thicker lines
            fill="none"
          />
        ))}
      </svg>
      
      {/* Softer Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#1a1412_95%)]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-32 md:h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] border-b border-white/5" />
    <div className="absolute left-4 md:left-8 -bottom-12 md:-bottom-16 flex items-end gap-4 md:gap-6">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-500 border-4 border-[#1a1412] shadow-2xl overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600" />
      </div>
      <div className="pb-2 md:pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Val Sol</h1>
        <p className="text-blue-400 text-sm md:text-lg font-medium">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex border-b border-white/10 bg-[#1a1412]/90 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="flex gap-6 md:gap-10 px-6 md:px-10 pt-16 md:pt-20 pb-4 min-w-max">
        {NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-1 py-1 text-sm md:text-base transition-colors whitespace-nowrap ${
              location.pathname === item.path ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Page = ({ path }) => {
  const data = CONTENT_DATA[path] || { intro: "", videos: [] };
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {data.intro && (
        <div className="mb-8 max-w-3xl">
          <p className="text-gray-300 text-lg leading-relaxed">
            {data.intro}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {data.videos.map((v, i) => (
          <VideoCard key={i} {...v} />
        ))}
      </div>
    </div>
  );
};

export default function Portfolio() {
  return (
    <Router>
      <div className="relative min-h-screen text-white font-sans bg-[#1a1412]">
        <Background />
        <Header />
        <NavBar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <div className="p-8 md:p-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sound designer & composer for games and interactive media. 
                  Focused on creating high-quality audio experiences.
                </p>
              </div>
            } />
            {NAV.slice(1).map((item) => (
              <Route key={item.path} path={item.path} element={<Page path={item.path} />} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
