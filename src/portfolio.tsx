import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

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
    video: "https://youtube.com", 
    description: "Sound design case study",
  }));

const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#2a1b14]/60 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-2xl">
    <h3 className="text-white mb-2 font-semibold">{title}</h3>
    <div className="aspect-video mb-3 overflow-hidden rounded-lg bg-black shadow-inner">
      <iframe 
        src={video} 
        className="w-full h-full border-0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen 
      />
    </div>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
);

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
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0705]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a08] via-[#1a110d] to-[#241712]" />

      <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
        {Array.from({ length: 42 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 45, 35 + i * 2, 80 + i * 28)}
            stroke={`rgba(59,130,246,${0.2 + i * 0.01})`}
            strokeWidth={1.2}
            fill="none"
          />
        ))}
      </svg>

      {/* Dark Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0705_90%)]" />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0a0705] to-transparent opacity-80" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] border-b border-white/5" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-white/20 shadow-2xl" />
      <div className="pb-1">
        <h1 className="text-2xl font-bold tracking-tight">Your Name</h1>
        <p className="text-blue-400 text-sm font-medium">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex gap-6 px-6 pt-16 pb-4 border-b border-white/10 bg-[#0a0705]/40 backdrop-blur-lg">
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-2 py-1 transition-all duration-300 ${
            location.pathname === item.path ? "text-blue-400" : "text-gray-400 hover:text-white"
          }`}
        >
          {location.pathname === item.path && (
            <span className="absolute inset-0 rounded-md bg-blue-500/10 blur-md"></span>
          )}
          <span className="relative z-10 font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const Page = ({ name }) => (
  <div className="p-8 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
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
                  Passionate about the intersection of technology and emotion.
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

