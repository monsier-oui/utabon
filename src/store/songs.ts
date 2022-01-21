import { writable } from 'svelte/store';
import type { Song } from '../@types';

export const songs = writable<Song[]>([]);
