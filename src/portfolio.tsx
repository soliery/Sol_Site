import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// ==========================================
// 1. YOUR DATA (ССЫЛКИ ЗАМЕНИЛ НА РАБОЧИЕ ДЛЯ ТЕСТА)
// ==========================================
const CONTENT_DATA = {
  "/factorio": {
    intro: "Sound designer & composer for games and interactive media. Focused on creating high-quality audio experiences.",
    videos: [
      { title: "Factorio Sound Design 1", video: "https://youtube.com", description: "Example description." },
    ]
  },
  "/king-of-meat": {
    intro: "Briefly describe your work on King of Meat here.",
    videos: [
      { title: "Trailer Sound", video: "https://youtube.com", description: "Work on trailer effects." }
    ]
  },
  "/redesigns": {
    intro: "Briefly describe your redesign projects here.",
    videos: [
      { title: "Doom Redesign", video: "https://youtube.com", description: "Full audio replacement." }
    ]
  },
  "/advertising": {
    intro: "Briefly describe your commercial work here.",
    videos: [
      { title: "Commercial Spot", video: "https://youtube.com", description: "Ad spot sound design." }
    ]
  },
  "/music": {
    intro: "Briefly describe your music compositions here.",
    videos: [
      { title: "Epic Track", video: "https://youtube.com", description: "Orchestral composition." }
    ]
  }
};

// ==========================================
// 2. COMPONENTS AND LOGIC
// ==========================================

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
    // ФОН СТАЛ СВЕТЛЕЕ: bg-[#140e0b]
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#140e0b]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c120d] via-[#241a15] to-[#2d1e18]" />
      
      {/* ЛИНИИ ТЕПЕРЬ ЯРЧЕ (opacity-100) */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        {Array.from({ length: 45 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 45, 35 + i * 2, 80 + i * 28)}
            // ЦВЕТ ЛИНИЙ СТАЛ СВЕТЛЕЕ И БАЗА 0.3 (rgba(96,165,250))
            stroke={`rgba(96,165,250,${0.3 + i * 0.01})`}
            strokeWidth={2} // ТОЛЩИНА 2
            fill="none"
          />
        ))}
      </svg>
      
      {/* ВИНЬЕТКА СМЯГЧЕНА (95%) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#140e0b_95%)]" />
      <div className="absolute top-[140px] left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#140e0b]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] border-b border-white/5" />
    <div className="absolute left-8 -bottom-16 flex items-end gap-6">
      <div className="w-32 h-32 rounded-2xl bg-gray-500 border-4 border-[#140e0b] shadow-2xl overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600" />
      </div>
      <div className="pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Val Sol</h1>
        <p className="text-blue-400 text-lg font-medium drop-shadow-md">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    // МОБИЛЬНАЯ ОПТИМИЗАЦИЯ: добавил overflow-x-auto и min-w-max
    <div className="relative z-10 flex border-b border-white/10 bg-[#0a0705]/80 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="flex gap-6 px-6 pt-20 pb-4 min-w-max">
        {NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-2 py-1 transition-colors whitespace-nowrap ${
              location.pathname === item.path ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="relative z-10">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Page = ({ path }) => {
  const data = CONTENT_DATA[path] || { intro: "", videos: [] };
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {data.intro && (
        <div className="mb-10 max-w-3xl">
          <p className="text-gray-300 text-lg leading-relaxed">
            {data.intro}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <div className="relative min-h-screen text-white font-sans bg-[#140e0b]">
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
            {NAV.slice(1).map((item) => (
              <Route 
                key={item.path} 
                path={item.path} 
                element={<Page path={item.path} />} 
              />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

