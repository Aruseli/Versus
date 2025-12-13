'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconMessage, IconSearch, IconFilter, VsLogo, IconGroup, IconTrend } from '../components/Icons';
import { StoryCircle, Avatar } from '../components/Shared';
import { MOCK_STORIES, MOCK_BATTLES } from '../constants';
import { Battle, TabType } from '@/types';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('competition');
  const router = useRouter();

  const filteredBattles = MOCK_BATTLES.filter(b => {
    if (activeTab === 'competition') return b.status === 'active';
    if (activeTab === 'participation') return b.status === 'waiting' || b.participant1.username === 'Beckhan_Dukaev' || b.participant2?.username === 'Beckhan_Dukaev';
    if (activeTab === 'results') return b.status === 'finished';
    return true;
  });

  return (
    <div className="pb-24 pt-6 px-4 min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Versus<span className="text-primary">Arena</span></h1>
        </div>
        <button className="relative text-zinc-400 p-2.5 bg-surfaceLight/50 backdrop-blur-md rounded-full border border-white/5 hover:bg-surfaceLight transition-colors hover:text-white">
          <IconMessage size={20} />
          <div className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-surfaceLight"></div>
        </button>
      </div>
      
      {/* Search - Modern Input */}
      <div className="relative mb-8">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search for battles, users..." 
          className="w-full bg-surfaceLight/50 backdrop-blur-sm border border-white/5 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all shadow-sm"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <IconFilter size={16} className="text-zinc-400" />
        </button>
      </div>

      {/* Modern Segmented Control Tabs */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex p-1 bg-surfaceLight/50 rounded-xl border border-white/5 w-full">
            {(['competition', 'participation', 'results'] as TabType[]).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                        activeTab === tab 
                        ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' 
                        : 'text-muted hover:text-zinc-300'
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
         </div>
      </div>

      {/* Stories - Cleaner layout */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-white mb-4 px-1">Trending Now</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 mask-linear-fade">
            {MOCK_STORIES.map(story => (
            <StoryCircle key={story.id} username={story.username} url={story.avatarUrl} />
            ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-1 mb-2">
            <h3 className="text-sm font-semibold text-white">Active Battles</h3>
            <button className="text-xs text-primary hover:text-primaryGlow font-medium">View all</button>
        </div>
        
        {filteredBattles.map(battle => (
          <BattleCard key={battle.id} battle={battle} onClick={() => router.push(`/battle/${battle.id}`)} />
        ))}
        {filteredBattles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted">
                <div className="w-16 h-16 bg-surfaceLight rounded-full flex items-center justify-center mb-4">
                    <IconSearch size={24} className="opacity-50" />
                </div>
                <p>No competitions found</p>
            </div>
        )}
      </div>
    </div>
  );
}

const BattleCard: React.FC<{ battle: Battle; onClick: () => void }> = ({ battle, onClick }) => {
  const isFinished = battle.status === 'finished';
  // Use status colors that are less jarring
  const statusColor = isFinished ? 'text-emerald-400' : 'text-primary';

  return (
    <div 
      onClick={onClick}
      className="group bg-surfaceLight/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 relative cursor-pointer active:scale-[0.98] transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Image Area */}
      <div className="h-64 relative w-full">
        {/* Images Container */}
        <div className="absolute inset-0 flex">
            {/* Left Image */}
            <div className="flex-1 relative">
                <img src={`https://picsum.photos/seed/${battle.participant1.username}/400/600`} className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            {/* Right Image */}
            <div className="flex-1 relative bg-surface">
                 {battle.participant2 ? (
                    <>
                    <img src={`https://picsum.photos/seed/${battle.participant2.username}/400/600`} className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
                    </>
                 ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="text-xs font-medium text-white/30 uppercase tracking-widest">Waiting</span>
                    </div>
                 )}
            </div>
        </div>

        {/* Center Divider / Logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Diagonal slice effect logic would go here, simplified to a soft gradient join */}
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="absolute">
                <VsLogo size="md" />
            </div>
        </div>

        {/* Player Badges - Floating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
            <Avatar url={battle.participant1.avatarUrl} size="sm" className="ring-2 ring-black/50" />
            <span className="text-xs font-medium text-white drop-shadow-md truncate max-w-[80px]">{battle.participant1.username}</span>
        </div>
        
        {battle.participant2 && (
             <div className="absolute bottom-4 right-4 flex items-center flex-row-reverse gap-2 z-20">
                <Avatar url={battle.participant2.avatarUrl} size="sm" className="ring-2 ring-black/50" />
                <span className="text-xs font-medium text-white drop-shadow-md truncate max-w-[80px]">{battle.participant2.username}</span>
            </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
             <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                 <span className={`w-1.5 h-1.5 rounded-full ${isFinished ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`}></span>
                 <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
                    {battle.category}
                 </span>
             </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 bg-glass border-t border-white/5 flex justify-between items-center">
        <h3 className="font-medium text-sm text-zinc-100 tracking-wide">{battle.title}</h3>
        <div className="flex items-center gap-3 text-muted text-xs">
            {battle.stats ? (
                <>
                <div className="flex items-center gap-1"><IconTrend size={12} className="text-emerald-400" /> <span>{battle.stats.views > 1000 ? (battle.stats.views/1000).toFixed(1) + 'k' : battle.stats.views}</span></div>
                </>
            ) : (
                <span className="text-white/40">Just started</span>
            )}
        </div>
      </div>
    </div>
  );
}