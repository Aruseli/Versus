'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { FAIR_PLAY_RULES } from '@/constants';

export const FairPlayRulesScreen = () => {
  const router = useRouter();
  const { setAcceptedRules } = useOnboardingStore();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleBack = () => {
    router.push('/onboarding/level');
  };

  const handleContinue = () => {
    if (isAccepted) {
      setAcceptedRules(true);
      router.push('/onboarding/permissions');
    }
  };

  const handleToggleAccept = () => {
    setIsAccepted(!isAccepted);
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
          <h2 className="text-xl font-bold text-white">Правила честной игры</h2>
          <p className="text-sm text-muted mt-1">Важно для всех участников</p>
        </div>
        <div className="text-sm text-muted font-medium">4/5</div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 px-6 mb-6">
        <div className="h-1 bg-surfaceLight rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '60%' }}
            animate={{ width: '80%' }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 relative z-10">
        <div className="space-y-4">
          {FAIR_PLAY_RULES.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5"
              style={{ minHeight: '80px' }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0" style={{ fontSize: '40px' }}>
                  {rule.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontSize: '18px' }}>
                    {rule.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed" style={{ fontSize: '16px' }}>
                    {rule.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky bottom section with checkbox and button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="p-6 space-y-4">
          {/* Checkbox */}
          <button
            onClick={handleToggleAccept}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surfaceLight/30 border border-white/5 hover:border-white/10 transition-all touch-manipulation"
            style={{ minHeight: '44px' }}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
              isAccepted
                ? 'bg-primary border-primary'
                : 'border-white/20'
            }`}>
              {isAccepted && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span className="text-base text-white font-medium flex-1 text-left" style={{ fontSize: '16px' }}>
              Я согласен с правилами честной игры
            </span>
          </button>

          {/* Continue button */}
          <Button
            onClick={handleContinue}
            variant="primary"
            disabled={!isAccepted}
            className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '56px' }}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};

