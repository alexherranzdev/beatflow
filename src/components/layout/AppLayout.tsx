import { type ReactNode } from 'react';

interface AppLayoutProps {
  timerSection: ReactNode;
  settingsSection: ReactNode;
}

export function AppLayout({ timerSection, settingsSection }: AppLayoutProps) {
  return (
    <div className="h-full bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Header — fixed height, never shrinks */}
      <header className="shrink-0 px-4 py-2.5 border-b border-white/5 bg-gray-950/80 backdrop-blur-sm">
        <h1
          className="text-lg tracking-[0.25em] uppercase text-center text-white/70 font-semibold"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
        >
          Beat<span className="text-red-500">Flow</span>
        </h1>
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
