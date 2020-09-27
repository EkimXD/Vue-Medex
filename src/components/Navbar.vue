<template>
  <nav v-if="logged" class="navbar" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="navbar-top">
      <div class="navbar-image">
        <img src="../assets/logo.png" alt />
      </div>
      <router-link class="navbar-item" to="/buscar">
        <i class="fas fa-search navbar-item-icon"></i>
        <div class="navbar-item-text">
          <span v-if="hover">Buscar</span>
        </div>
      </router-link>
      <router-link class="navbar-item" to="/citas">
        <i class="fas fa-clipboard-list navbar-item-icon"></i>
        <div class="navbar-item-text">
          <span v-if="hover">Citas</span>
        </div>
      </router-link>
      <router-link class="navbar-item" to="/pacientes">
        <i class="fas fa-user-friends navbar-item-icon"></i>
        <div class="navbar-item-text">
          <span v-if="hover">Pacientes</span>
        </div>
      </router-link>
    </div>
    <div class="navbar-botton">
      <router-link class="navbar-item" to="/configuracion">
        <i class="fas fa-cogs navbar-item-icon"></i>
        <div class="navbar-item-text">
          <span v-if="hover">Configuracion</span>
        </div>
      </router-link>
      <b-button @click="logout" class="navbar-item btn btn-danger" >
        <i class="fas fa-sign-out-alt padding-top-10"></i>
        <div class="navbar-item-text">
          <span v-if="hover">Salir</span>
        </div>
      </b-button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Navbar",
  data: () => {
    return {
      hover: false,
    };
  },
  computed:{
    ...mapState(["logged"]),
  },
  methods:{
    ...mapMutations(['setLogged']),
    logout(){
      this.setLogged(false, null)
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
$navbar_color: #252525;
$navbar_text_selected:#ffffff;
$navbar_text_hover:#eeeeee;
$navbar_text:#bbbbbb;


@mixin flex-column {
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: $navbar_color;
  @include flex-column;
  align-items: flex-start;
  // position: absolute;
  height: 100%;
  transition: width 2s;

  .navbar-image {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .navbar-top {
    @include flex-column;
    text-align: left;
    margin-top: 10px;
    width: 100%;
  }

  .navbar-botton {
    @include flex-column;
    text-align: left;
    width: 100%;
  }

  .navbar-item {
    font-size: 1.7em;
    padding: 10px;
    display: flex;
    font-weight: bold;
    color: $navbar_text;
    text-decoration: none;
    transition: color 2;

    .navbar-item-text {
      text-align: center;
      flex-grow: 2;
      height: 1.5em;
    }

    .navbar-item-icon{
      padding-top: 5px;
    }
    .padding-top-10{
      padding-top: 7px;
      padding-left: 4px;
    }

    &.router-link-exact-active {
      color: $navbar_text_selected;
    }
  }

  .navbar-item:hover{
    color: $navbar_text_hover;
  }
}
</style>