'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Level } from '@/types';

const LEVELS: { value: Level; label: string; description: string; example: string }[] = [
  {
    value: 'Beginner',
    label: 'Начинающий',
    description: 'Только начинаю свой путь',
    example: 'Могу выполнить базовые упражнения'
  },
  {
    value: 'Intermediate',
    label: 'Средний',
    description: 'Имею опыт и регулярно тренируюсь',
    example: 'Знаю технику, могу соревноваться'
  },
  {
    value: 'Advanced',
    label: 'Продвинутый',
    description: 'Высокий уровень подготовки',
    example: 'Достигаю серьёзных результатов'
  },
  {
    value: 'Pro',
    label: 'Профессионал',
    description: 'Эксперт в своей дисциплине',
    example: 'Участвую в соревнованиях высокого уровня'
  },
];

export const ChooseLevelScreen = () => {
  const router = useRouter();
  const { selectedLevel, setLevel } = useOnboardingStore();

  const handleBack = () => {
    router.push('/onboarding/discipline');
  };

  const handleContinue = () => {
    if (selectedLevel) {
      router.push('/onboarding/rules');
    }
  };

  const handleSelectLevel = (level: Level) => {
    setLevel(level);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col pt-6 relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <IconBack size={24} className="text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Выберите уровень</h2>
          <p className="text-sm text-muted mt-1">Можно изменить позже</p>
        </div>
        <div className="text-sm text-muted font-medium">3/5</div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 px-6 mb-6">
        <div className="h-1 bg-surfaceLight rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '40%' }}
            animate={{ width: '60%' }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="space-y-3">
          {LEVELS.map((level) => {
            const isSelected = selectedLevel === level.value;
            return (
              <motion.button
                key={level.value}
                onClick={() => handleSelectLevel(level.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                  isSelected
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                }`}
                style={{ minHeight: '100px' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                      {level.label}
                    </h3>
                    <p className="text-sm text-muted mb-2 leading-relaxed" style={{ fontSize: '16px' }}>
                      {level.description}
                    </p>
                    <p className="text-xs text-zinc-500 italic" style={{ fontSize: '14px' }}>
                      {level.example}
                    </p>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
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
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleContinue}
          variant="primary"
          disabled={!selectedLevel}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

