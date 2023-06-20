<style src="./index.css" scoped />

<template>
  <div class="main">
    <img src="~/assets/Logo.png" alt="">
    <h2>{{ message }}</h2>
    <span class="slogan">
      Voor een gezonde toekomst: voeding, kansen en solidariteit
    </span>
  </div>
</template>

<script>
export default {
  // state
  data() {
    return {
      name: ["kevin", "anton", "thijn", "wiljan"],
      message: ""
    };
  },
  mounted() {
    const  randomIndex = Math.floor(Math.random() * this.name.length);
    this.message = `Welkom, ${this.name[randomIndex]}!`;
  },
  // actions
  methods: {
    
  },
};
</script>