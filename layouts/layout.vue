<style src="./layout.css" scoped />

<script>
export default {
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

// if (Window.innerWidth <= 800) toggleMenu();
</script>

<template>
  <div class="container">
    <div class="content">
      <slot />
    </div>
  </div>
</template>
