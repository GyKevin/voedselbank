<style src="./layout.css" scoped />
<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { isDesktop } = useDevice();
</script>

<script>
/* import specific icons */
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronLeft, faCircleUser);

export default {
  // state
  data() {
    return {
      menuOpen: this.$device.isDesktop,
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
  <div class="container">
    <div
      :class="{
        sidebar: true,
        sidebarClosed: !menuOpen,
      }"
    >
      <button
        @click="toggleMenu"
        :class="{
          menuButton: true,
          menuOff: !menuOpen,
        }"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>

      <div class="sidebarContainer">
        <div class="logoContainer">
          <img class="logo" src="~/assets/Logo.png" />
        </div>

        <div class="sidebarMenu">
          <div class="menu">
            <a href="/">Home</a>
            <a href="/producten">Producten overzicht</a>
            <a href="/admin/overzicht/gebruikers">Gebruikers overzicht</a>
            <a href="/producten">Item 4</a>
          </div>

          <div class="bottomMenu">
            <a href="#" class="login"> <font-awesome-icon :icon="['fass', 'circle-user']" /> Login </a>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>
