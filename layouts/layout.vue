<style src="./layout.module.css" scoped />

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
  <div
    :class="{
      name: bool,
    }"
  >
    <slot />
  </div>
</template>
