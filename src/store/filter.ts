import { get, writable } from 'svelte/store';

type Filter = {
  tags: string;
  idol: string[];
};

const useStore = () => {
  const { subscribe, set } = writable<Filter>({ tags: '', idol: [] });

  const update = (newFilter: Filter) => {
    const oldFilter: Filter = get(filter);

    set(Object.assign(oldFilter, newFilter));
  };

  const reset = () => set({ tags: '', idol: [] });

  return { subscribe, update, reset };
};

export const filter = useStore();
