<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="container">
    <nav class="teal">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Mylish</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  font-size: 20px;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  margin-bottom: 1.0rem;
}

.nav-wrapper {
  margin-left: 1.0rem;
}
</style>
