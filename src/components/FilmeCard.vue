<template>
  <q-card id="my-card" class="bg-secondary text-white">
    <q-card-section>
      <div class="text-h6">{{ filme.titulo }}</div>
      <div class="text-subtitle2">{{ filme.genero }}</div>
    </q-card-section>

    <q-card-section>
      <ul>
        <li v-for="ator in filme.atores" v-bind:key="ator">{{ ator }}</li>
      </ul>
    </q-card-section>
    <q-card-section>
      Diretor: {{ filme.diretor }}<br />
      Ano: {{ filme.ano }}
    </q-card-section>

    <q-separator dark />
    <div id="q-app-2" style="min-height: 100vh">
      <div v-if="logado" class="q-pa-md q-gutter-y-md column items-start">
        <q-btn-group rounded glossy>
          <q-btn
            id="btn-locar"
            rounded
            glossy
            label="Locar"
            @click="locar"
            :disable="filmeNoCarrinho"
          ></q-btn>
          <q-btn
            id="btn-comprar"
            rounded
            glossy
            label="Comprar"
            @click="comprar"
            :disable="filmeNoCarrinho"
          ></q-btn>
        </q-btn-group>
      </div>
    </div>
    <q-dialog v-model="showPopup" persistent>
      <q-card id="pop">
        <q-card-section>
          <!-- Conteúdo do popup de seleção de tempo de locação -->
          <q-input
            filled
            outlined
            type="number"
            v-model="tempoLocacao"
            label="Tempo de Locação (em dias)"
            dense
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            id="cancelar"
            label="Cancelar"
            color="primary"
            @click="cancelarLocacao"
          />
          <q-btn
            id="confirmar"
            label="Confirmar"
            color="primary"
            @click="confirmarLocacao"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  props: ["filme", "filmeNoCarrinho", "logado", "filmeNoMeusFilmes"],
  data() {
    return {
      showPopup: false,
      tempoLocacao: "",
    };
  },

  methods: {
    adicionarFilmeAoCarrinho() {
      this.$emit("adicionarFilmeAoCarrinho");
    },
    locar() {
      this.showPopup = true; // Abre um pop-up para escolha do tempo de locação
    },
    cancelarLocacao() {
      this.showPopup = false; // Oculta o popup ao cancelar a locação
    },

    confirmarLocacao() {
      this.$emit("locarFilme", {
        filme: this.filme,
        tempoLocacao: parseInt(this.tempoLocacao),
      });
      this.showPopup = false;
    },
    comprar() {
      this.$emit("comprarFilme", this.filme);
    },
  },
};
</script>

<style></style>
