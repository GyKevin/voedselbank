<style src="./Button.css" scoped />

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
    size: {
      type: String,
      required: false,
      default: "normal",
    },
  },
};
</script>

<template>
  <button @click="handleClick" :class="{ small: size === 'small' }">
    <font-awesome-icon v-if="icon" :icon="icon" />
    <slot />
  </button>
</template>
