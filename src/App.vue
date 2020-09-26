<template>
  <div id="app">
    <Navbar />
    <div id="router">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import RouterViewComponent from "@/components/RouterViewComponent";

export default {
  name: "App",
  components: {
    Navbar,
    RouterViewComponent,
  },
};
</script>

<style lang="scss">

$navbar_color: #252525;

html,
body {
  // margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-wrap: wrap;
  height: 100%;

  #router{
    flex: 1;
  }
}
</style>
