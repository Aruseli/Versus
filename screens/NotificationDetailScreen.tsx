'use client';

import { useParams, useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Button, Avatar } from '@/components/Shared';
import { MOCK_NOTIFICATIONS } from '@/constants';

export const NotificationDetailScreen = () => {
  const params = useParams();
  const router = useRouter();
  const notificationId = params.id as string;
  const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId) || MOCK_NOTIFICATIONS[0];

  const handleBack = () => {
    router.back();
  };

  const handleAction = () => {
    // В зависимости от типа уведомления можно перейти к баттлу, принять заявку и т.д.
    if (notification.message.includes('contest') || notification.message.includes('application')) {
      // Переход к баттлу или заявке
      router.push('/home');
    }
  };

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
          <h2 className="text-xl font-bold text-white">Уведомление</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 relative z-10">
        <div className="space-y-6 mt-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar url={notification.user.avatarUrl} size="xl" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                {notification.user.username}
              </h3>
              <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                {notification.time}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="p-6 rounded-3xl bg-surfaceLight/20 border border-white/5">
            <p className="text-base text-zinc-200 leading-relaxed" style={{ fontSize: '16px' }}>
              {notification.message}
            </p>
          </div>

          {/* Additional Info */}
          <div className="p-4 rounded-2xl bg-surfaceLight/10 border border-white/5">
            <p className="text-sm text-muted mb-2" style={{ fontSize: '14px' }}>
              Статус: {notification.isRead ? 'Прочитано' : 'Новое'}
            </p>
            <p className="text-xs text-zinc-500" style={{ fontSize: '12px' }}>
              ID: {notification.id}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent space-y-3" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        {(notification.message.includes('contest') || notification.message.includes('application')) && (
          <Button
            onClick={handleAction}
            variant="primary"
            className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
            style={{ minHeight: '56px' }}
          >
            Перейти к баттлу
          </Button>
        )}
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-full py-3 text-sm font-medium touch-manipulation"
          style={{ minHeight: '44px' }}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

