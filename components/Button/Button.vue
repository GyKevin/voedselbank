<style src="./Button.css" scoped />

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
</script>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  props: {
    icon: {
      type: Array,
      required: false,
    },
  },
};
</script>

<template>
  <button @click="handleClick">
    <font-awesome-icon v-if="icon" :icon="icon" />
    <slot />
  </button>
</template>
