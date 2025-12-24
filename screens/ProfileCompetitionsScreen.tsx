'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { IconBack, IconGroup } from '@/components/Icons';
import { Input } from '@/components/Input';
import { MOCK_BATTLES } from '@/constants';
import { Battle, BattleStatus } from '@/types';

export const ProfileCompetitionsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BattleStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const userBattles = useMemo(() => {
    let battles = MOCK_BATTLES.filter(b => 
      b.participant1.username === 'Игрок1' || b.participant2?.username === 'Игрок1'
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      battles = battles.filter(battle =>
        battle.title.toLowerCase().includes(query) ||
        battle.category.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      battles = battles.filter(b => b.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      battles = battles.filter(b => b.category === selectedCategory);
    }

    return battles;
  }, [searchQuery, selectedStatus, selectedCategory]);

  const categories = Array.from(new Set(MOCK_BATTLES.map(b => b.category)));

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
          <h2 className="text-xl font-bold text-white">История баттлов</h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative z-10 px-6 mb-4">
        <Input
          leftIcon="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
          size="lg"
        />
      </div>

      {/* Filters */}
      <div className="relative z-10 px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-surfaceLight/30 text-muted border border-white/5'
            }`}
            style={{ minHeight: '44px' }}
          >
            Все
          </button>
          {(['active', 'waiting', 'finished'] as BattleStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-surfaceLight/30 text-muted border border-white/5'
              }`}
              style={{ minHeight: '44px' }}
            >
              {status === 'active' ? 'Активные' : status === 'waiting' ? 'Ожидание' : 'Завершенные'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col gap-4">
          {userBattles.map(battle => (
            <div
              key={battle.id}
              onClick={() => router.push(`/battle/${battle.id}`)}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight/20 hover:bg-surfaceLight/30 border border-transparent hover:border-white/5 transition-all cursor-pointer touch-manipulation"
            >
              <div className="relative shrink-0 w-16 h-16">
                <img
                  src={`https://picsum.photos/seed/${battle.participant1.username}/100/100`}
                  className="w-full h-full rounded-2xl object-cover ring-1 ring-white/10"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold truncate text-sm text-zinc-200 group-hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                    {battle.title}
                  </h4>
                  <IconGroup size={16} className="text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {battle.status === 'active' && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  )}
                  {battle.status === 'finished' ? (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      {battle.winnerId === battle.participant1.id ? 'Победа' : 'Поражение'}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500" style={{ fontSize: '12px' }}>
                      {battle.status === 'active' ? 'В процессе' : 'Ожидание'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {userBattles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted">
              <p className="text-base" style={{ fontSize: '16px' }}>Нет баттлов</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

