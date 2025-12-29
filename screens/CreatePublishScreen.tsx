'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useBattleCreationStore } from '@/stores/battleCreationStore';
import { DISCIPLINES } from '@/constants';

export const CreatePublishScreen = () => {
  const router = useRouter();
  const { 
    selectedDiscipline, 
    selectedPresetRule, 
    recordedVideoUrl,
    battleTitle,
    battleDescription,
    reset 
  } = useBattleCreationStore();

  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedBattleId, setPublishedBattleId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Получаем информацию о дисциплине
  const disciplineInfo = DISCIPLINES.find(d => d.value === selectedDiscipline);

  const handleBack = () => {
    router.push('/create/preview');
  };

  const handlePublish = async () => {
    if (!selectedDiscipline || !selectedPresetRule || !battleTitle || !recordedVideoUrl) {
      setError('Не все данные заполнены');
      return;
    }

    setIsPublishing(true);
    setError(null);

    try {
      // Симуляция публикации (в реальности здесь будет вызов Hasyx)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // В реальности здесь будет интеграция с Hasyx:
      // const client = useClient();
      // 
      // // 1. Сначала загружаем видео (если нужно отдельно)
      // const videoUploadResult = await uploadVideo(recordedVideoBlob);
      // 
      // // 2. Создаем баттл
      // const result = await client.insert({
      //   table: 'battles',
      //   object: {
      //     discipline: selectedDiscipline,
      //     preset_rule_id: selectedPresetRule.id,
      //     video_url: videoUploadResult.url,
      //     title: battleTitle,
      //     description: battleDescription,
      //     participant1_id: currentUser.id,
      //     status: 'waiting'
      //   },
      //   returning: ['id']
      // });
      // 
      // setPublishedBattleId(result.id);

      // Для демо: симулируем успешную публикацию
      const mockBattleId = `b${Date.now()}`;
      setPublishedBattleId(mockBattleId);
      
      // В реальности новый баттл появится в списке автоматически через Hasyx subscriptions
      // Для демо можно обновить MOCK_BATTLES через отдельную функцию или state management
      setIsPublished(true);
      setIsPublishing(false);

      // Сброс store после успешной публикации
      reset();
    } catch (err: any) {
      console.error('Error publishing battle:', err);
      setError('Не удалось опубликовать баттл. Попробуйте еще раз.');
      setIsPublishing(false);
    }
  };

  const handleViewBattle = () => {
    if (publishedBattleId) {
      router.push(`/battle/${publishedBattleId}`);
    } else {
      router.push('/home');
    }
  };

  const handleCreateAnother = () => {
    reset();
    router.push('/create/discipline');
  };

  if (isPublished) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col pt-6 relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
          >
            <span className="text-5xl">✅</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4 max-w-md"
          >
            <h2 className="text-2xl font-bold text-white">Баттл опубликован!</h2>
            <p className="text-muted text-base">
              Ваш баттл успешно создан и ожидает участников. Вы получите уведомление, когда кто-то примет вызов.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mt-8 space-y-3"
          >
            <Button
              onClick={handleViewBattle}
              variant="primary"
              className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
              style={{ minHeight: '56px' }}
            >
              Перейти к баттлу
            </Button>
            <Button
              onClick={handleCreateAnother}
              variant="outline"
              className="w-full py-3 text-sm font-medium touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              Создать еще
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-xl font-bold text-white">Публикация</h2>
          <p className="text-sm text-muted mt-1">Проверьте данные перед публикацией</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="space-y-6">
          {/* Video Thumbnail */}
          {recordedVideoUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '9/16', maxHeight: '400px' }}>
              <video
                src={recordedVideoUrl}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
            </div>
          )}

          {/* Battle Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Сводка баттла</h3>

            {/* Title */}
            <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
              <p className="text-sm text-muted mb-1">Название</p>
              <p className="text-base font-semibold text-white">{battleTitle || 'Не указано'}</p>
            </div>

            {/* Description */}
            {battleDescription && (
              <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
                <p className="text-sm text-muted mb-1">Описание</p>
                <p className="text-base text-white">{battleDescription}</p>
              </div>
            )}

            {/* Discipline */}
            {disciplineInfo && (
              <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl flex-shrink-0">
                    {disciplineInfo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted mb-1">Дисциплина</p>
                    <p className="text-base font-semibold text-white">{disciplineInfo.label}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Rules */}
            {selectedPresetRule && (
              <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
                <p className="text-sm text-muted mb-1">Правила</p>
                <p className="text-base font-semibold text-white mb-1">{selectedPresetRule.name}</p>
                <p className="text-sm text-muted">{selectedPresetRule.description}</p>
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <p className="text-sm text-accent">{error}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handlePublish}
          variant="primary"
          disabled={isPublishing || !battleTitle || !recordedVideoUrl}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          {isPublishing ? 'Публикация...' : 'Опубликовать баттл'}
        </Button>
      </div>
    </div>
  );
};

