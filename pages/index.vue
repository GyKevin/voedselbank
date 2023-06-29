<style src="./index.css" scoped />

<template>
  <div class="main">
    <div class="bannerBox">
      <!-- <img class="banner" src="~/assets/HomepageBanner.jpg" alt=""> -->
    </div>
    <div class="welcomeMSG">
      <img src="~/assets/Logo.png" alt="Logo" class="homepageLogo">
    <h3 class="welkom">Welkom, {{ username }}!</h3>
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
      // slice first to @ in email
      username: useCookie("Authorization-name"),
      loggedIn: false,
    };
  },
  mounted() {
  },
  // actions
  methods: {
    
  },
};
</script>         

<style scoped>
.welcomeMSG {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
}

.welkom {
  white-space: nowrap;
}
</style>