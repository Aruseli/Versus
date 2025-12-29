'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useBattleCreationStore } from '@/stores/battleCreationStore';
import { PRESET_RULES } from '@/constants';
import { PresetRule } from '@/types';

export const CreatePresetRulesScreen = () => {
  const router = useRouter();
  const { selectedDiscipline, selectedPresetRule, setPresetRule } = useBattleCreationStore();

  const handleBack = () => {
    router.push('/create/discipline');
  };

  const handleContinue = () => {
    if (selectedPresetRule) {
      router.push('/create/record');
    }
  };

  const handleRuleSelect = (rule: PresetRule) => {
    setPresetRule(rule);
  };

  // Фильтруем правила по выбранной дисциплине
  const filteredRules = selectedDiscipline
    ? PRESET_RULES.filter(rule => rule.discipline === selectedDiscipline)
    : [];

  // Получаем название дисциплины для отображения
  const disciplineName = selectedDiscipline || '';

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
          <h2 className="text-xl font-bold text-white mb-1">Выберите правила</h2>
          <p className="text-sm text-muted">Выберите готовые правила для баттла</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        {!selectedDiscipline ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted text-lg mb-4">Сначала выберите дисциплину</p>
            <Button onClick={handleBack} variant="primary">
              Вернуться к выбору дисциплины
            </Button>
          </div>
        ) : filteredRules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted text-lg mb-4">Нет доступных правил для этой дисциплины</p>
            <Button onClick={handleBack} variant="primary">
              Вернуться к выбору дисциплины
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRules.map((rule) => {
              const isSelected = selectedPresetRule?.id === rule.id;
              return (
                <motion.button
                  key={rule.id}
                  onClick={() => handleRuleSelect(rule)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                      : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                  }`}
                  style={{ minHeight: '100px' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1" style={{ fontSize: '18px' }}>
                        {rule.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed" style={{ fontSize: '16px' }}>
                        {rule.description}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleContinue}
          variant="primary"
          disabled={!selectedPresetRule}
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '56px' }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

