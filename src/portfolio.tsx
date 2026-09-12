import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// ==========================================
// 1. YOUR DATA (EDIT TEXT & LINKS HERE)
// ==========================================
const CONTENT_DATA = {
  "/king-of-meat": {
    intro: "My work for King of Meat project. Audio and tech described in short videos ",
    videos: [
      { 
        title: "Music system for multiplayer with UGC", 
        video: "https://www.youtube.com/embed/ZQqCkzDb6kI", 
        description: `The unique challenge lay in the game’s format: it’s a networked multiplayer title with robust User-Generated Content (UGC) capabilities. The system couldn’t rely on pre-scripted triggers. Instead, it had to analyze player actions in real-time and adapt to any user-created level, no matter how chaotic or unconventional.

The video below offers a brief overview of the implementation in Wwise.`
      },
      { 
        title: "Procgen music bed for shop atmosphere", 
        video: "https://www.youtube.com/embed/FLcrB9zjiYk", 
        description: `No need for long ambiance loops to create non-repetitive background music. An interesting idea for how to stitch one-shots and pauses into a procedural percussive loop in Wwise. Add a couple of drones and you've got a background bed that never repeats.`
      },
      { 
        title: "Dynamic crowd system. Wwise implementation.", 
        video: "https://www.youtube.com/embed/01GdKjrN8M8", 
        description: `it’s about the dynamic crowd reactions system, designed to deliver an authentic, high-energy TV show atmosphere. The system is fully responsive and tightly integrated with real-time player actions. I’ll break down that workflow in my upcoming videos.`
      }
    ]
  },
  "/factorio": {
    intro: "Sound designer & composer for games and interactive media. Focused on creating high-quality audio experiences.",
    videos: [
      { title: "Factorio Enemies Sound Design", video: "https://www.youtube.com/embed/XDVa0ihX10Q", description: "Descriptive video of enemies audio creation" },
      { title: "Factorio Combat Robots Sound Design", video: "https://www.youtube.com/embed/JC2ppfKRRNI", description: "Example description." },
      { title: "Factorio Flying Robots sounds", video: "https://www.youtube.com/embed/AJiDw4c9RIY", description: "Example description." },
    ]
  },
  "/redesigns": {
    intro: "Some are driven by pure curiosity and fun, others are conceptual solutions for specific design challenges.",
    videos: [
      { title: "Some redesigns", video: "https://www.youtube.com/embed/TQtxutZEYL4", description: "Full audio replacement." },
      { title: "Some redesigns", video: "https://www.youtube.com/embed/SM2TirBNuDs", description: "Full audio replacement." }
    ]
  },
  "/advertising": {
    intro: "Commercial and promotional sound design. Delivering clear, punchy, and broadcast-ready audio mixes.",
    videos: [
      { 
        title: "Syngenta Commercial Spot. SFX + Mixing", 
        video: "https://youtube.com/embed/7ltd8OzdoUM", 
        description: "Full audio replacement for the video, including sound design, voiceover processing, and final mix." 
      }
    ]
  },
  "/music": {
    intro: "Bridging the gap between cinematic media and club culture: electronic music for trailers, games, and live acts.",
    videos: [
      { title: "Spring Spirit", video: "https://www.youtube.com/embed/6023ImFR3RM", description: "A piece I composed after being deeply moved by the film I Origin." },
      { title: "Factorio Launch", video: "https://www.youtube.com/embed/qObuy_yCIdg", description: "Music for Factorio launch trailer." }
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
  { path: "/king-of-meat", label: "King of Meat" },
  { path: "/factorio", label: "Factorio" },
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
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0705]">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0705_90%)]" />
      <div className="absolute top-[140px] left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0a0705]" />
    </div>
  );
};

const Header = () => (
  <div className="relative z-20">
    <div className="h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] border-b border-white/5" />
    <div className="absolute left-8 -bottom-16 flex items-end gap-6">
      <div className="w-32 h-32 rounded-2xl bg-gray-500 border-4 border-[#0a0705] shadow-2xl overflow-hidden">
        <img 
          src="/avatar.jpg" 
          alt="Val Sol" 
          className="w-full h-full object-cover" 
        />
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
    <div className="relative z-10 flex gap-6 px-6 pt-20 pb-4 border-b border-white/10 bg-[#0a0705]/80 backdrop-blur-md">
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-2 py-1 transition-colors ${
            location.pathname === item.path ? "text-blue-400 font-medium" : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
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
      
      <div className="grid md:grid-cols-2 gap-8">
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
      <div className="relative min-h-screen text-white font-sans">
        <Background />
        <Header />
        <NavBar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <div className="p-10 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">About Me</h2>
                
                <p className="text-gray-400 text-lg font-medium mb-6">
                  Senior Sound Designer and Technical Audio Engineer<br />
                  Credits: King of Meat (Amazon Games), Factorio, Wargaming
                </p>

                <p className="text-gray-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {`For me, audio is far more than just a job. It is a passion driven by a constant search for the most efficient technical solutions and the most expressive sonic design. I believe that sound and music are the ultimate tools for player immersion because they bypass the filters of language and symbols, striking directly at the subconscious to evoke immediate emotion and instinct.

For over 10 years, I have been bridging the gap between creative sound art and technical implementation across PC, console, and mobile games. I specialize in building robust, adaptive, and performance-aware audio frameworks using Wwise, FMOD, and Unreal Engine.

I do not just create sounds; I design how they behave. From asset optimization to writing complex event-driven logic alongside programmers, my goal is always to maximize the impact of audio communication with the player while ensuring flawless technical execution.

With a background spanning TV post-production, electronic music, and 250+ field recording trips, I bring an old-school obsession with pristine audio quality into modern, systemic game development.`}
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
