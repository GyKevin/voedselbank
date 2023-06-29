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
      perm: useCookie("Authorization-role")
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
      const auth = useCookie("Authorization");
      const auth_key = useCookie("Authorization-key");
      const auth_role = useCookie("Authorization-role");

      // nuxt will set maxAge to -1 if value is null
      auth.value = null;
      auth_key.value = null;
      auth_role.value = null;

      navigateTo("/auth", { replace: true });
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
            <NuxtLink to="/admin/overzicht/gebruikers" v-if="perm == '0'">Gebruikers overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/gezinnen" v-if="perm == '0'">Gezinnen overzicht</NuxtLink>
            <NuxtLink to="/admin/leveranciers" v-if="perm == '0' || perm == '1'">Leverancieren overzicht</NuxtLink>
            <NuxtLink to="/admin/overzicht/VoedselPakketten"  v-if="perm == '0' || perm == '2'">Voedsel pakketten overzicht</NuxtLink>
          </div>

          <div class="bottomMenu">
            <!-- <NuxtLink to="/auth" class="login" v-if="loggedIn === false">
              <font-awesome-icon :icon="['fass', 'circle-user']" /> Login
            </NuxtLink> -->
            <NuxtLink to="/auth" class="login" @click="logout">
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
