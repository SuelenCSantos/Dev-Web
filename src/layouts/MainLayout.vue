<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Locadora

          <q-btn
            v-if="!naoLogado()"
            class="q-px-md q-gutter-xs"
            id="btn-carrinho"
            flat
            @click="drawerRight = !drawerRight"
            round
            color="purple"
            glossy
            icon="local_grocery_store"
          ></q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!naoLogado()"
      class="carrinho"
      side="right"
      v-model="drawerRight"
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div>
            <!--Mostra as informações da compra no drawer-->
            <q-card
              id="my-card-car"
              class="bg-secondary text-white q-pa-md q-gutter-y-md column items-start"
              ><div class="text-subtitle2"></div>

              <div class="" v-if="mostraCarrinho().filmes.length > 0">
                <div class="text-h6">Olá {{ carrinho.cliente.nome }},</div>
                <div class="text-subtitle2">Seu carrinho:</div>
                <div v-for="filme in mostraCarrinho().filmes" :key="filme.id">
                  <div class="text-h6">{{ filme.titulo }}</div>
                  <div class="text-subtitle2">{{ filme.genero }}</div>

                  <q-btn-group rounded>
                    <q-btn
                      rounded
                      glossy
                      id="btn-excluir"
                      @click="excluir(filme)"
                      >excluir filme</q-btn
                    ></q-btn-group
                  >
                  <q-separator dark />
                </div>
                <q-btn-group rounded>
                  <q-btn id="btn-finalizar" rounded glossy @click="finalizar"
                    >Finalizar Compra</q-btn
                  >
                  <q-btn id="btn-limpar" rounded glossy @click="limpar"
                    >Limpar carrinho</q-btn
                  ></q-btn-group
                >
              </div>

              <div v-else class="text-subtitle2">Seu carrinho está vazio.</div>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <FilmeCard
      v-for="filme in filmes"
      :key="filme.id"
      :filme="filme"
      :carrinho="carrinho"
      :logado="logado"
    />
    <app-store :filmesAppStore="filmesAppStore" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white" />
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { appStore } from "src/stores/appStore";
import FilmeCard from "src/components/FilmeCard.vue";

const linksList = [{}];

export default defineComponent({
  components: {
    appStore,
    FilmeCard,
  },
  name: "MainLayout",
  data() {
    return {
      filmes: [],
      filmesAppStore: [],
      logado: true,
      excluirItem: null,
      carrinho: appStore.carrinho,
    };
  },
  setup() {
    return {
      drawerRight: ref(true),
      //tempoLocacao: "",
    };
  },

  methods: {
    naoLogado() {
      console.log(appStore.cliente == null);
      return appStore.cliente == null;
    },
    //Adiciona os filmes ao carrinho
    adicionarFilmeAoCarrinho({ filme }) {
      appStore.adicionarFilmeAoCarrinho(filme);
    },

    mostraCarrinho() {
      return appStore.carrinho;
    },
    //Exclui tudo o que tiver no carrinho
    limpar() {
      return appStore.limparCarrinho();
    },
    excluir(filme) {
      return appStore.excluirItem(filme);
    },
    finalizar() {
      appStore.finalizarCompra();
      return this.$router.push("/meusFilmes");
    },
  },
});
</script>
