import { create } from 'zustand';

type State = {
  user: any;
  generations: any[];
  stats: any[];
  streak: { current: number; fire_visible: boolean };
  setUser: (user: any) => void;
  setGenerations: (gens: any[]) => void;
  setStats: (stats: any[]) => void;
  setStreak: (streak: any) => void;
};

export const useAppStore = create<State>((set) => ({
  user: null,
  generations: [],
  stats: [],
  streak: { current: 0, fire_visible: false },
  setUser: (user) => set({ user }),
  setGenerations: (gens) => set({ generations: gens }),
  setStats: (stats) => set({ stats }),
  setStreak: (streak) => set({ streak }),
}));
