<template>
  <div>
    <q-table
      title="Filmes"
      :rows="rows"
      :columns="[
        { name: 'id', label: 'Id', field: 'id', sortable: true },
        { name: 'titulo', label: 'Título', field: 'titulo', sortable: true },
        { name: 'Diretor', label: 'Diretor', field: 'diretor', sortable: true },
      ]"
      row-key="id"
    />
  </div>
</template>

<script>
import Services from "src/services";

export default {
  data() {
    return {
      rows: new Array(),
    };
  },
  created() {
    this.rows = Services.getAllFilmes();
  },
};
</script>

<style></style>
