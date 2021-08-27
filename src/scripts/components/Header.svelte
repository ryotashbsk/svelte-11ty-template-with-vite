<script>
  const init = () => {
    console.log('header');
  };
</script>

<svelte:window on:load={init} />

<header>
  <p>header</p>
  <ul>
    <li><a href="/">top</a></li>
    <li><a href="/page">page</a></li>
  </ul>
</header>
