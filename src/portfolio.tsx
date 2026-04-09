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
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Твое видео
    description: "Sound design case study"
  }));

// Компонент карточки видео (теперь видео точно будет играть)
const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#2a1b14]/80 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-blue-400/40 transition-all group">
    <h3 className="text-white mb-2 font-semibold group-hover:text-blue-300 transition-colors">{title}</h3>
    <div className="aspect-video mb-3 overflow-hidden rounded-lg bg-black">
      <iframe 
        src={video} 
        className="w-full h-full" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
      />
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

const Background = () => {
  // Генерация плавных волн, заполняющих все пространство
  const generate = (phase, amp, y) => {
    let d = `M -100 ${y}`;
    for (let x = 0; x <= 2200; x += 100) {
      const cy = Math.sin((x + phase) / 150) * amp + y;
      d += ` L ${x} ${cy}`;
    }
    return d;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Базовый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a08] via-[#1c120d] to-[#2b1a13]" />

      <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 45 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 50, 30 + i, 50 + i * 28)}
            stroke={i % 2 === 0 ? "url(#lineGrad)" : `rgba(139,94,60,${0.1 + i * 0.005})`}
            strokeWidth={1}
            fill="none"
            className={i % 3 === 0 ? "animate-pulse" : ""}
            style={{ animationDuration: `${3 + i % 5}s` }}
          />
        ))}
      </svg>

      {/* Затемнение под меню для читаемости */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0f0a08] to-transparent opacity-80" />
      {/* Виньетка для глубины */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0a08_90%)]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#2b1a13] to-[#3a261d] border-b border-white/5" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-white/20 shadow-2xl" />
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
    <div className="relative z-10 flex gap-6 px-6 pt-16 pb-4 border-b border-white/10 bg-[#0f0a08]/40 backdrop-blur-md">
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-2 py-1 transition-colors ${
            location.pathname === item.path ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
          }`}
        >
          {location.pathname === item.path && (
            <span className="absolute inset-0 rounded-md bg-blue-500/10 blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"></span>
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const Page = ({ name }) => (
  <div className="p-6 max-w-7xl mx-auto">
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
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Passionate Sound Designer with an eye for detail and a heart for immersive experiences. 
                  Specializing in creating sonic landscapes that bring digital worlds to life.
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
