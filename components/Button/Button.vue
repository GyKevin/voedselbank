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
  },
};
</script>

<template>
  <button @click="handleClick">
    <font-awesome-icon v-if="icon" :icon="icon" />
    <slot />
  </button>
</template>
