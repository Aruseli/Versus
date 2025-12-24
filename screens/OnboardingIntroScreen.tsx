'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { VsLogo } from '@/components/Icons';
import { Button } from '@/components/Shared';

export const OnboardingIntroScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/discipline');
  };

  const handleSkip = () => {
    // Пропустить onboarding и перейти на главную
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true');
    }
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-between pt-6 pb-6 px-6 relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      {/* Skip button */}
      <div className="w-full flex justify-end pt-6 pb-4 relative z-10">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm text-muted hover:text-white transition-colors touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          Пропустить
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10 w-full max-w-md">
        {/* Logo/Illustration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1 }}
          className="mb-4"
        >
          <div className="scale-150">
            <VsLogo size="lg" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontSize: '24px' }}>
            Добро пожаловать в <span className="text-primary">VersusArena</span>
          </h1>
          <p className="text-lg text-zinc-300 font-medium" style={{ fontSize: '18px' }}>
            Соревнуйся, побеждай, развивайся
          </p>
          <p className="text-base text-zinc-400 leading-relaxed px-4" style={{ fontSize: '16px' }}>
            Платформа для честных соревнований в различных дисциплинах. 
            Записывай свои достижения, бросай вызов другим и доказывай своё мастерство.
          </p>
        </motion.div>
      </div>

      {/* Bottom button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full pb-8 relative z-10"
      >
        <Button
          onClick={handleStart}
          variant="primary"
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
          style={{ minHeight: '56px' }}
        >
          Начать
        </Button>
      </motion.div>
    </div>
  );
};

