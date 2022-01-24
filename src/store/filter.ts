import { writable } from 'svelte/store';

type Filter = {
  tags: string;
  idol: string[];
};

const useStore = () => {
  const { subscribe, set } = writable<Filter>({ tags: '', idol: [] });
  const reset = () => set({ tags: '', idol: [] });

  return { subscribe, set, reset };
};

export const filter = useStore();
