'use client';

import { useParams, useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { MOCK_BATTLES } from '@/constants';
import { motion } from 'motion/react';

export const VotingResultScreen = () => {
  const params = useParams();
  const router = useRouter();
  const battleId = params.id as string;
  const battle = MOCK_BATTLES.find(b => b.id === battleId) || MOCK_BATTLES[2];

  // Моковые данные результатов голосования
  const participant1Votes = 342;
  const participant2Votes = 229;
  const totalVotes = participant1Votes + participant2Votes;
  const participant1Percent = Math.round((participant1Votes / totalVotes) * 100);
  const participant2Percent = Math.round((participant2Votes / totalVotes) * 100);
  const winnerId = participant1Votes > participant2Votes ? battle.participant1.id : battle.participant2?.id;

  const handleBack = () => {
    router.push(`/battle/${battleId}`);
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
          <h2 className="text-xl font-bold text-white">Результаты голосования</h2>
          <p className="text-sm text-muted mt-1" style={{ fontSize: '14px' }}>
            {battle.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 relative z-10">
        <div className="space-y-6 mt-4">
          {/* Total Votes */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted mb-2" style={{ fontSize: '14px' }}>Всего голосов</p>
            <p className="text-4xl font-bold text-white" style={{ fontSize: '36px' }}>
              {totalVotes}
            </p>
          </div>

          {/* Participant 1 Results */}
          <div className={`p-6 rounded-3xl border-2 ${
            winnerId === battle.participant1.id
              ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
              : 'bg-surfaceLight/30 border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={battle.participant1.avatarUrl}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                    {battle.participant1.username}
                  </h3>
                  {winnerId === battle.participant1.id && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider" style={{ fontSize: '12px' }}>
                      Победитель
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white mb-1" style={{ fontSize: '24px' }}>
                  {participant1Percent}%
                </p>
                <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                  {participant1Votes} голосов
                </p>
              </div>
            </div>
            <div className="w-full h-3 bg-surfaceLight rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${participant1Percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Participant 2 Results */}
          <div className={`p-6 rounded-3xl border-2 ${
            winnerId === battle.participant2.id
              ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
              : 'bg-surfaceLight/30 border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={battle.participant2.avatarUrl}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                    {battle.participant2.username}
                  </h3>
                  {winnerId === battle.participant2.id && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider" style={{ fontSize: '12px' }}>
                      Победитель
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white mb-1" style={{ fontSize: '24px' }}>
                  {participant2Percent}%
                </p>
                <p className="text-sm text-muted" style={{ fontSize: '14px' }}>
                  {participant2Votes} голосов
                </p>
              </div>
            </div>
            <div className="w-full h-3 bg-surfaceLight rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${participant2Percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleBack}
          variant="primary"
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
          style={{ minHeight: '56px' }}
        >
          Вернуться к баттлу
        </Button>
      </div>
    </div>
  );
};

