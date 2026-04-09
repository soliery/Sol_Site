import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import VideoCard from "./components/VideoCard";

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
    description: "Description here",
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
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c120d] via-[#2b1a13] to-[#3a261d]" />

      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 40 }).map((_, i) => (
          <path
            key={i}
            d={generate(i * 40, 40 + i * 2, 100 + i * 25)}
            stroke={`rgba(59,130,246,${0.15 + i * 0.01})`}
            strokeWidth={1}
            fill="none"
          />
        ))}
      </svg>

      {/* fade under menu */}
      <div className="absolute top-[140px] left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#1c120d]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#2b1a13] to-[#3a261d]" />
    <div className="absolute left-6 -bottom-10 flex items-end gap-4">
      <div className="w-20 h-20 rounded-xl bg-gray-500 border-2 border-white/20" />
      <div>
        <h1 className="text-2xl">Your Name</h1>
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
          className={`relative px-2 py-1 ${
            location.pathname === item.path ? "text-blue-400" : "text-gray-300"
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
  <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {getVideos(name).map((v, i) => (
      <VideoCard key={i} {...v} />
    ))}
  </div>
);

export default function Portfolio() {
  return (
    <Router>
      <div className="relative min-h-screen text-white">
        <Background />
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<div className="p-6">About Me</div>} />
          <Route path="/factorio" element={<Page name="Factorio" />} />
          <Route path="/king-of-meat" element={<Page name="King of Meat" />} />
          <Route path="/redesigns" element={<Page name="Redesigns" />} />
          <Route path="/advertising" element={<Page name="Advertising" />} />
          <Route path="/music" element={<Page name="Music" />} />
        </Routes>
      </div>
    </Router>
  );
}
