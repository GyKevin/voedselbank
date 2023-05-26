<style src="./layout.css" scoped />
<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
  <div class="main">
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

      <div class="sidebarContent">
        <img class="logo" src="~/assets/Logo.png" />

        <div class="menu">
          <a href="/producten" class="menuItem" data-content="Producten overzicht">Producten overzicht</a>
          <a href="/producten" class="menuItem" data-content="Producten overzicht">Item 2</a>
          <a href="/producten" class="menuItem" data-content="Producten overzicht">Item 3</a>
        </div>

        <div class="bottomMenu">
          <a href="#" class="login"> <font-awesome-icon :icon="['fass', 'circle-user']" /> Login </a>
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
