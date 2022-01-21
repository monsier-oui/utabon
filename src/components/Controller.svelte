<script lang="ts">
  import { onMount } from 'svelte';
  import shuffle from 'shuffle-array';

  // 型定義
  import type { Song } from '../@types/';

  // データベース取得
  import songsYaml from '../database/songs.yaml';
  const songsData: Song[] = Object.values(songsYaml);
  const tags: string[] = Array.from(
    new Set(
      songsData
        .filter((song: Song) => song.tags)
        .map((song: Song) => song.tags)
        .flat()
    )
  );
  import idolsYaml from '../database/idols.yaml';
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

  // ストア
  import { provider } from '../store/provider';
  import { yaminabe } from '../store/yaminabe';
  import { songs } from '../store/songs';
  import { filter } from '../store/filter';

  // 機種切り替え
  const toggleProvider = (event) => {
    provider.set(event.currentTarget.value);
    getSongs();
  };

  // 闇鍋モード切り替え
  const toggleYaminabe = (event) => {
    yaminabe.set(event.currentTarget.checked);
  };

  // フィルター変更
  const changeFilter = (event) => {
    let tags: string = $filter.tags;
    let idol: string[] = $filter.idol;

    if (event.currentTarget.name === 'tags') {
      if (event.currentTarget.checked) {
        tags = event.currentTarget.value;
      } else {
        tags = '';
      }
    } else if (event.currentTarget.name === 'idol') {
      if (event.currentTarget.checked) {
        idol.push(event.currentTarget.value);
      } else {
        idol = idol.filter((n) => n !== event.currentTarget.value);
      }
    }

    filter.set(Object.assign($filter, { tags, idol }));
    getSongs();
  };

  // 絞り込み
  const getSongs = () => {
    let result = songsData;
    $songs = [];

    if ($provider !== '') {
      result = result.filter((song: Song) => song[$provider] !== null);
    }
    if ($filter.tags !== '') {
      result = result.filter(
        (song: Song) => song.tags && song.tags.includes($filter.tags)
      );
    }
    if ($filter.idol.length > 0) {
      result = result.filter((song: Song) => {
        const x = $filter.idol.concat(song.idol);
        const y = Array.from(new Set(x));

        return x.length !== y.length;
      });
    }

    $songs = result;
  };

  // ランダム
  const random = () => {
    let result = songsData;
    if ($provider !== '') {
      result = result.filter((song: Song) => song[$provider] !== null);
    }
    $songs = shuffle.pick(result, { copy: true, picks: 10 });
  };

  // リセット
  const reset = () => {
    $songs = songsData;
    $filter = { tags: '', idol: [] };
  };

  onMount(async () => {
    getSongs();
  });
</script>

<div class="mt-4 flex">
  <label class="cursor-pointer">
    <input
      type="radio"
      name="provider"
      value="JOY"
      on:change={toggleProvider}
      checked={$provider === 'JOY'}
      class="mr-2" />JOY
  </label>
  <label class="ml-3 cursor-pointer">
    <input
      type="radio"
      name="provider"
      value="DAM"
      on:change={toggleProvider}
      checked={$provider === 'DAM'}
      class="mr-2" />DAM
  </label>
  <label class="ml-auto cursor-pointer">
    <input
      type="checkbox"
      value=""
      on:change={toggleYaminabe}
      checked={$yaminabe}
      disabled={$provider === ''}
      class="mr-2" />闇鍋モード
  </label>
</div>
<ul class="filter mt-4 flex flex-wrap gap-y-1 gap-x-2">
  {#each tags as tag}
    <label
      class="relative py-1 text-sm cursor-pointer"
      class:selected={$filter.tags === tag}>
      <input
        type="checkbox"
        name="tags"
        value={tag}
        on:change={changeFilter}
        checked={$filter.tags === tag}
        class="absolute opacity-0" />#{tag}
    </label>
  {/each}
  {#each idols as idol}
    <label
      class="relative py-1 text-sm cursor-pointer"
      class:selected={$filter.idol.includes(idol)}>
      <input
        type="checkbox"
        name="idol"
        value={idol}
        on:change={changeFilter}
        checked={$filter.idol.includes(idol)}
        class="absolute opacity-0" />#{idol}
    </label>
  {/each}
</ul>
<div class="mt-3 flex flex-wrap gap-2">
  <button
    class="py-1 px-3 text-white text-sm font-bold bg-sky-500 rounded-full"
    on:click={random}>
    ランダム10連
  </button>
  <button
    class="py-1 px-3 text-white text-sm font-bold bg-sky-500 rounded-full"
    on:click={reset}>
    リセット
  </button>
</div>

<style>
  input[type='radio'],
  input[type='checkbox'] {
    cursor: inherit;
  }

  .filter {
    max-height: 40vh;
    overflow: auto;
    background: linear-gradient(#fff 30%, hsla(0, 0%, 100%, 0)),
      linear-gradient(hsla(0, 0%, 100%, 0), #fff 70%) 0 100%,
      radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), transparent),
      radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.2),
          transparent
        )
        0 100%;
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
    background-attachment: local, local, scroll, scroll;
  }

  .selected {
    background: linear-gradient(transparent 60%, theme('colors.sky.300') 0);
  }
</style>
