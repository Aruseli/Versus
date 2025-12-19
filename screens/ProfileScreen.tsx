'use client';

import { useState } from 'react';
import { CURRENT_USER, MOCK_BATTLES } from '@/constants';
import { IconMore, IconPlus, IconSearch, IconGroup } from '@/components/Icons';
import { ProfileTabType } from '@/types';

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('competition');

  // Filter user's battles
  const userBattles = MOCK_BATTLES.filter(b => 
    b.participant1.username === 'Игрок1' || b.participant2?.username === 'Игрок1'
  );

  return (
    <div className="min-h-screen bg-background text-white pb-24 font-sans selection:bg-primary selection:text-white">
      {/* Header Area */}
      <div className="relative h-[340px]">
         {/* Background video/image simulation */}
         <div className="absolute inset-0 z-0">
            <img src="https://picsum.photos/seed/gymvideo/800/800" className="w-full h-full object-cover opacity-60" alt="background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
         </div>

         {/* Top Controls */}
         <div className="relative z-10 flex justify-between items-start p-4 pt-6">
            <div className="flex items-center gap-2 bg-surfaceLight/60 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-xs shadow-sm">₿</div>
                <span className="font-bold text-sm tracking-wide">245</span>
                <button className="bg-white/10 hover:bg-white/20 rounded-full p-0.5 ml-1 transition-colors">
                    <IconPlus size={12} className="text-white" />
                </button>
            </div>
            <button className="bg-surfaceLight/60 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-surfaceLight transition-colors">
                <IconMore size={20} className="text-zinc-300" />
            </button>
         </div>

         {/* Avatar & Name */}
         <div className="absolute bottom-0 left-0 w-full px-5 pb-6 z-10 flex flex-col items-start">
             <div className="relative mb-3">
                 <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-surfaceLight shadow-2xl">
                    <img src={CURRENT_USER.avatarUrl} className="w-full h-full object-cover" alt="" />
                 </div>
                 {/* Online Status or Rank Badge could go here */}
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight mb-0.5">{CURRENT_USER.username}</h2>
             <p className="text-zinc-400 text-sm">Professional CrossFit Athlete</p>
         </div>
      </div>

      {/* Stats Row */}
      <div className="px-5 mt-2 flex gap-3">
        <div className="flex-1 bg-surfaceLight/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-col items-center">
                <span className="text-emerald-400 font-bold text-lg">23</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Win</span>
            </div>
            <div className="w-[1px] h-8 bg-white/5"></div>
            <div className="flex flex-col items-center">
                <span className="text-accent font-bold text-lg">4</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Loss</span>
            </div>
            <div className="w-[1px] h-8 bg-white/5"></div>
            <div className="flex flex-col items-center">
                <span className="text-blue-400 font-bold text-lg">1</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Draw</span>
            </div>
        </div>
        <button className="px-5 bg-surfaceLight border border-white/10 rounded-2xl font-semibold text-sm hover:bg-white/5 transition-colors text-zinc-300">
            Edit
        </button>
      </div>

      {/* Search Bar - Modern Style */}
      <div className="px-5 mt-6">
        <div className="relative group">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Search history..." 
                className="w-full bg-surfaceLight/50 backdrop-blur-sm border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder-zinc-500"
            />
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="px-5 mt-6">
        <div className="flex p-1 bg-surfaceLight/50 rounded-xl border border-white/5 w-full">
            {(['competition', 'awards', 'ranking'] as ProfileTabType[]).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                        activeTab === tab 
                        ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' 
                        : 'text-muted hover:text-zinc-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* Content List */}
      <div className="mt-6 px-5 flex flex-col gap-4">
        {activeTab === 'competition' && (
             userBattles.map(battle => (
                <div key={battle.id} className="group flex items-center gap-4 p-3 rounded-2xl bg-transparent hover:bg-surfaceLight/30 border border-transparent hover:border-white/5 transition-all cursor-pointer">
                    <div className="relative flex-shrink-0 w-14 h-14">
                        <img src={`https://picsum.photos/seed/${battle.participant1.username}/100/100`} className="w-full h-full rounded-2xl object-cover ring-1 ring-white/10" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold truncate text-sm text-zinc-200 group-hover:text-white transition-colors">{battle.title}</h4>
                            {/* Updated Icon color to primary/indigo */}
                            <IconGroup size={16} className="text-primary flex-shrink-0" />
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                            {battle.status === 'active' && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            )}
                            {battle.status === 'finished' ? (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                    Won
                                </span>
                            ) : (
                                <span className="text-xs text-zinc-500">In Progress</span>
                            )}
                        </div>
                    </div>
                </div>
            ))
        )}

        {activeTab === 'awards' && (
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight/20 border border-white/5">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl border border-amber-500/20">🏆</div>
                    <div>
                        <h4 className="font-bold text-zinc-100">CrossFit</h4>
                        <p className="text-xs text-zinc-400">Team of the Month</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight/20 border border-white/5">
                    <div className="w-12 h-12 rounded-full bg-zinc-700/30 flex items-center justify-center text-2xl border border-white/10">🥇</div>
                    <div>
                        <h4 className="font-bold text-zinc-100">Clean & Jerk</h4>
                        <p className="text-xs text-zinc-400">Rank #1 (89-96 kg)</p>
                    </div>
                </div>
            </div>
        )}
        
        {activeTab === 'ranking' && (
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-surfaceLight/20 border border-white/5">
                     <div className="w-10 h-10 rounded-full border-2 border-amber-400/50 bg-amber-400/10 flex items-center justify-center font-bold text-amber-400 text-lg shadow-[0_0_15px_rgba(251,191,36,0.2)]">1</div>
                     <div>
                         <h4 className="font-bold text-zinc-200">Clean and jerk</h4>
                         <p className="text-xs text-zinc-500">Men's Light-Heavyweight (89-96 kg)</p>
                     </div>
                </div>
                 <div className="flex items-center gap-4 p-3 rounded-2xl bg-surfaceLight/20 border border-white/5">
                     <div className="w-10 h-10 rounded-full border-2 border-zinc-600 bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-lg">7</div>
                     <div>
                         <h4 className="font-bold text-zinc-200">Walking on hands</h4>
                         <p className="text-xs text-zinc-500">Open weight</p>
                     </div>
                </div>
             </div>
        )}
      </div>
    </div>
  );
}