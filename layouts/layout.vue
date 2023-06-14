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
      menuOpen: this.$device.isDesktop,
      loggedIn: false,
    };
  },
  mounted() {
    const cookieStatus = document.cookie.includes("user_id");
    if (cookieStatus) {
      this.loggedIn = true;
    }
  },
  // actions
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.loggedIn = false;
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
        <div class="logoContainer" @click="() => navigateTo('/', { replace: true })">
          <img class="logo" src="~/assets/Logo.png" />
        </div>

        <div class="sidebarMenu">
          <div class="menu">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/producten">Producten overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/gebruikers">Gebruikers overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/gezinnen">Gezinnen overzicht</NuxtLink>
            <NuxtLink to="/admin/leveranciers">Leverancieren overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/GemaakteVoedselPakketten">Gemaakte voedsel- pakketten overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/VoedselPakketten">Voedsel pakketten overzicht</NuxtLink>
          </div>

          <div class="bottomMenu">
            <NuxtLink to="/login" class="login" v-if="loggedIn === false">
              <font-awesome-icon :icon="['fass', 'circle-user']" /> Login
            </NuxtLink>
            <NuxtLink to="/login" class="login" v-if="loggedIn === true" @click="logout">
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /> Logout
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>
