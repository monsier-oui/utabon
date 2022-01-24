import { get } from 'svelte/store';

import App from './App.svelte';

// 型定義
import type { Song } from './@types/';

// ストア
import { songs } from './store/songs';

// データベース取得
const songsData: Song[] = get(songs);
const tags: string[] = Array.from(
  new Set(
    songsData
      .filter((song: Song) => song.tags)
      .map((song: Song) => song.tags)
      .flat()
  )
);
import idolsYaml from './database/idols.yaml';
const idols: string[] = Array.from(
  new Set(
    Object.values(idolsYaml)
      .map((value) => Object.values(value))
      .flat()
      .concat(
        songsData
          .filter((song: Song) => song.idol)
          .map((song: Song) => song.idol)
          .flat()
      )
  )
);

const app = new App({
  target: document.body,
  props: {
    tags: tags,
    idols,
  },
});

export default app;
