<template>
  <div class="row">
    <div class="col-sm-7 paciente">
      <div class="container">
        <h3>{{ paciente.nombre }} {{ paciente.apellido }}</h3>
        <CrearEditarPaciente
          buttonText="Editar paciente"
          :edit="true"
          :paciente="paciente"
        ></CrearEditarPaciente>
        <b-button @click="borrar" variant="danger"><b-spinner v-if="spiner" small label="Spinning"></b-spinner>Eliminar</b-button>

        <h6>Ciudad</h6>
        <h4>{{ paciente.ciudad }}</h4>
        <h6>Telefono</h6>
        <h4>{{ paciente.telefono }}</h4>
      </div>
    </div>
    <div class="col-sm-5 citas">
      <div class="container">
        <h3>Citas Agendadas</h3>
        <CrearCita :idpaciente="$route.params.id"></CrearCita>

        <table class="table">
          <tr>
            <th>Hora</th>
            <th>Fecha</th>
          </tr>
          <tr v-for="cita in citas" :key="cita.fecha">
            <td>{{ cita.hora }}</td>
            <td>{{ cita.fecha }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import CrearEditarPaciente from "@/components/CrearEditarPaciente";
import CrearCita from '@/components/CrearCita'

export default {
  name: "Paciente",
  data: () => {
    return {
      paciente: {},
      citas: [],
      spiner:false,
    };
  },
  components: {
    CrearEditarPaciente,
    CrearCita,
  },
  methods:{
    async borrar(){
      this.spiner=true;

      await db.collection('paciente').doc(this.$route.params.id).delete();
      await db.collection('cita').where('idpaciente',"==",this.$route.params.id).get()
      .then(
        (snapshot)=>{
          snapshot.forEach(doc=>{
            db.collection('cita').doc(doc.id).delete();
          })
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      )

      this.spiner=false;
      this.$router.push('/pacientes')
    }
  },
  mounted() {
    db.collection("paciente")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.paciente = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("cita")
      .where("idpaciente", "==", this.$route.params.id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.empty);
        console.log(typeof this.$route.params.id);
        snapshot.forEach((doc) => {
          this.citas.push(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
$bg-citas: #617171;
$fg-citas: #fff;
.row {
  height: 100%;
  .paciente {
    // height: 100%;
  }

  .citas {
    background-color: $bg-citas;
    color: $fg-citas;
    height: 100%;
  }
}

.container {
  margin: 30px;
  text-align: left;

  h3 {
    display: inline-block;
    margin-bottom: 1.5em;
  }

  button {
    display: inline-block;
    font-size: 0.8em;
    margin-left: 10px;
  }

  .table {
    color: $fg-citas;
  }
}
</style>