import { get, writable } from 'svelte/store';
import arrayShuffle from 'array-shuffle';

import type { Song } from '../@types';

import { provider } from './provider';
import { filter } from './filter';

import songsYaml from '../database/songs.yaml';
const songsData: Song[] = Object.values(songsYaml);

const useStore = () => {
  const { subscribe, set } = writable<Song[]>(songsData);

  const update = () => {
    let result = songsData;

    if (get(provider) !== '') {
      result = result.filter((song: Song) => song[get(provider)] !== null);
    }

    const tags: string = get(filter).tags;
    if (tags !== '') {
      result = result.filter(
        (song: Song) => song.tags && song.tags.includes(tags)
      );
    }

    const idol: string[] = get(filter).idol;
    if (idol.length > 0) {
      result = result.filter((song: Song) => {
        const x = idol.concat(song.idol);
        const y = Array.from(new Set(x));

        return x.length !== y.length;
      });
    }

    set(result);
  };

  const random = (n) => {
    let result = [...songsData];
    if (get(provider) !== '') {
      result = result.filter((song: Song) => song[get(provider)] !== null);
    }
    const shuffled = arrayShuffle(result);
    set(shuffled.splice(0, n));
  };

  return { subscribe, set, update, random };
};

export const songs = useStore();
