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
    // После авторизации перенаправляем на главную страницу авторизованного пользователя
    router.push('/');
  };

  if (appState === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <AuthScreen onAuthenticated={handleAuthenticated} />;
}
