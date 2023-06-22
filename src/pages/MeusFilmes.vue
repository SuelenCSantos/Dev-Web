<template>
  <q-page>
    <div>
      <h3>Meus Filmes</h3>
      <q-btn rounded glossy id="btn-voltar" @click="voltar"
        >Voltar à pagina principal</q-btn
      >

      <q-card
        id="card-filmes"
        class="bg-secondary text-white q-pa-md q-gutter-y-md column items-start"
      >
        <li v-for="filme in filmesUsuario" :key="filme.id">
          <div class="text-h6">{{ filme.titulo }}</div>
          <div class="text-subtitle2">{{ filme.genero }}</div>
          <q-btn-group rounded>
            <q-btn rounded glossy id="btn-assistir">Assistir</q-btn>
            <q-btn rounded glossy id="btn-excluir" @click="excluir"
              >Excluir</q-btn
            ></q-btn-group
          >
        </li>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      filmesUsuario: [],
    };
  },
  mounted() {
    const filmesUsuario = JSON.parse(localStorage.getItem("filmesUsuario"));
    if (filmesUsuario) {
      this.filmesUsuario = filmesUsuario;
    }
  },
  props: {
    filme: Object,
  },
  methods: {
    // Volta para página inicial
    voltar() {
      this.$router.push("/");
    },
    excluir() {
      // Não implementado
    },
  },
};
</script>

<style></style>
