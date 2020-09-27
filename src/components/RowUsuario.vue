<template>
  <tr>
    <td>{{numero}}</td>
    <td>{{paciente.nombre}}</td>
    <td>{{paciente.apellido}}</td>
    <td>{{paciente.ciudad}}</td>
    <td class="button-elements">
        <CrearCita :idpaciente="paciente.id"></CrearCita>
        <button type="button" class="btn btn-danger margin-left" @click="irPaciente">Ver paciente</button>
    </td>
  </tr>
</template>

<script>
import CrearCita from '@/components/CrearCita'

export default {
  name: "RowUsuario",
  props: ["numero", "paciente"],
  methods:{
      irPaciente(){
          console.log('llega')
          this.$router.push('/paciente/'+this.paciente.id)
      }
  },
  components:{
    CrearCita
  }
};
</script>

<style lang="scss" scoped>
.button-elements{
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    align-items: center;
    .margin-left{
        margin-left: 10px;
    }
}
</style>