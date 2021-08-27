const files = import.meta.globEager('./*.svelte');

const modules = new Map();
for (const key in files) {
  const name = key.replace(/(\.\/|\.svelte)/g, '');
  const module = files[key].default;
  modules.set(name, module);
}

export default modules;
