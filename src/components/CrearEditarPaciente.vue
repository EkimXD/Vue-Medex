<template>
  <div class="container-btn">
    <b-button @click="showModal" variant="success">{{ buttonText }}</b-button>

    <b-modal ref="my-modal" hide-footer :title="buttonText">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Nombre" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.nombre"
            type="text"
            required
            placeholder="Nombre"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Apellido" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.apellido"
            type="text"
            required
            placeholder="Apellido"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Ciudad" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.ciudad"
            type="text"
            required
            placeholder="Ciudad"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Telefono" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.telefono"
            type="text"
            required
            placeholder="Telefono"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary"
          ><b-spinner v-if="spiner" small label="Spinning"></b-spinner>
          {{ buttonText }}</b-button
        >
        <b-button type="reset" variant="danger">Borrar</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data: () => {
    return {
      form: {
        nombre: "",
        apellido: "",
        ciudad: "",
        telefono: "",
      },
      spiner: false,
    };
  },

  props: ["buttonText", "edit", "paciente"],
  methods: {
    showModal() {
      this.form.nombre = this.paciente == undefined ? "" : this.paciente.nombre;
      this.form.apellido =
        this.paciente == undefined ? "" : this.paciente.apellido;
      this.form.telefono =
        this.paciente == undefined ? "" : this.paciente.telefono;
      this.form.ciudad = this.paciente == undefined ? "" : this.paciente.ciudad;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.edit) {
          this.spiner = true;
        const idpaciente = await db.collection("paciente").doc(this.$route.params.id).set({
          nombre: this.form.nombre.toUpperCase(),
          apellido: this.form.apellido.toUpperCase(),
          ciudad: this.form.ciudad.toUpperCase(),
          telefono: this.form.telefono.toUpperCase(),
        });
        this.spiner = false;
        this.$router.push("/pacientes");
      } else {
        this.spiner = true;
        const idpaciente = await db.collection("paciente").add({
          nombre: this.form.nombre.toUpperCase(),
          apellido: this.form.apellido.toUpperCase(),
          ciudad: this.form.ciudad.toUpperCase(),
          telefono: this.form.telefono.toUpperCase(),
        });
        this.spiner = false;
        this.$router.push("/paciente/" + idpaciente.id);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.nombre = "";
      this.form.apellido = "";
      this.form.ciudad = "";
      this.form.telefono = "";
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container-btn {
  display: inline-block;
  button {
    font-size: 0.8em;
    margin-left: 10px;
  }
}
</style>