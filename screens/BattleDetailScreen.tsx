'use client';

import { useParams, useRouter } from 'next/navigation';
import { IconBack, IconGroup, IconPlay, IconComment, IconShare, IconEye, VsLogo } from '../components/Icons';
import { MOCK_BATTLES } from '../constants';

export default function BattleDetailScreen() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const battle = MOCK_BATTLES.find(b => b.id === id) || MOCK_BATTLES[2]; // Fallback to finished battle

  return (
    <div className="min-h-screen bg-background text-white pb-6 relative">
      {/* Header Navigation */}
      <div className="flex justify-between items-center p-4">
        <button onClick={() => router.back()} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
            <IconBack size={20} />
        </button>
        <div className="px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 flex items-center gap-2">
            {battle.status === 'finished' ? (
                 <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
            ) : (
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
            )}
            <span className="text-sm font-mono font-bold text-zinc-300">
                {battle.date || '16.09.25'}
            </span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="mt-4 px-6 flex flex-col items-center">
         {/* Title Card */}
         <div className="border border-zinc-600 rounded-lg px-6 py-2 bg-zinc-900/50 backdrop-blur text-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h1 className="text-2xl font-black italic uppercase tracking-wider text-zinc-200 drop-shadow-lg">
                {battle.title.split(':')[0]}
            </h1>
         </div>

         {/* Icon */}
         <div className="mt-8 mb-4 p-2 border border-red-900 bg-zinc-900 rounded bg-linear-to-b from-zinc-800 to-zinc-950 shadow-red-900/20 shadow-lg">
             <IconGroup className="text-zinc-300" size={32} />
         </div>

         {/* More Info */}
         <button className="px-8 py-2 rounded-full border border-red-600 text-zinc-200 text-sm font-semibold hover:bg-red-600/10 transition-colors mb-8">
            More info
         </button>
      </div>

      {/* Battle Display */}
      <div className="px-4">
        <h3 className="text-center text-lg font-medium text-zinc-400 mb-6">Results:</h3>
        
        <div className="flex justify-between items-center relative">
            {/* Winner */}
            <div className="flex flex-col items-center w-1/3">
                <span className="text-green-400 font-bold mb-2 tracking-wide text-shadow-sm">Winner</span>
                <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full p-1 bg-background border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                         <img src={battle.participant1.avatarUrl} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                </div>
                <span className="text-xs font-bold text-center mb-3">{battle.participant1.username}</span>
                <button 
                  onClick={() => router.push(`/battle/${battle.id}/video`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-full text-xs hover:bg-zinc-700 transition touch-manipulation"
                  style={{ minHeight: '44px' }}
                >
                    <IconPlay size={10} className="text-green-500 fill-green-500" /> Video
                </button>
            </div>

            {/* VS */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-12 z-10 scale-125">
                 <VsLogo />
            </div>

            {/* Loser */}
             <div className="flex flex-col items-center w-1/3">
                <span className="text-red-500 font-bold mb-2 tracking-wide">Loser</span>
                <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full p-1 bg-background border-4 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                         <img src={battle.participant2?.avatarUrl} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                </div>
                <span className="text-xs font-bold text-center mb-3">{battle.participant2?.username}</span>
                <button 
                  onClick={() => router.push(`/battle/${battle.id}/video`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-full text-xs hover:bg-zinc-700 transition touch-manipulation"
                  style={{ minHeight: '44px' }}
                >
                    <IconPlay size={10} className="text-red-500 fill-red-500" /> Video
                </button>
            </div>
        </div>
      </div>

      {/* Social Footer */}
      <div className="fixed bottom-0 left-0 w-full p-4 pb-8 bg-linear-to-t from-background via-background to-transparent z-20">
         <div className="w-full max-w-sm mx-auto flex justify-between items-center px-8 py-3 rounded-full border border-red-900/40 bg-zinc-900/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-zinc-400">
                <IconComment size={18} />
                <span className="text-sm font-medium">342</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
                <IconShare size={18} />
                <span className="text-sm font-medium">229</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
                <IconEye size={18} />
                <span className="text-sm font-medium">9,2K</span>
            </div>
         </div>
      </div>
    </div>
  );
}