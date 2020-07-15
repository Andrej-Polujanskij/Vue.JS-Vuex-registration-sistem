<template>
  <div id="app">
    <div class="container">
      <!-- <div id="nav"> -->
        <!-- <router-link to="/">Home</router-link> | -->
        <!-- <router-link to="/Registration">Registration</router-link> -->
      <!-- </div> -->
      <router-view/>
      </div>
  </div>
</template>

<style lang="scss">
body{
  margin: 0;
}
#app {
  background: url(assets/bg-image.jpg) no-repeat scroll center center;
  background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: auto;
}
.container{
  max-width: 1280px;
  margin: 0 auto;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 24px;;

    &.router-link-exact-active {
      color: #fff;
    }
  }
}
</style>
