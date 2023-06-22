<template>
  <q-card id="card-form" class="q-ma-md q-pa-md shadow-10">
    <h3>Cliente</h3>
    {{ cliente }}
    <q-form>
      <q-input
        label-color="white"
        class="shadow-10"
        outlined
        v-model="clienteData.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Digite seu nome']"
      ></q-input>
      <q-input
        label-color="white"
        class="shadow-10"
        outlined
        v-model="clienteData.email"
        label="E-mail *"
        lazy-rules
        :rules="[
          (val, rules) => rules.email(val) || 'Digite um E-mail valido.',
        ]"
      ></q-input>
      <q-input
        label-color="white"
        class="shadow-10"
        outlined
        v-model="clienteData.telefone"
        mask="(##)#####-####"
        fill-mask="_"
        label="Telefone"
      ></q-input>
      <q-input
        label-color="white"
        class="shadow-10"
        outlined
        v-model="clienteData.cpf"
        mask="###.###.###-##"
        fill-mask="_"
        label="CPF"
      ></q-input>
      <q-input
        label-color="white"
        class="shadow-10"
        v-model="clienteData.password"
        square
        filled
        clearable
        :type="isPwd ? 'password' : 'text'"
        label="Senha *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Digite uma senha']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
      <q-card-actions>
        <q-btn color="primary" label="Salvar" @click="salvar"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "FormCliente",
  props: {
    cliente: Object,
  },
  data() {
    return {
      clienteData: {
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        password: ref(""),
      },

      isPwd: true,
    };
  },
  created() {
    if (this.cliente) {
      this.clienteData = this.cliente;
    }
  },
  methods: {
    salvar() {
      if (
        this.clienteData.email &&
        this.clienteData.nome &&
        this.clienteData.password
      ) {
        this.$emit("salvarCliente", this.clienteData);
      } else {
        alert("São obrigatórios os preenchimentos *");
      }
    },
  },
};
</script>

<style></style>
