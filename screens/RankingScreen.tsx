'use client';

import { MOCK_RANKING } from '@/constants';
import { IconChevronDown } from '@/components/Icons'; 
import { Avatar } from '@/components/Shared';
import { Triangle } from 'lucide-react';

const TrendIcon = ({ trend }: { trend: 'up'|'down'|'same' }) => {
    if (trend === 'same') return <div className="w-1.5 h-1.5 rounded-full bg-white/20" />;
    return (
        <Triangle 
            size={10} 
            className={`${trend === 'up' ? 'text-emerald-400 fill-emerald-400' : 'text-accent fill-accent rotate-180'}`} 
        />
    );
}

export const RankingScreen = () => {
  const topThree = [MOCK_RANKING[1], MOCK_RANKING[0], MOCK_RANKING[2]]; // Order: 2nd, 1st, 3rd visually
  const rest = MOCK_RANKING.slice(3);
  const userRank = MOCK_RANKING.find(r => r.user.id === 'p2'); 

  return (
    <div className="min-h-screen bg-background text-white pb-24 pt-8 px-5">
      <h1 className="text-xl font-semibold mb-6 text-white text-center">Global Ranking</h1>

      {/* Filter - Minimalist */}
      <div className="relative mb-10">
        <button className="w-full flex items-center justify-between bg-surfaceLight/50 backdrop-blur-sm border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium transition-colors hover:bg-surfaceLight/80">
            <span className="truncate pr-4 text-zinc-200">CrossFit: Men's Light-Heavyweight</span>
            <IconChevronDown size={16} className="text-muted shrink-0" />
        </button>
      </div>

      {/* Podium - Modernized */}
      <div className="flex justify-center items-end gap-4 mb-12 h-44">
        {topThree.map((entry, index) => {
          const isFirst = index === 1;
          const isSecond = index === 0;
          const isThird = index === 2;
          
          let size = isFirst ? 'w-20 h-20' : 'w-14 h-14';
          // Subtle glow instead of heavy borders
          let glow = isFirst ? 'shadow-[0_0_25px_rgba(251,191,36,0.2)]' : 'shadow-none';
          let ring = isFirst ? 'ring-2 ring-amber-400' : 'ring-1 ring-white/20';
          let height = isFirst ? 'mb-8' : 'mb-0';

          return (
            <div key={entry.id} className={`flex flex-col items-center relative ${height}`}>
               {isFirst && <div className="text-amber-400 mb-2 animate-bounce"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" /></svg></div>}
               
               <div className={`rounded-full ${ring} ${glow} relative z-10 bg-surfaceLight`}>
                  <img src={entry.user.avatarUrl} className={`${size} rounded-full object-cover`} alt="" />
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-surfaceLight border border-white/10 text-[10px] font-bold text-white shadow-lg`}>
                      {entry.rank}
                  </div>
               </div>

               <div className="mt-4 text-center">
                  <p className={`text-xs font-medium mb-1 ${isFirst ? 'text-white' : 'text-zinc-400'}`}>{entry.user.username}</p>
                  <p className="text-[10px] text-primary font-mono tracking-wider">{entry.points} pts</p>
               </div>
            </div>
          );
        })}
      </div>

      {/* My Rank */}
      {userRank && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-primary">{userRank.rank}</span>
                <div className="w-[1px] h-6 bg-primary/20"></div>
                <span className="text-sm font-medium text-white">Your current position</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-primary/20 rounded-md">
                 <TrendIcon trend={userRank.trend} />
            </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2">
        {rest.map(entry => (
            <div key={entry.id} className="flex items-center justify-between p-3 rounded-2xl bg-surfaceLight/20 hover:bg-surfaceLight/40 transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-muted w-6 text-center">{entry.rank}</span>
                    <Avatar url={entry.user.avatarUrl} size="sm" bordered={false} />
                    <div>
                        <p className="font-medium text-sm text-zinc-200">{entry.user.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 pr-2">
                    <span className="text-xs font-mono text-zinc-400">{entry.points}</span>
                    <TrendIcon trend={entry.trend} />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}