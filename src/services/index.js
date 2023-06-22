import api from "./api";
import { appStore } from "src/stores/appStore";

const storage = window.localStorage;
const services = {
  getAllFilmes(callback) {
    if (appStore.filmes.length == 0) {
      console.log("getAllFilmes zerado");
      api
        .get("/filmes")
        .then((response) => {
          appStore.setFilmes(response.data);
          if (callback != null) {
            callback(appStore.filmes);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log("getAllFilmes com dados");
      if (callback != null) {
        console.log("getAllFilmes com dados e callback ");
        console.log(appStore.filmes);
        callback(appStore.filmes);
      } else {
        return appStore.filmes;
      }
    }
  },
  getFilmesByActor(actor) {
    return filmesStore.getFilmesByActor(actor);
  },
  saveFilme(filme) {
    filmesStore.addFilme(filme);
  },
  saveCliente(cliente, callback) {
    api
      .post("/clientes", cliente)
      .then((response) => {
        console.log(response.data);
        appStore.setCliente(response.data);
        if (callback != null) {
          console.log("saveCliente com callback");
          callback(true);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  checkLogado() {
    if (storage.getItem("cliente") != null) {
      appStore.setCliente(JSON.parse(storage.getItem("cliente")));
    }
  },
  logout() {
    storage.removeItem("cliente");
    appStore.setCliente(null);
  },

  loginCliente(email, password, callback) {
    api.get("/logins/" + email).then((response) => {
      if (response.data.id == undefined) {
        console.log(response);
        callback(false);
      } else {
        if (response.data.password == password) {
          api.get("/clientes/" + response.data.idCliente).then((response) => {
            console.log("resposta clientes");
            console.log(response);
            appStore.setCliente(response.data);

            storage.setItem("cliente", JSON.stringify(response.data));
            callback(true);
          });
        } else {
          callback(false);
        }
      }
    });
  },
};

export default services;
