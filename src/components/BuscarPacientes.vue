<template>
  <div class="container">
    <div class="header">
      <div class="element-header">
        <h1>Pacientes</h1>
        <button type="button" class="btn btn-success">Nuevo paciente</button>
        <h5>Buscar</h5>
      </div>
      <b-form @submit="buscarPacientes" inline>
        <label class="sr-only" for="inline-form-input-name">Paciente</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane Doe"
          v-model="nombreBusqueda"
        ></b-input>
        <b-button type="submit" variant="primary">Buscar</b-button>
      </b-form>
      <span v-if="pacientes.length == 0" style="color:red;">No se encontraron sultados</span>
    </div>
    <div class="footer">
      <table class="table">
        <tr class="thead-dark">
          <th>Numero</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Ciudad</th>
          <th>Opciones</th>
        </tr>
        <RowUsusario
          v-for="paciente in pacientes"
          :key="paciente.id"
          numero="O"
          :paciente="paciente"
        ></RowUsusario>
      </table>
    </div>
  </div>
</template>

<script>
import RowUsusario from "./RowUsuario";
import { db } from "../firebase";

export default {
  name: "BuscarPAcientes",
  data: () => {
    return {
      nombreBusqueda: "",
      pacientes: [],
    };
  },
  components: {
    RowUsusario,
  },
  methods: {
    buscarPacientes(event) {
      event.preventDefault();
      this.pacientes = [];
      db.collection("paciente")
        .where("nombre", "==", this.nombreBusqueda.toUpperCase())
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let datos = doc.data();
            datos.id = doc.id;
            this.pacientes.push(datos);
          });
          return db
            .collection("paciente")
            .where("apellido", "==", this.nombreBusqueda.toUpperCase())
            .get();
        })
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let datos = doc.data();
            datos.id = doc.id;
            this.pacientes.push(datos);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted(){
      this.pacientes=[];
      db.collection("paciente")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let datos = doc.data();
            datos.id = doc.id;
            this.pacientes.push(datos);
          });
        }).catch(
            (error)=>{
                console.log(error);
            }
        )
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .element-header {
    text-align: left;
    h1 {
      display: inline-block;
    }
    button {
      display: inline-block;
      font-size: 0.8em;
      margin-left: 10px;
    }
  }

  .footer {
    padding-top: 2em;
    width: 100%;
    table {
      width: 100%;
    }
  }
}
</style>