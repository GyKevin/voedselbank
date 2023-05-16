<style src="./layout.css" scoped />

<script>
export default {
  data() {
    return {
      bool: true,
      name: "test",
    };
  },
};
</script>

<template>
  <div class="container">
    <slot />
  </div>
</template>
