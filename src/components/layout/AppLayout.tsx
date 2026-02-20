import { type ReactNode, useState, useEffect, useCallback } from 'react';

interface AppLayoutProps {
  timerSection: ReactNode;
  settingsSection: ReactNode;
}

export function AppLayout({ timerSection, settingsSection }: AppLayoutProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div className="h-full bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Header — fixed height, never shrinks */}
      <header className="shrink-0 px-4 py-2.5 border-b border-white/5 bg-gray-950/80 backdrop-blur-sm relative flex items-center justify-center">
        <h1
          className="text-lg tracking-[0.25em] uppercase text-center text-white/70 font-semibold"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
        >
          Beat<span className="text-red-500">Flow</span>
        </h1>
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className="absolute right-3 p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors focus:outline-none"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
              <path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            </svg>
          )}
        </button>
      </header>

      {/* Main — fills remaining height, no page scroll */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* Timer column — centered, non-scrolling */}
        <div className="flex-1 md:flex-[55] flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
          {timerSection}
        </div>

        {/* Settings + Favorites column — only this scrolls */}
        <div className="md:flex-[45] shrink-0 border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto">
          <div className="p-4 md:p-5 space-y-5">
            {settingsSection}
          </div>
        </div>
      </main>
    </div>
  );
}
