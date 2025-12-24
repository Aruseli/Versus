'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Input } from '@/components/Input';
import { MOCK_BATTLES, DISCIPLINES } from '@/constants';
import { Battle, BattleStatus } from '@/types';
import { Avatar } from '@/components/Shared';
import { VsLogo, IconTrend } from '@/components/Icons';

export const SearchFiltersScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<BattleStatus[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'status'>('date');

  const handleBack = () => {
    router.back();
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: BattleStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSortBy('date');
  };

  const filteredBattles = useMemo(() => {
    let results = [...MOCK_BATTLES];

    // Поиск по названию или участникам
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(battle =>
        battle.title.toLowerCase().includes(query) ||
        battle.participant1.username.toLowerCase().includes(query) ||
        battle.participant2?.username.toLowerCase().includes(query)
      );
    }

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      results = results.filter(battle =>
        selectedCategories.includes(battle.category)
      );
    }

    // Фильтр по статусам
    if (selectedStatuses.length > 0) {
      results = results.filter(battle =>
        selectedStatuses.includes(battle.status)
      );
    }

    // Сортировка
    results.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'popularity') {
        const viewsA = a.stats?.views || 0;
        const viewsB = b.stats?.views || 0;
        return viewsB - viewsA;
      }
      if (sortBy === 'status') {
        const statusOrder: Record<BattleStatus, number> = {
          active: 0,
          waiting: 1,
          finished: 2,
        };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

    return results;
  }, [searchQuery, selectedCategories, selectedStatuses, sortBy]);

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStatuses.length > 0;

  const statusOptions: { value: BattleStatus; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'waiting', label: 'Waiting' },
    { value: 'finished', label: 'Finished' },
  ];

  return (
    <div className="min-h-screen bg-background text-white flex flex-col pt-6 relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 24px)' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pb-4 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <IconBack size={24} className="text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Поиск и фильтры</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary font-medium touch-manipulation px-3 py-2"
            style={{ minHeight: '44px' }}
          >
            Очистить
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative z-10 px-6 mb-6">
        <Input
          leftIcon="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по названию, участникам..."
          size="lg"
          showClearButton
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Категории</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {DISCIPLINES.map((discipline) => {
              const isSelected = selectedCategories.includes(discipline.value);
              return (
                <button
                  key={discipline.value}
                  onClick={() => toggleCategory(discipline.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation whitespace-nowrap ${
                    isSelected
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-surfaceLight/30 text-muted border border-white/5 hover:border-white/10'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {discipline.icon} {discipline.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Statuses */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Статус</h3>
          <div className="flex flex-col gap-2">
            {statusOptions.map((status) => {
              const isSelected = selectedStatuses.includes(status.value);
              return (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                      : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                  }`}
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-white" style={{ fontSize: '16px' }}>
                      {status.label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Сортировка</h3>
          <div className="flex flex-col gap-2">
            {(['date', 'popularity', 'status'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                  sortBy === sort
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                }`}
                style={{ minHeight: '56px' }}
              >
                <span className="text-base font-medium text-white" style={{ fontSize: '16px' }}>
                  {sort === 'date' ? 'По дате' : sort === 'popularity' ? 'По популярности' : 'По статусу'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white" style={{ fontSize: '16px' }}>
              Результаты ({filteredBattles.length})
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            {filteredBattles.map(battle => (
              <BattleCardComponent
                key={battle.id}
                battle={battle}
                onClick={() => router.push(`/battle/${battle.id}`)}
              />
            ))}
            {filteredBattles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-muted">
                <div className="w-16 h-16 bg-surfaceLight rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <p className="text-base" style={{ fontSize: '16px' }}>Ничего не найдено</p>
                <p className="text-sm text-zinc-500 mt-2" style={{ fontSize: '14px' }}>
                  Попробуйте изменить фильтры
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BattleCardComponent: React.FC<{ battle: Battle; onClick: () => void }> = ({ battle, onClick }) => {
  const isFinished = battle.status === 'finished';

  return (
    <div 
      onClick={onClick}
      className="group bg-surfaceLight/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 relative cursor-pointer active:scale-[0.98] transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 touch-manipulation"
    >
      <div className="h-64 relative w-full">
        <div className="absolute inset-0 flex">
          <div className="flex-1 relative">
            <img
              src={battle.participant1.avatarUrl}
              className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="flex-1 relative bg-surface">
            {battle.participant2 ? (
              <>
                <img
                  src={battle.participant2.avatarUrl}
                  className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <span className="text-xs font-medium text-white/30 uppercase tracking-widest">Waiting</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div className="absolute">
            <VsLogo size="md" />
          </div>
        </div>
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
        <div className="absolute top-4 left-4 z-20">
          <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isFinished ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`}></span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
              {battle.category}
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 bg-glass border-t border-white/5 flex justify-between items-center">
        <h3 className="font-medium text-sm text-zinc-100 tracking-wide">{battle.title}</h3>
        <div className="flex items-center gap-3 text-muted text-xs">
          {battle.stats ? (
            <div className="flex items-center gap-1">
              <IconTrend size={12} className="text-emerald-400" />
              <span>{battle.stats.views > 1000 ? (battle.stats.views/1000).toFixed(1) + 'k' : battle.stats.views}</span>
            </div>
          ) : (
            <span className="text-white/40">Just started</span>
          )}
        </div>
      </div>
    </div>
  );
};

