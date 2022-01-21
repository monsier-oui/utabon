<script lang="ts">
  // 型定義
  import type { Song } from '../@types';

  // ストア
  import { provider } from '../store/provider';
  import { yaminabe } from '../store/yaminabe';

  // 変数定義
  export let song: Song;
</script>

{#if $yaminabe}
  <span class="block p-4 text-4xl text-center">
    {song[$provider]}
  </span>
{:else}
  <div class="flex border border-neutral-200 rounded">
    <div class="p-4">
      <span class="block md:text-lg break-words">{song.title}</span>
      <span class="block mt-1 text-sm text-neutral-500">
        {Array.isArray(song.idol) ? song.idol.join(' & ') : song.idol}
      </span>
    </div>
    <dl
      class="grid ml-auto w-2/5 flex-shrink-0 border-l border-neutral-200"
      style="grid-template-columns: repeat(2, auto);">
      {#if $provider === '' || $provider === 'JOY'}
        <dt class="provider p-2 md:px-4">JOY</dt>
        <dd class="provider p-2">{song.JOY || ''}</dd>
      {/if}
      {#if $provider === '' || $provider === 'DAM'}
        <dt class="provider p-2 md:px-4">DAM</dt>
        <dd class="provider p-2">{song.DAM || ''}</dd>
      {/if}
    </dl>
  </div>
{/if}

<style>
  .provider {
    @apply flex items-center border-t border-neutral-200;
  }

  .provider:first-of-type {
    @apply border-t-0;
  }
</style>
