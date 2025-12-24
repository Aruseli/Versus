'use client';

import { useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Avatar } from '@/components/Shared';
import { MOCK_RANKING } from '@/constants';

export const UserPositionScreen = () => {
  const router = useRouter();
  const userRank = MOCK_RANKING.find(r => r.user.id === 'p2');
  const nearbyRanks = MOCK_RANKING.filter(r => {
    if (!userRank) return false;
    return Math.abs(r.rank - userRank.rank) <= 5 && r.id !== userRank.id;
  }).sort((a, b) => a.rank - b.rank);

  const handleBack = () => {
    router.back();
  };

  if (!userRank) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted" style={{ fontSize: '16px' }}>
          Позиция не найдена
        </p>
      </div>
    );
  }

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
          <h2 className="text-xl font-bold text-white">Ваша позиция</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        {/* Current Position Card */}
        <div className="bg-primary/20 border-2 border-primary rounded-3xl p-6 mb-6 shadow-lg shadow-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar url={userRank.user.avatarUrl} size="xl" />
              <div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontSize: '20px' }}>
                  {userRank.user.username}
                </h3>
                <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                  Текущая позиция
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary mb-1" style={{ fontSize: '36px' }}>
                #{userRank.rank}
              </p>
              <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                {userRank.points} очков
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {userRank.trend === 'up' && (
              <span className="text-xs font-semibold text-emerald-400 uppercase" style={{ fontSize: '12px' }}>
                ↑ Растет
              </span>
            )}
            {userRank.trend === 'down' && (
              <span className="text-xs font-semibold text-accent uppercase" style={{ fontSize: '12px' }}>
                ↓ Падает
              </span>
            )}
            {userRank.trend === 'same' && (
              <span className="text-xs font-semibold text-muted uppercase" style={{ fontSize: '12px' }}>
                → Без изменений
              </span>
            )}
          </div>
        </div>

        {/* Nearby Ranks */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontSize: '16px' }}>
            Ближайшие участники
          </h3>
          <div className="flex flex-col gap-2">
            {nearbyRanks.map(entry => (
              <div
                key={entry.id}
                className={`p-4 rounded-2xl border ${
                  entry.id === userRank.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-surfaceLight/20 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-muted w-8 text-center" style={{ fontSize: '14px' }}>
                      #{entry.rank}
                    </span>
                    <Avatar url={entry.user.avatarUrl} size="sm" bordered={false} />
                    <div>
                      <p className="font-medium text-sm text-zinc-200" style={{ fontSize: '14px' }}>
                        {entry.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-400" style={{ fontSize: '12px' }}>
                      {entry.points} pts
                    </span>
                    {entry.trend === 'up' && (
                      <span className="text-xs text-emerald-400">↑</span>
                    )}
                    {entry.trend === 'down' && (
                      <span className="text-xs text-accent">↓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics by Discipline */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontSize: '16px' }}>
            Статистика по дисциплинам
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-surfaceLight/20 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-white mb-1" style={{ fontSize: '14px' }}>
                    CrossFit
                  </p>
                  <p className="text-xs text-muted" style={{ fontSize: '12px' }}>
                    Men's Light-Heavyweight
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary" style={{ fontSize: '18px' }}>
                    #1
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-surfaceLight/20 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-white mb-1" style={{ fontSize: '14px' }}>
                    Basketball
                  </p>
                  <p className="text-xs text-muted" style={{ fontSize: '12px' }}>
                    Open weight
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-zinc-400" style={{ fontSize: '18px' }}>
                    #7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

