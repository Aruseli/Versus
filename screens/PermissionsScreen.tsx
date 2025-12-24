'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { requestCameraPermission, checkCameraPermission, PermissionStatus } from '@/utils/cameraPermissions';

export const PermissionsScreen = () => {
  const router = useRouter();
  const { setPermissionsGranted } = useOnboardingStore();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем текущий статус разрешений при загрузке
    checkCameraPermission().then(status => {
      setPermissionStatus(status);
    });
  }, []);

  const handleBack = () => {
    router.push('/onboarding/rules');
  };

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    setError(null);

    try {
      const status = await requestCameraPermission();
      setPermissionStatus(status);

      if (status === 'granted') {
        setPermissionsGranted(true);
        // Завершаем onboarding и переходим на главную
        if (typeof window !== 'undefined') {
          localStorage.setItem('onboarding_completed', 'true');
        }
        router.push('/home');
      } else if (status === 'denied') {
        setError('Разрешения отклонены. Вы можете включить их позже в настройках устройства.');
      } else {
        setError('Не удалось получить доступ к камере. Проверьте настройки устройства.');
      }
    } catch (err) {
      setError('Произошла ошибка при запросе разрешений.');
      setPermissionStatus('error');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    // Пропустить запрос разрешений и завершить onboarding
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true');
    }
    router.push('/home');
  };

  const handleComplete = () => {
    // Если разрешения уже даны, просто завершаем onboarding
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true');
    }
    router.push('/home');
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
          <h2 className="text-xl font-bold text-white">Разрешения</h2>
          <p className="text-sm text-muted mt-1">Для записи видео</p>
        </div>
        <div className="text-sm text-muted font-medium">5/5</div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 px-6 mb-6">
        <div className="h-1 bg-surfaceLight rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '80%' }}
            animate={{ width: '100%' }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-40 relative z-10">
        <div className="text-center space-y-6 max-w-md">
          {/* Icons */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-7xl" style={{ fontSize: '80px' }}>
              📹
            </div>
            <div className="text-7xl" style={{ fontSize: '80px' }}>
              🎤
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white" style={{ fontSize: '20px' }}>
              Доступ к камере и микрофону
            </h3>
            <p className="text-base text-zinc-300 leading-relaxed" style={{ fontSize: '16px' }}>
              Нам нужен доступ к камере и микрофону для записи ваших выступлений и участия в баттлах.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed" style={{ fontSize: '14px' }}>
              Вы можете изменить эти настройки позже в настройках устройства.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <p className="text-sm text-accent" style={{ fontSize: '14px' }}>
                {error}
              </p>
            </motion.div>
          )}

          {/* Status message */}
          {permissionStatus === 'granted' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <p className="text-sm text-emerald-400" style={{ fontSize: '14px' }}>
                Разрешения уже предоставлены!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent space-y-3" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        {permissionStatus === 'granted' ? (
          <Button
            onClick={handleComplete}
            variant="primary"
            className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
            style={{ minHeight: '56px' }}
          >
            Завершить
          </Button>
        ) : (
          <>
            <Button
              onClick={handleRequestPermission}
              variant="primary"
              disabled={isRequesting}
              className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '56px' }}
            >
              {isRequesting ? 'Запрос разрешений...' : 'Разрешить доступ'}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full py-3 text-sm font-medium touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              Пропустить
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

