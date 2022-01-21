<script lang="ts">
  // コンポーネント
  import Tailwindcss from './components/Tailwindcss.svelte';
  import Controller from './components/Controller.svelte';
  import Item from './components/Item.svelte';

  // ストア
  import { songs } from './store/songs';

  // 変数定義
  export const title = 'SideM歌本';
  export const url: string = location.href;
</script>

<Tailwindcss />
<header class="container mx-auto flex items-center">
  <h1 class="text-3xl font-bold">{title}</h1>
  <a
    href="https://twitter.com/share?text={title}&url={url}&hashtags={title}"
    class="inline-flex items-center ml-auto py-1 px-3 text-white text-sm font-bold bg-twitter rounded-full"
    target="_blank">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      viewBox="0 0 400 400"
      class="mr-1 w-5 h-5">
      <path
        fill="#fff"
        d="M153.6 301.6c94.3 0 145.9-78.2 145.9-145.9 0-2.2 0-4.4-.1-6.6 10-7.2 18.7-16.3 25.6-26.6-9.2 4.1-19.1 6.8-29.5 8.1 10.6-6.3 18.7-16.4 22.6-28.4-9.9 5.9-20.9 10.1-32.6 12.4-9.4-10-22.7-16.2-37.4-16.2-28.3 0-51.3 23-51.3 51.3 0 4 .5 7.9 1.3 11.7-42.6-2.1-80.4-22.6-105.7-53.6-4.4 7.6-6.9 16.4-6.9 25.8 0 17.8 9.1 33.5 22.8 42.7-8.4-.3-16.3-2.6-23.2-6.4v.7c0 24.8 17.7 45.6 41.1 50.3-4.3 1.2-8.8 1.8-13.5 1.8-3.3 0-6.5-.3-9.6-.9 6.5 20.4 25.5 35.2 47.9 35.6-17.6 13.8-39.7 22-63.7 22-4.1 0-8.2-.2-12.2-.7 22.6 14.4 49.6 22.9 78.5 22.9" />
    </svg>
    Tweet
  </a>
  <a
    href="https://github.com/monsier-oui/utabon"
    class="ml-2 sm:hidden"
    target="_blank">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43.427"
      height="42.369"
      viewBox="0 0 32.58 31.77"
      class="w-8">
      <path
        d="M16.29 0a16.29 16.29 0 0 0-5.15 31.75c.82.15 1.11-.36 1.11-.79v-2.77C7.7 29.18 6.74 26 6.74 26a4.36 4.36 0 0 0-1.81-2.39c-1.47-1 .12-1 .12-1a3.43 3.43 0 0 1 2.49 1.68 3.48 3.48 0 0 0 4.74 1.36 3.46 3.46 0 0 1 1-2.18c-3.62-.41-7.42-1.81-7.42-8a6.3 6.3 0 0 1 1.67-4.37 5.94 5.94 0 0 1 .16-4.31s1.37-.44 4.48 1.67a15.41 15.41 0 0 1 8.16 0c3.11-2.11 4.47-1.67 4.47-1.67a5.91 5.91 0 0 1 .2 4.28 6.3 6.3 0 0 1 1.67 4.37c0 6.26-3.81 7.63-7.44 8a3.85 3.85 0 0 1 1.11 3v4.47c0 .53.29.94 1.12.78A16.29 16.29 0 0 0 16.29 0Z" />
    </svg>
  </a>
</header>
<main class="container mx-auto">
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
