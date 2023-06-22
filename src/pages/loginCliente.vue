<template>
  <q-page>
    <q-card id="card-login" class="q-ma-md q-pa-md shadow-10">
      <h3>Login</h3>
      <div class="q-gutter-md row items-start">
        <q-input
          class="shadow-10"
          label-color="white"
          square
          filled
          clearable
          v-model="email"
          type="email"
          label="Email"
          lazy-rules
          :rules="[(val) => !!val || 'Please enter your email']"
        />

        <q-input
          class="shadow-10"
          label-color="white"
          v-model="password"
          square
          filled
          clearable
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-card-actions class="q-px-md">
          <q-btn
            id="btn-login"
            color="primary"
            label="Login"
            @click="loginCliente"
          />
        </q-card-actions>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import services from "src/services";
export default {
  name: "LoginCliente",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
    };
  },
  methods: {
    loginCliente() {
      services.loginCliente(this.email, this.password, (response) => {
        if (response) {
          this.$router.push("/");
        } else {
          alert("verifique seu email e senha ou cadastre-se!");
        }
      });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
