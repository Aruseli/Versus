'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { DISCIPLINES } from '@/constants';
import { Discipline } from '@/types';

export const RankingFilteredScreen = () => {
  const router = useRouter();
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>([]);
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [selectedWeightCategory, setSelectedWeightCategory] = useState<string>('all');

  const handleBack = () => {
    router.back();
  };

  const toggleDiscipline = (discipline: Discipline) => {
    setSelectedDisciplines(prev =>
      prev.includes(discipline)
        ? prev.filter(d => d !== discipline)
        : [...prev, discipline]
    );
  };

  const handleApply = () => {
    // Применить фильтры и вернуться назад
    router.back();
  };

  const clearFilters = () => {
    setSelectedDisciplines([]);
    setSelectedGender('all');
    setSelectedWeightCategory('all');
  };

  const hasActiveFilters = selectedDisciplines.length > 0 || selectedGender !== 'all' || selectedWeightCategory !== 'all';

  const weightCategories = [
    { value: 'all', label: 'Все категории' },
    { value: 'light', label: 'Легкий вес' },
    { value: 'middle', label: 'Средний вес' },
    { value: 'heavy', label: 'Тяжелый вес' },
    { value: 'open', label: 'Абсолютная' },
  ];

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
          <h2 className="text-xl font-bold text-white">Фильтры рейтинга</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary font-medium touch-manipulation px-3 py-2"
            style={{ minHeight: '44px' }}
          >
            Очистить
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 relative z-10">
        {/* Disciplines */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Дисциплины</h3>
          <div className="flex flex-col gap-2">
            {DISCIPLINES.map((discipline) => {
              const isSelected = selectedDisciplines.includes(discipline.value);
              return (
                <button
                  key={discipline.value}
                  onClick={() => toggleDiscipline(discipline.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                      : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                  }`}
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{discipline.icon}</span>
                      <span className="text-base font-medium text-white" style={{ fontSize: '16px' }}>
                        {discipline.label}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Пол</h3>
          <div className="flex flex-col gap-2">
            {(['all', 'male', 'female'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                  selectedGender === gender
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                }`}
                style={{ minHeight: '56px' }}
              >
                <span className="text-base font-medium text-white" style={{ fontSize: '16px' }}>
                  {gender === 'all' ? 'Все' : gender === 'male' ? 'Мужской' : 'Женский'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Weight Category */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ fontSize: '16px' }}>Весовая категория</h3>
          <div className="flex flex-col gap-2">
            {weightCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedWeightCategory(category.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all touch-manipulation text-left ${
                  selectedWeightCategory === category.value
                    ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                    : 'bg-surfaceLight/30 border-white/5 hover:border-white/10'
                }`}
                style={{ minHeight: '56px' }}
              >
                <span className="text-base font-medium text-white" style={{ fontSize: '16px' }}>
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-background via-background to-transparent" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <Button
          onClick={handleApply}
          variant="primary"
          className="w-full py-4 text-base font-semibold shadow-lg shadow-primary/30 touch-manipulation"
          style={{ minHeight: '56px' }}
        >
          Применить фильтры
        </Button>
      </div>
    </div>
  );
};

