import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
// Use a Capital letter for the component name during import
import VideoCard from "./components/videocard"; 

const NAV = [
  { path: "/", label: "About" },
  { path: "/factorio", label: "Factorio" },
  { path: "/king-of-meat", label: "King of Meat" },
  { path: "/redesigns", label: "Redesigns" },
  { path: "/advertising", label: "Advertising" },
  { path: "/music", label: "Music" },
];

// Ensure URLs use the /embed/ format for YouTube
const getVideos = (name) =>
  Array(4).fill(0).map((_, i) => ({
    title: `${name} ${i + 1}`,
    video: "https://youtube.com", 
    description: "Sound design example work",
  }));

const Background = () => {
  const generate = (phase, amp, y) => {
    let path = "";
    for (let x = -100; x <= 2000; x += 40) {
      const yy = Math.sin((x + phase) / 120) * amp + y;
      path += `${x},${yy} `;
    }
    return "M" + path;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0705]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a08] via-[#1a110d] to-[#241712]" />
      <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
        {Array.from({ length: 45 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 40, 40 + i * 2, 80 + i * 25)}
            stroke={`rgba(59,130,246,${0.15 + i * 0.01})`}
            strokeWidth={1}
            fill="none"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0705_90%)]" />
      <div className="absolute top-[140px] left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0a0705]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13]" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gray-500 border-2 border-white/20" />
      <div>
        <h1 className="text-2xl font-bold">Your Name</h1>
        <p className="text-gray-300 text-sm">Sound Designer / Composer</p>
      </div>
    </div>
  </div>
);

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="relative z-10 flex gap-6 px-6 pt-16 pb-4 border-b border-white/10 bg-[#1c120d]/90">
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-2 py-1 transition ${
            location.pathname === item.path ? "text-blue-400" : "text-gray-300 hover:text-white"
          }`}
        >
          {location.pathname === item.path && (
            <span className="absolute inset-0 rounded-md bg-blue-500/10 blur-md"></span>
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const Page = ({ name }) => (
  <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-6">
    {getVideos(name).map((v, i) => (
      <VideoCard key={i} {...v} /> 
    ))}
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
                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sound designer & composer for games and interactive media.
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




