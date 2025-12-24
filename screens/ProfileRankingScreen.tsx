'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { DISCIPLINES } from '@/constants';
import { Discipline } from '@/types';

export const ProfileRankingScreen = () => {
  const router = useRouter();
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | 'all'>('all');

  // Моковые данные позиций по дисциплинам
  const rankings = [
    {
      id: '1',
      discipline: 'CrossFit' as Discipline,
      category: "Men's Light-Heavyweight (89-96 kg)",
      rank: 1,
      points: 1241,
      trend: 'same' as const,
    },
    {
      id: '2',
      discipline: 'Basketball' as Discipline,
      category: 'Open weight',
      rank: 7,
      points: 856,
      trend: 'up' as const,
    },
    {
      id: '3',
      discipline: 'Intellectual' as Discipline,
      category: 'General',
      rank: 12,
      points: 650,
      trend: 'down' as const,
    },
  ];

  const filteredRankings = selectedDiscipline === 'all'
    ? rankings
    : rankings.filter(r => r.discipline === selectedDiscipline);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col pt-6 relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 24px)' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pb-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <IconBack size={24} className="text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Рейтинг</h2>
        </div>
      </div>

      {/* Filter */}
      <div className="relative z-10 px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setSelectedDiscipline('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation whitespace-nowrap ${
              selectedDiscipline === 'all'
                ? 'bg-primary text-white'
                : 'bg-surfaceLight/30 text-muted border border-white/5'
            }`}
            style={{ minHeight: '44px' }}
          >
            Все
          </button>
          {DISCIPLINES.map((discipline) => (
            <button
              key={discipline.value}
              onClick={() => setSelectedDiscipline(discipline.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation whitespace-nowrap ${
                selectedDiscipline === discipline.value
                  ? 'bg-primary text-white'
                  : 'bg-surfaceLight/30 text-muted border border-white/5'
              }`}
              style={{ minHeight: '44px' }}
            >
              {discipline.icon} {discipline.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col gap-3">
          {filteredRankings.map(ranking => (
            <div
              key={ranking.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight/20 border border-white/5"
            >
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                ranking.rank === 1
                  ? 'border-amber-400/50 bg-amber-400/10 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                  : 'border-zinc-600 bg-zinc-800 text-zinc-400'
              }`}>
                {ranking.rank}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-zinc-200 mb-1" style={{ fontSize: '16px' }}>
                  {ranking.discipline}
                </h4>
                <p className="text-xs text-zinc-500" style={{ fontSize: '12px' }}>
                  {ranking.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-primary mb-1" style={{ fontSize: '14px' }}>
                  {ranking.points} pts
                </p>
                {ranking.trend === 'up' && (
                  <span className="text-xs text-emerald-400">↑</span>
                )}
                {ranking.trend === 'down' && (
                  <span className="text-xs text-accent">↓</span>
                )}
                {ranking.trend === 'same' && (
                  <span className="text-xs text-muted">→</span>
                )}
              </div>
            </div>
          ))}
          {filteredRankings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted">
              <p className="text-base" style={{ fontSize: '16px' }}>Нет позиций</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

