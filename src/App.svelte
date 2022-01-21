<script lang="ts">
  // コンポーネント
  import Tailwindcss from './components/Tailwindcss.svelte';
  import Controller from './components/Controller.svelte';
  import Item from './components/Item.svelte';

  // ストア
  import { songs } from './store/songs';
</script>

<Tailwindcss />
<main class="container mx-auto">
  <h1 class="text-3xl font-bold">SideM歌本</h1>
  <Controller />

  <div class="mt-8">
    {#if $songs.length > 0}
      <p class="">{$songs.length}曲見つかりました。</p>
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each $songs as song}
          <Item {song} />
        {/each}
      </div>
    {:else}
      <p>曲が見つかりませんでした。</p>
    {/if}
  </div>
</main>
<aside class="container mx-auto mt-16">
  <h2 class="text-xl font-bold">当サイトについて</h2>
  <p class="mt-4">
    デンモクで曲を探すのがめんどうすぎて作りました。シリーズ名やアイドル名を選んでフィルタリングできたり、闇鍋モードで曲番号のみ表示したりできます。もっと使いやすくしたいしまだまだアップデートしたいところはあるけどとりあえず公開します。不具合や番号ミス、誤字などは製作者まで投げていただけると助かります。<br />
    製作者:
    <a href="https://twitter.com/oui_" target="_blank" class="underline">
      @oui_
    </a>
  </p>

  <h2 class="mt-8 text-xl font-bold">プライバシーポリシー</h2>
  <p class="mt-4">
    当サイトでは、ユーザの訪問状況把握のためにGoogleアナリティクスを利用しています。Googleアナリティクスはトラフィックデータ収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を識別できる情報は含まれません。この機能はCookieを無効にすることで拒否することができます。お使いのブラウザの設定を確認してください。
  </p>

  <h2 class="mt-8 text-xl font-bold">免責事項</h2>
  <p class="mt-4">
    当サイトに掲載された内容によって生じた損害等に対しては一切の責任を負いかねます。ご了承ください。
  </p>
</aside>
