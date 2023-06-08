<style src="./index.css" scoped />

<template>
  <div class="main">
    <div class="bannerBox">
      <!-- <img class="banner" src="~/assets/HomepageBanner.jpg" alt=""> -->
    </div>
    <div class="welcomeMSG">
      <img src="~/assets/Logo.png" alt="Logo" class="homepageLogo">
    <h3 v-if="loggedIn === false">Welkom!</h3>
    <h3 v-if="loggedIn === true">Welkom, {{ username }}!</h3>
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
      username: useCookie("username"),
      loggedIn: false,
    };
  },
  mounted() {
    const username = useCookie("username");
    console.log(username.value);
    const cookieStatus = document.cookie.includes('user_id');
      if(cookieStatus) {
        this.loggedIn = true;
      }
  },
  // actions
  methods: {
    
  },
};
</script>