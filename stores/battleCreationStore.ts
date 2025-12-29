import { create } from 'zustand';
import { Discipline, PresetRule } from '@/types';

interface BattleCreationState {
  selectedDiscipline?: Discipline;
  selectedPresetRule?: PresetRule;
  recordedVideoBlob?: Blob;
  recordedVideoUrl?: string;
  battleTitle?: string;
  battleDescription?: string;
  
  // Actions
  setDiscipline: (discipline: Discipline) => void;
  setPresetRule: (rule: PresetRule) => void;
  setRecordedVideo: (blob: Blob, url: string) => void;
  setBattleMetadata: (title: string, description?: string) => void;
  reset: () => void;
}

export const useBattleCreationStore = create<BattleCreationState>((set) => ({
  selectedDiscipline: undefined,
  selectedPresetRule: undefined,
  recordedVideoBlob: undefined,
  recordedVideoUrl: undefined,
  battleTitle: undefined,
  battleDescription: undefined,
  
  setDiscipline: (discipline: Discipline) => set({ selectedDiscipline: discipline }),
  setPresetRule: (rule: PresetRule) => set({ selectedPresetRule: rule }),
  setRecordedVideo: (blob: Blob, url: string) => set({ 
    recordedVideoBlob: blob, 
    recordedVideoUrl: url 
  }),
  setBattleMetadata: (title: string, description?: string) => set({ 
    battleTitle: title, 
    battleDescription: description 
  }),
  reset: () => set({
    selectedDiscipline: undefined,
    selectedPresetRule: undefined,
    recordedVideoBlob: undefined,
    recordedVideoUrl: undefined,
    battleTitle: undefined,
    battleDescription: undefined,
  }),
}));

