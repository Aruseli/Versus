'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useBattleCreationStore } from '@/stores/battleCreationStore';
import { DISCIPLINES } from '@/constants';
import { Discipline } from '@/types';

export const CreateSelectDisciplineScreen = () => {
  const router = useRouter();
  const { selectedDiscipline, setDiscipline } = useBattleCreationStore();

  const handleBack = () => {
    router.push('/home');
  };

  const handleContinue = () => {
    if (selectedDiscipline) {
      router.push('/create/rules');
    }
  };

  const handleDisciplineSelect = (discipline: Discipline) => {
    setDiscipline(discipline);
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
          <h2 className="text-xl font-bold text-white">Выберите дисциплину</h2>
          <p className="text-sm text-muted mt-1">Выберите дисциплину для баттла</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="space-y-3">
          {DISCIPLINES.map((discipline) => {
            const isSelected = selectedDiscipline === discipline.value;
            return (
              <motion.button
                key={discipline.value}
                onClick={() => handleDisciplineSelect(discipline.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                  isSelected
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                }`}
                style={{ minHeight: '120px' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0" style={{ fontSize: '48px' }}>
                    {discipline.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                      {discipline.label}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed" style={{ fontSize: '16px' }}>
                      {discipline.description}
                    </p>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-white/20'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
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
          disabled={!selectedDiscipline}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

