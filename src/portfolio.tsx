import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Component name must be Capitalized for React to render it
const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#2a1b14]/70 rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition shadow-lg">
    <h3 className="text-white mb-2 font-semibold">{title}</h3>
    <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden">
      <iframe 
        src={video} 
        className="w-full h-full" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen 
      />
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

const getVideos = (name) =>
  Array(4).fill(0).map((_, i) => ({
    title: `${name} ${i + 1}`,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Sound design example work"
  }));

const Background = () => {
  // Line logic from your preferred version (spread across height)
  const generate = (phase, amp, y) => {
    let path = "";
    for (let x = -100; x <= 2200; x += 40) {
      const yy = Math.sin((x + phase) / 120) * amp + y;
      path += `${x === -100 ? 'M' : 'L'} ${x} ${yy} `;
    }
    return path;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0705]">
      {/* Dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a08] via-[#1a110d] to-[#241712]" />

      <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
        {Array.from({ length: 45 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 45, 35 + i * 2, 80 + i * 28)}
            stroke={`rgba(59,130,246,${0.15 + i * 0.01})`}
            strokeWidth={1}
            fill="none"
          />
        ))}
      </svg>

      {/* Dark Vignette around the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0705_90%)]" />
      
      {/* Fade under menu area */}
      <div className="absolute top-[140px] left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0a0705]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] shadow-md" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gray-500 border-2 border-white/20 shadow-xl" />
      <div className="pb-1">
        <h1 className="text-2xl font-bold">Your Name</h1>
        <p className="text-gray-300 text-sm">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex gap-6 px-6 pt-16 pb-4 border-b border-white/10 bg-[#0a0705]/80">
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-2 py-1 transition-colors ${
            location.pathname === item.path ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
          }`}
        >
          {/* Active glow removed as requested */}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const Page = ({ name }) => (
  <div className="p-8 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      {getVideos(name).map((v, i) => (
        <VideoCard key={i} {...v} />
      ))}
    </div>
  </div>
);

export default function Portfolio() {
  return (
    <Router>
      <div className="relative min-h-screen text-white font-sans">
        <Background />
        <Header />
        <NavBar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <div className="p-10 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sound designer & composer for games and interactive media. 
                  Focused on creating high-quality audio experiences.
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





