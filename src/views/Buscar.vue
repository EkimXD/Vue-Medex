<template>
  <div class="big-window" v-if="logged">
    <Jumbotron />
    <BuscarPacientes />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Jumbotron from "../components/Jumbotron";
import BuscarPacientes from "../components/BuscarPacientes";

export default {
  computed: {
    ...mapState(["logged"]),
  },
  components: {
    Jumbotron,
    BuscarPacientes,
  },
};
</script>


<style lang="scss" scoped>
.big-window{
    height: 100%;
    overflow: hidden;;
}
</style>