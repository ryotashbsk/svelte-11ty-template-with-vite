<script>
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  console.log($$props);

  const init = () => {};
</script>

<svelte:window on:load={init} />

<Header />
<main>
  <slot />
</main>
<Footer />
