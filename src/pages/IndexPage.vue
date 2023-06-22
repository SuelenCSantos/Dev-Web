<template>
  <q-page>
    <div v-if="!naoLogado()">
      <q-btn id="btn-logout" rounded glossy @click="logout">Logout</q-btn>
      <q-btn id="btn-meus-filmes" rounded glossy @click="meusFilmes()"
        >Meus Filmes</q-btn
      >
    </div>
    <div class="" v-if="naoLogado()">
      <h3>olá! seja bem vindo!</h3>

      <q-btn class="shadow-10" id="btn-criar" to="loginCliente"
        >Já tenho uma conta</q-btn
      >
      <q-btn id="btn-novo" @click="showFormCliente = !showFormCliente"
        >Novo Cliente</q-btn
      >
    </div>

    <form-cliente @salvarCliente="onSalvarCliente" v-if="showFormCliente" />

    <FilmeCard
      :logado="!naoLogado()"
      v-for="f in filmes"
      v-bind:key="f.id"
      :filme="f"
      :filmeNoCarrinho="isFilmeNoCarrinho(f.id)"
      @locarFilme="onLocarFilme"
      @comprarFilme="onComprarFilme"
    />
  </q-page>
</template>

<script>
import FilmeCard from "../components/FilmeCard.vue";
import { appStore } from "src/stores/appStore";
import { defineComponent } from "vue";
import FormCliente from "src/components/FormCliente.vue";
import Services from "src/services";

export default defineComponent({
  components: { FormCliente, FilmeCard },
  name: "IndexPage",
  data() {
    return {
      filmes: Array,
      showFormCliente: false,
    };
  },
  created() {
    Services.getAllFilmes((data) => {
      this.filmes = data;
    });
    Services.checkLogado();
  },

  methods: {
    // Entra na pagina Meus Filmes
    meusFilmes() {
      this.$router.push("/meusFilmes");
    },
    // Verifica se um filme já está no carrinho
    isFilmeNoCarrinho(filmeId) {
      const carrinho = appStore.carrinho;
      const filmesNoCarrinho = carrinho.filmes.map((filme) => filme.id);
      return filmesNoCarrinho.includes(filmeId);
    },
    // Desloga da conta do usuario
    logout() {
      Services.logout();
    },
    onLocarFilme(filme) {
      appStore.carrinho.cliente = appStore.cliente;
      appStore.carrinho.filmes.push(filme);
      appStore.carrinho.data = new Date();
    },
    onComprarFilme(filme) {
      appStore.carrinho.cliente = appStore.cliente;
      appStore.carrinho.filmes.push(filme);
      appStore.carrinho.data = new Date();
    },
    naoLogado() {
      console.log(appStore.cliente == null);
      return appStore.cliente == null;
    },
    onSalvarCliente(cliente) {
      Services.saveCliente(cliente, (ok) => {
        console.log("no onsalvar " + ok);
        if (ok) {
          this.showFormCliente = false;
          alert("Cliente salvo com sucesso!\nbem vindo ");
        }
      });
    },
    onLoginCliente(cliente) {
      Services.saveCliente(cliente, (ok) => {
        console.log("no onsalvar " + ok);
        if (ok) {
          this.showLoginCliente = false;
          alert("Logado");
        }
      });
    },
  },
});
</script>
