<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RouterViewComponent",
  computed: {
    ...mapState(["login"]),
  },
};
</script>

<style lang="scss">
.container {
  background-color: salmon;
  display: inline;
  position: relative;
  // left: 86px;
  height: 100%;

  #router-view {
    width: -86px;
  }
}
</style>