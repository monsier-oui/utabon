import { writable } from 'svelte/store';

type Filter = {
  tags: string;
  idol: string[];
};

export const filter = writable<Filter>({ tags: '', idol: [] });
