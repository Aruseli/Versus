'use client';

import { useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';

export const ProfileAwardsScreen = () => {
  const router = useRouter();

  // Моковые данные ачивок
  const awards = [
    {
      id: '1',
      title: 'CrossFit',
      description: 'Team of the Month',
      icon: '🏆',
      category: 'discipline',
      unlocked: true,
      date: '2025-01-15',
    },
    {
      id: '2',
      title: 'Clean & Jerk',
      description: 'Rank #1 (89-96 kg)',
      icon: '🥇',
      category: 'achievement',
      unlocked: true,
      date: '2025-01-10',
    },
    {
      id: '3',
      title: 'First Victory',
      description: 'Выиграл первый баттл',
      icon: '🎯',
      category: 'milestone',
      unlocked: true,
      date: '2025-01-05',
    },
    {
      id: '4',
      title: '10 Battles',
      description: 'Участвовал в 10 баттлах',
      icon: '⭐',
      category: 'milestone',
      unlocked: false,
      progress: 7,
      target: 10,
    },
    {
      id: '5',
      title: 'Perfect Week',
      description: 'Выиграл все баттлы за неделю',
      icon: '💎',
      category: 'achievement',
      unlocked: false,
    },
  ];

  const categories = Array.from(new Set(awards.map(a => a.category)));

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
          <h2 className="text-xl font-bold text-white">Ачивки</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="space-y-4">
          {awards.map(award => (
            <div
              key={award.id}
              className={`p-4 rounded-2xl border ${
                award.unlocked
                  ? 'bg-surfaceLight/20 border-white/5'
                  : 'bg-surfaceLight/10 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 ${
                  award.unlocked
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : 'bg-zinc-700/30 border-white/10 grayscale'
                }`}>
                  {award.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-100 mb-1" style={{ fontSize: '16px' }}>
                    {award.title}
                  </h4>
                  <p className="text-xs text-zinc-400" style={{ fontSize: '12px' }}>
                    {award.description}
                  </p>
                  {award.unlocked && award.date && (
                    <p className="text-xs text-zinc-500 mt-1" style={{ fontSize: '12px' }}>
                      Получено: {new Date(award.date).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                  {!award.unlocked && award.progress !== undefined && (
                    <div className="mt-2">
                      <div className="w-full h-2 bg-surfaceLight rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(award.progress / award.target) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-500 mt-1" style={{ fontSize: '12px' }}>
                        {award.progress} / {award.target}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

