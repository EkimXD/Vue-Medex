<template>
  <div class="container-btn">
    <b-button @click="showModal" variant="success">Agregar cita</b-button>

    <b-modal ref="my-modal" hide-footer title="Agregar cita">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Hora" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.hora"
            type="text"
            required
            placeholder="Hora"
          ></b-form-input>
        </b-form-group>

        <label for="datepicker">Fecha</label>
        <b-form-datepicker
          id="datepicker"
          v-model="form.fecha"
          class="mb-2"
        ></b-form-datepicker>

        <b-form-group
          id="input-group-3"
          label="Tipo de cita"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.tipocita"
            type="text"
            required
            placeholder="Tipo de cita: General"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary"
          ><b-spinner v-if="spiner" small label="Spinning"></b-spinner>
          Crear</b-button
        >
        <b-button type="reset" variant="danger">Limpiar</b-button>
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
        hora: "",
        fecha: "",
        tipocita: "",
      },
      spiner: false,
    };
  },

  props: ["idpaciente"],
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.spiner = true;
      this.form.idpaciente=this.idpaciente;
      await db.collection("cita").add(this.form);
      this.spiner = false;
      this.$refs["my-modal"].hide();
      this.$router.push("/paciente/" + this.idpaciente);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.hora = "";
      this.form.fecha = "";
      this.form.tipocita = "";
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container-btn {
  display: inline-block;
}
</style>