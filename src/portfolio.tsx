{/* ===== HEADER (sticky, аватар на границе) ===== */}
<header className="sticky top-0 z-50">
  <div className="relative h-40 bg-gradient-to-r from-[#1c120d] to-[#2b1a13] border-b border-white/5">
    {/* Бургер (только мобилка) */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="absolute right-6 top-4 text-gray-400 hover:text-white focus:outline-none md:hidden"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  </div>
  <div className="relative flex items-end justify-between px-8 -mt-16 pb-4">
    <div className="flex items-end gap-6">
      <div className="w-32 h-32 rounded-2xl bg-gray-500 border-4 border-[#0a0705] shadow-2xl overflow-hidden shrink-0">
        <img src="/avatar.jpg" alt="Val Sol" className="w-full h-full object-cover" />
      </div>
      <div className="pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Val Sol</h1>
        <p className="text-blue-400 text-lg font-medium drop-shadow-md">Sound Designer / Composer</p>
      </div>
    </div>
  </div>

  {/* Мобильное выпадающее меню */}
  {isOpen && (
    <div className="md:hidden bg-[#0a0705] border-t border-white/5">
      <div className="flex flex-col px-8 py-4 space-y-3">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-lg text-gray-300 hover:text-white transition-colors py-1 text-left"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )}
</header>   
