<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper darken-1" id="header">
        <a href="#" class="brand-logo center" id="title">✂️ Encurtador de Urls Customizadas </a>
      </div>
    </nav>

    <div class="container">
      <br>
      <form @submit.prevent="create">
        <label>URL Customizada</label>
        <input type="text" placeholder="URL Customizada(Não é obrigatório)" v-model="link.customUrl">
        <label>URL</label>
        <input type="text" placeholder="Url" v-model="link.url">

        <button id="btnEcurtar" class="waves-effect waves-light btn-small">Encurtar e Salvar<i class="material-icons left">content_cut</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>URL Encurtada</th>
            <th>Visitas</th>
            <th>Último Acesso</th>
            <th>Opções</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="link of links" :key="link._id">
            <td>{{ 'http://localhost:3000/'+link.urlEncurtada }}</td>
            <td>{{ link.visitas }}</td>
            <td>{{ link.createdAt }}</td>
            <td>
              <button @click="copiarTexto('http://localhost:3000/'+link.urlEncurtada)" class="waves-effect btn-small blue darken-1"><i class="material-icons" id="btnCopiar">content_copy</i></button>
              <button @click="remover(link)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script>

  import Link from './services/links'

  export default {

    data(){
      return {
        link:{
          url: '',
          customUrl: ''
        },
        links: [],
      }
    },
    
    mounted(){
      this.listar()
    },

    methods:{

      copiarTexto(texto){
        navigator.clipboard.writeText(texto)
      },

      listar(){
        Link.listar().then(resposta => {
          this.links = resposta.data
        })
      },

      create(){
        Link.create(this.link).then(() => {
          this.link = {}
          this.listar()
        })
      },

      remover(link){
        Link.apagar(link).then(() => {
          this.listar();
          this.erros = []
        })
      }
    }
  }

</script>

<style>
  body{
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
  }

  #title{
    color: #3DDC97;
    font-style: italic;
    letter-spacing: 3px;
  }

  #header{
    background-color: #2A2D34;
  }

  .container{
    width: 80%;
    background-color: dark;
    margin-top: 2rem;
    border-radius: 12px;
    padding: 24px;
  }

  #btnEcurtar{
    margin: 1.5rem 0;
  }
</style>
