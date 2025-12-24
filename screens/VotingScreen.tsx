'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Avatar, Button } from '@/components/Shared';
import { MOCK_BATTLES } from '@/constants';

export const VotingScreen = () => {
  const params = useParams();
  const router = useRouter();
  const battleId = params.id as string;
  const battle = MOCK_BATTLES.find(b => b.id === battleId) || MOCK_BATTLES[2];
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (participantId: string) => {
    setSelectedParticipant(participantId);
  };

  const handleSubmit = async () => {
    if (!selectedParticipant) return;
    
    setIsSubmitting(true);
    // Симуляция отправки голоса
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    // Переход к результатам
    router.push(`/battle/${battleId}/vote/result`);
  };

  const handleBackToVideo = () => {
    router.push(`/battle/${battleId}/video`);
  };

  if (!battle.participant2) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted mb-4" style={{ fontSize: '16px' }}>
          Ожидается второй участник
        </p>
        <Button onClick={handleBack} variant="primary">
          Назад
        </Button>
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
          <h2 className="text-xl font-bold text-white">Выберите победителя</h2>
          <p className="text-sm text-muted mt-1" style={{ fontSize: '14px' }}>
            {battle.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 relative z-10">
        <div className="space-y-4 mt-4">
          {/* Participant 1 */}
          <button
            onClick={() => handleSelect(battle.participant1.id)}
            className={`w-full p-6 rounded-3xl border-2 transition-all touch-manipulation text-left ${
              selectedParticipant === battle.participant1.id
                ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20 scale-[0.98]'
                : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
            }`}
            style={{ minHeight: '120px' }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar url={battle.participant1.avatarUrl} size="lg" />
                {selectedParticipant === battle.participant1.id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                  {battle.participant1.username}
                </h3>
                <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                  Участник 1
                </p>
              </div>
            </div>
          </button>

          {/* Participant 2 */}
          <button
            onClick={() => handleSelect(battle?.participant2?.id || '')}
            className={`w-full p-6 rounded-3xl border-2 transition-all touch-manipulation text-left ${
              selectedParticipant === battle.participant2.id
                ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20 scale-[0.98]'
                : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
            }`}
            style={{ minHeight: '120px' }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar url={battle.participant2.avatarUrl} size="lg" />
                {selectedParticipant === battle.participant2.id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                  {battle.participant2.username}
                </h3>
                <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                  Участник 2
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent space-y-3" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleSubmit}
          variant="primary"
          disabled={!selectedParticipant || isSubmitting}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить голос'}
        </Button>
        <Button
          onClick={handleBackToVideo}
          variant="outline"
          className="w-full py-3 text-sm font-medium touch-manipulation"
          style={{ minHeight: '44px' }}
        >
          Вернуться к видео
        </Button>
      </div>
    </div>
  );
};

