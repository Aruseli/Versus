'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { Input } from '@/components/Input';
import { useBattleCreationStore } from '@/stores/battleCreationStore';
import { DISCIPLINES } from '@/constants';

export const CreatePreviewScreen = () => {
  const router = useRouter();
  const { 
    selectedDiscipline, 
    selectedPresetRule, 
    recordedVideoUrl, 
    battleTitle,
    battleDescription,
    setBattleMetadata 
  } = useBattleCreationStore();

  const [title, setTitle] = useState(battleTitle || '');
  const [description, setDescription] = useState(battleDescription || '');
  const [titleError, setTitleError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Получаем название дисциплины
  const disciplineInfo = DISCIPLINES.find(d => d.value === selectedDiscipline);

  const handleBack = () => {
    router.push('/create/record');
  };

  const handleRetake = () => {
    router.push('/create/record');
  };

  const handleContinue = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    
    setBattleMetadata(title.trim(), description.trim() || undefined);
    router.push('/create/publish');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError && e.target.value.trim()) {
      setTitleError(false);
    }
  };

  // Автовоспроизведение видео при загрузке
  useEffect(() => {
    if (videoRef.current && recordedVideoUrl) {
      videoRef.current.load();
    }
  }, [recordedVideoUrl]);

  if (!recordedVideoUrl) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center px-6">
        <p className="text-muted text-lg mb-4">Видео не найдено</p>
        <Button onClick={handleBack} variant="primary">
          Вернуться к записи
        </Button>
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
          <h2 className="text-xl font-bold text-white">Предпросмотр</h2>
          <p className="text-sm text-muted mt-1">Проверьте видео и заполните информацию</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
            <video
              ref={videoRef}
              src={recordedVideoUrl}
              controls
              className="w-full h-full object-contain"
              playsInline
            />
          </div>

          {/* Discipline and Rule Info */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">
                  {disciplineInfo?.icon || '💪'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted mb-1">Дисциплина</p>
                  <p className="text-base font-semibold text-white">{disciplineInfo?.label || selectedDiscipline}</p>
                </div>
              </div>
            </div>

            {selectedPresetRule && (
              <div className="p-4 rounded-2xl bg-surfaceLight/30 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted mb-1">Правила</p>
                    <p className="text-base font-semibold text-white mb-1">{selectedPresetRule.name}</p>
                    <p className="text-sm text-muted">{selectedPresetRule.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metadata Form */}
          <div className="space-y-4">
            <div>
              <Input
                label="Название баттла *"
                value={title}
                onChange={handleTitleChange}
                placeholder="Введите название баттла"
                error={titleError}
                errorMessage={titleError ? 'Название обязательно для заполнения' : undefined}
                size="lg"
                variant="default"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                Описание (опционально)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Добавьте описание баттла..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-surfaceLight/50 backdrop-blur-sm border border-white/5 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none touch-manipulation"
                style={{ 
                  fontSize: '16px', // Предотвращает zoom на iOS
                  minHeight: '100px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent space-y-3" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleContinue}
          variant="primary"
          disabled={!title.trim()}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          Далее
        </Button>
        <Button
          onClick={handleRetake}
          variant="outline"
          className="w-full py-3 text-sm font-medium touch-manipulation"
          style={{ minHeight: '44px' }}
        >
          Перезаписать видео
        </Button>
      </div>
    </div>
  );
};

