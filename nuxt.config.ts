// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/styles/index.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  modules: ["@nuxtjs/device", "@nuxt/devtools"],
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
});
