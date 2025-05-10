import { create } from "zustand";

type SetCounter = {
  currentCount: number;
  maxUsageCount: number;
};

export type PromptState = {
  count: number | null;
  maxUsageCount: number;
};

export type PromptAction = {
  increaseCount: () => void;
  setCounter: (args: SetCounter) => void;
};

export type PromptStore = PromptState & PromptAction;

export const useRecipeStore = create<PromptStore>()((set) => ({
  count: null,
  maxUsageCount: 10,
  increaseCount: () =>
    set((state: any) => ({
      count: state.count + 1,
      maxUsageCount: state.maxUsageCount,
    })),
  setCounter: ({ currentCount, maxUsageCount }) =>
    set((state: any) => ({
      count: currentCount,
      maxUsageCount: maxUsageCount,
    })),
}));

export const useMealPlanStore = create<PromptStore>()((set) => ({
  count: null,
  maxUsageCount: 10,
  increaseCount: () =>
    set((state: any) => ({
      count: state.count + 1,
      maxUsageCount: state.maxUsageCount,
    })),
  setCounter: ({ currentCount, maxUsageCount }) =>
    set((state: any) => ({
      count: currentCount,
      maxUsageCount: maxUsageCount,
    })),
}));
