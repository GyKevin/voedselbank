<style src="./index.css" scoped />

<template>
  <div class="main">
    <div class="bannerBox">
      <!-- <img class="banner" src="~/assets/HomepageBanner.jpg" alt=""> -->
    </div>
    <div class="welcomeMSG">
      <img src="~/assets/Logo.png" alt="Logo" class="homepageLogo">
    <h3>{{ message }}</h3>
    <span class="slogan">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
       Dignissimos nisi sequi nulla delectus esse adipisci quidem modi tempore reprehenderit
        sint itaque assumenda, atque aperiam laudantium quae ad eos repellendus natus.  
    </span>
    </div>
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
    const username = useCookie("user_name");
    console.log(username);
  },
  // actions
  methods: {
    
  },
};
</script>