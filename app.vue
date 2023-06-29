<template>
  <div v-if="loading" id="loading">
    <div class="loading-bar">
    </div>
  </div>
  <NuxtLayout name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>

export default {
  data() {
    return {
      loading: ref(true),
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 200);
    });
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
  },
}
</script>

<style scoped>
#loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
}
.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #000;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>