<script>
  import Layout from '@components/Layout.svelte';
  import Img from '@images/svelte.png';

  const getImg = (name) => {
    const path = `../../images/${name}`;
    const modules = import.meta.globEager('../../images/*');
    return modules[path].default;
  };
</script>

<Layout {...$$props}>
  <div class="test">
    <p>Import image as component.</p>
    <img src={Img} alt="" />

    <hr />

    <p>Import image from url.</p>
    <img src="https://source.unsplash.com/random?animals" alt="" />

    <hr />

    <p>Import image from url with variable.</p>
    <img src={getImg('svelte.png')} alt="" />
  </div>
</Layout>
