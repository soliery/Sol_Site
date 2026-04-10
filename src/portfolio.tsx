import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const CONTENT_DATA = {
  "/factorio": { intro: "Sound designer & composer. Focused on high-quality audio.", videos: [{ title: "Project 1", video: "https://youtube.com", description: "Work description" }] },
  "/king-of-meat": { intro: "Briefly describe your work.", videos: [] },
  "/redesigns": { intro: "Briefly describe your work.", videos: [] },
  "/advertising": { intro: "Briefly describe your work.", videos: [] },
  "/music": { intro: "Briefly describe your work.", videos: [] }
};

const VideoCard = ({ title, video, description }) => (
  <div className="bg-[#3d2b22]/90 rounded-xl p-4 border border-white/20 hover:border-blue-300 transition shadow-xl">
    <h3 className="text-white mb-2 font-bold text-sm md:text-base">{title}</h3>
    <div className="aspect-video mb-2 bg-black rounded-lg overflow-hidden">
      <iframe src={video} className="w-full h-full" allowFullScreen />
    </div>
    <p className="text-gray-100 text-xs md:text-sm leading-relaxed font-medium">{description}</p>
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
    for (let x = -100; x <= 2200; x += 60) {
      const yy = Math.sin((x + phase) / 120) * amp + y;
      path += `${x === -100 ? 'M' : 'L'} ${x} ${yy} `;
    }
    return path;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#2a1f1b]">
      {/* Значительно более светлый фон (коричнево-серый) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b22] via-[#2a1f1b] to-[#4a352a]" />
      
      <svg className="absolute inset-0 w-full h-full opacity-100" preserveAspectRatio="none">
        {Array.from({ length: 30 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 50, 40 + i * 2, 50 + i * 40)}
            // ЛИНИИ ТЕПЕРЬ ОЧЕНЬ ЯРКИЕ (Светло-голубые)
            stroke={`rgba(191,219,254,${0.4 + i * 0.02})`}
            strokeWidth={2.5}
            fill="none"
          />
        ))}
      </svg>
      
      {/* Виньетка стала мягче, чтобы не чернить края */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#2a1f1b_100%)] opacity-70" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-32 md:h-40 bg-gradient-to-r from-[#3d2b22] to-[#4a352a] border-b border-white/10" />
    <div className="absolute left-4 md:left-8 -bottom-12 md:-bottom-16 flex items-end gap-4 md:gap-6">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-500 border-4 border-[#2a1f1b] shadow-2xl overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
      </div>
      <div className="pb-2 md:pb-4">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-xl">Val Sol</h1>
        <p className="text-blue-300 text-base md:text-xl font-bold drop-shadow-lg">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex border-b border-white/20 bg-[#2a1f1b]/95 backdrop-blur-xl overflow-x-auto no-scrollbar">
      <div className="flex gap-6 md:gap-10 px-6 md:px-10 pt-16 md:pt-20 pb-4 min-w-max">
        {NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-1 py-1 text-sm md:text-base transition-colors whitespace-nowrap uppercase tracking-widest ${
              location.pathname === item.path ? "text-blue-300 font-black border-b-2 border-blue-300" : "text-gray-300 hover:text-white"
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
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      {data.intro && (
        <div className="mb-10 max-w-4xl">
          <p className="text-white text-lg md:text-xl leading-relaxed font-medium drop-shadow-sm">
            {data.intro}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
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
      <div className="relative min-h-screen text-white font-sans bg-[#2a1f1b]">
        <Background />
        <Header />
        <NavBar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <div className="p-8 md:p-16 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter text-blue-200">About Me</h2>
                <p className="text-white text-lg md:text-2xl leading-relaxed font-medium">
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


