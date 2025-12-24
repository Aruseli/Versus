'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/screens/SplashScreen';
import { AuthScreen } from '@/screens/AuthScreen';

type AppState = 'splash' | 'auth';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('splash');
  const router = useRouter();

  const handleSplashFinish = () => {
    setAppState('auth');
  };

  const handleAuthenticated = () => {
    // После авторизации проверяем, нужен ли onboarding
    const needsOnboarding = typeof window !== 'undefined' && !localStorage.getItem('onboarding_completed');
    if (needsOnboarding) {
      router.push('/onboarding/intro');
    } else {
      router.push('/home');
    }
  };

  if (appState === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <AuthScreen onAuthenticated={handleAuthenticated} />;
}
