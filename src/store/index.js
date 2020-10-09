import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { db } from "../firebase";

export default new Vuex.Store({
  state: {
    logged:false,
    user:null,
    form: {
      nombre: "",
      apellido: "",
      ciudad: "",
      telefono: "",
    }
  },
  mutations: {
    setLogged(state, value, user){
      state.logged=value;
      state.user=user;
    }
  },
  actions: {
  },
  modules: {
  }
})
