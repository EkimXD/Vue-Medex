<template>
  <div class="card">
    <h1 class="text_color">Ingreso</h1>
    <b-alert v-if="alert" variant="danger" show
      >Usuario o contrasena incorrecto</b-alert
    >

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Usuario:"
        label-for="input-1"
        class="text-left text_color"
        description="Ingresa tu usuario."
      >
        <b-form-input
          id="input-1"
          v-model="form.user"
          type="text"
          required
          placeholder="Usuario"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Contrasena:"
        class="text-left text_color"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          type="password"
          placeholder="Contrasena"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Ingresar</b-button>
      <b-button type="reset" variant="danger">Borrar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { db } from "../firebase";

export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      alert: false,
    };
  },
  methods: {
    ...mapMutations(["setLogged"]),
    onSubmit(evt) {
      evt.preventDefault();
      const userFirebase = db.collection("usuario");
      userFirebase
        .where("usuario", "==", this.form.user)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            this.alert = true;
          } else {
            let users = [];
            snapshot.forEach((doc) => {
              users.push(doc.data());
            });
            if (
              users[0].usuario == this.form.user &&
              users[0].contrasena == this.form.password
            ) {
              this.setLogged(true, users[0]);
              this.$router.push("/buscar");
            } else {
              this.alert = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.validateUser();
      this.form.user = "";
      this.form.password = "";
    },
  },
  computed: {
    ...mapState(["login"]),
  },
};
</script>

<style lang="scss" scoped>
$navbar_color: #252525;
$text_color: #ffffff;

.text_color {
  color: $text_color;
}

.card {
  padding: 1em;
  width: 18rem;
  background-color: $navbar_color;
}

button {
  margin: 5px;
}
</style>