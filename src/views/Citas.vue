<template>
  <b-row>
    <b-col>
      <div class="container">
        <h1>Citas</h1>
        <h4>{{ context.activeFormatted }}</h4>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Paciente</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cita in citas" :key="cita.id">
              <th>{{ cita.fecha }}</th>
              <td>{{ cita.hora }}</td>
              <td>{{ cita.paciente.nombrecompleto }}</td>
              <td>
                <b-button @click="verCita(cita)" variant="primary"
                  >Ver cita</b-button
                >
                <b-button @click="toPaciente(cita.idpaciente)" variant="danger"
                  >Ver paciente</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-col>
    <b-col md="auto">
      <div class="container">
        <b-calendar
          v-model="value"
          @context="onContext"
          locale="en-US"
        ></b-calendar>
      </div>
    </b-col>
    <b-modal ref="my-modal" hide-footer title="Cita">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Nombre" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="citaActual.paciente.nombrecompleto"
            type="text"
            required
            placeholder="Nombre"
            disabled-field="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Hora" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="citaActual.hora"
            type="text"
            required
            placeholder="Hora"
          ></b-form-input>
        </b-form-group>

        <label for="datepicker">Fecha</label>
        <b-form-datepicker
          id="datepicker"
          v-model="citaActual.fecha"
          class="mb-2"
        ></b-form-datepicker>

        <b-form-group
          id="input-group-3"
          label="Tipo de cita"
          label-for="input-3"
          v-model="citaActual.tipocita"
        >
          <b-form-input
            id="input-4"
            v-model="citaActual.tipocita"
            type="text"
            required
            placeholder="Tipo de cita"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Observacion"
          label-for="input-4"
          v-model="citaActual.observacion"
        >
          <b-form-input
            id="input-4"
            v-model="citaActual.observacion"
            type="text"
            placeholder="Observacion"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary"
          ><b-spinner v-if="spiner" small label="Spinning"></b-spinner>
          Guardar</b-button
        >
        <b-button @click="borrar" type="button" variant="danger"
          ><b-spinner v-if="spinerDelete" small label="Spinning"></b-spinner
          ><i class="fas fa-trash-alt"></i
        ></b-button>
      </b-form>
    </b-modal>
  </b-row>
</template>
<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      value: "",
      context: { activeFormatted: "", activeYMD: "" },
      citas: [],
      citaActual: {
        fecha: "",
        hora: "",
        observacion: "",
        paciente: { nombrecompleto: "" },
      },
      actual: 1,
      noResults: false,
      spiner: false,
      spinerDelete: false,
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    toPaciente(idpaciente) {
      this.$router.push("/paciente/" + idpaciente);
    },
    verCita(cita) {
      this.citaActual = { ...cita };
      this.actual = this.citas.indexOf(cita);
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    async onSubmit(event) {
      event.preventDefault();
      let editCita = {
        hora: this.citaActual.hora,
        fecha: this.citaActual.fecha,
        observacion:
          this.citaActual.observacion == undefined
            ? " "
            : this.citaActual.observacion,
        tipocita: this.citaActual.tipocita,
        idpaciente: this.citaActual.idpaciente,
      };
      this.spiner = true;

      await db.collection("cita").doc(this.citaActual.id).set(editCita);

      if (editCita.fecha == this.citas[this.actual].fecha) {
        editCita.paciente = this.citas[this.actual].paciente;
        editCita.id = this.citas[this.actual].id;
        this.citas[this.actual] = editCita;
      } else {
        this.value = editCita.fecha;
      }

      this.spiner = false;
      this.$refs["my-modal"].hide();
    },
    async borrar() {
      this.spinerDelete = true;
      await db.collection("cita").doc(this.citas[this.actual].id).delete();
      this.citas.splice(this.actual, 1);
      this.$refs["my-modal"].hide();
      this.spinerDelete = false;
    },
  },
  watch: {
    context: function (val) {
      this.citas = [];
      db.collection("cita")
        .where("fecha", "==", val.activeYMD)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            this.noResults = true;
            return null;
          } else {
            this.noResults = false;
          }
          snapshot.forEach((doc) => {
            let datos = doc.data();
            datos.id = doc.id;
            db.collection("paciente")
              .doc(datos.idpaciente)
              .get()
              .then((doc) => {
                let paciente = doc.data();
                datos.paciente = paciente;
                datos.paciente.nombrecompleto =
                  paciente.nombre + " " + paciente.apellido;
                this.citas.push(datos);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg-citas: #617171;
$fg-citas: #fff;
.container {
  text-align: left;
  margin: 20px;

  .back-dark {
    background-color: $bg-citas;
    color: $fg-citas;
    height: 100%;
  }
}
</style>