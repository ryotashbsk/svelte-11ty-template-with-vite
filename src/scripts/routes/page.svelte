<script>
  import Layout from '@components/Layout.svelte';
  const pageName = 'page';
</script>

<Layout {...$$props}>
  <h1 class="test">pageName:{pageName}</h1>
</Layout>
