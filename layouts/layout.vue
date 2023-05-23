<style src="./layout.css" scoped />

<script>
import { clsx } from "clsx";

export default {
  // setup
  setup() {
    return { clsx };
  },
  // state
  data() {
    return {
      menuOpen: true,
    };
  },
  // actions
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<template>
  <div class="header"></div>
  <div>
    <div :class="clsx('sidebar', menuOpen && 'open', !menuOpen && 'closed')"></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
