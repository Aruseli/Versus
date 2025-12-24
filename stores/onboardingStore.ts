import { create } from 'zustand';
import { Discipline, Level } from '@/types';

interface OnboardingState {
  selectedDisciplines: Discipline[];
  selectedLevel?: Level;
  hasAcceptedRules: boolean;
  permissionsGranted: boolean;
  
  // Actions
  setDisciplines: (disciplines: Discipline[]) => void;
  toggleDiscipline: (discipline: Discipline) => void;
  setLevel: (level: Level) => void;
  setAcceptedRules: (accepted: boolean) => void;
  setPermissionsGranted: (granted: boolean) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set: (partial: Partial<OnboardingState> | ((state: OnboardingState) => Partial<OnboardingState>)) => void) => ({
  selectedDisciplines: [],
  selectedLevel: undefined,
  hasAcceptedRules: false,
  permissionsGranted: false,
  
  setDisciplines: (disciplines: Discipline[]) => set({ selectedDisciplines: disciplines }),
  toggleDiscipline: (discipline: Discipline) => set((state: OnboardingState) => ({
    selectedDisciplines: state.selectedDisciplines.includes(discipline)
      ? state.selectedDisciplines.filter((d: Discipline) => d !== discipline)
      : [...state.selectedDisciplines, discipline]
  })),
  setLevel: (level: Level) => set({ selectedLevel: level }),
  setAcceptedRules: (accepted: boolean) => set({ hasAcceptedRules: accepted }),
  setPermissionsGranted: (granted: boolean) => set({ permissionsGranted: granted }),
  reset: () => set({
    selectedDisciplines: [],
    selectedLevel: undefined,
    hasAcceptedRules: false,
    permissionsGranted: false,
  }),
}));

