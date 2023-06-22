import { defineStore } from "pinia";
const useAppStore = defineStore("app", {
  state: () => ({
    carrinho: {
      filmes: [],
      cliente: null,
      valor: 0,
      data: null,
      devolvido: false,
      transacao: "",
      valorTransacao: 0,
      tempoLocacao: 0,
    },
    cliente: null,
    filmes: [],
    limparCarrinho: [],
  }),
  mutations: {
    adicionarFilmeAoCarrinho(
      state,
      { filme, tempoLocacao, transacao, valorTransacao }
    ) {
      this.carrinho.filmes.push(filme);
      this.carrinho.valor += valorTransacao;
      this.carrinho.transacao = transacao;
      this.carrinho.valorTransacao = valorTransacao;
      this.carrinho.valor += filme.valor * tempoLocacao;
      this.carrinho.tempoLocacao = tempoLocacao;
    },
    /* confirmarLocacao() {
      const tempoLocacao = this.tempoLocacao; // Tempo de locação selecionado

      // Aqui você pode adicionar o filme ao carrinho com o tempo de locação
      this.adicionarFilmeAoCarrinho(tempoLocacao);
      console.log(this.tempoLocacao);

      // Em seguida, adicione o filme ao carrinho ou execute qualquer outra ação necessária

      this.showPopup = false; // Oculta o popup após a confirmação da locação

    },*/
  },
  actions: {
    addFilme(filme) {
      this.filmes.push(filme);
    },
    setFilmes(filmes) {
      this.filmes = filmes;
    },
    getFilmesByAno(ano) {
      return this.filmes.filter((filme) => filme.ano == ano);
    },
    getFilmesByActor(actor) {
      return this.filmes.filter((filme) => filme.atores.includes(actor));
    },
    setCliente(cliente) {
      this.cliente = cliente;
    },
    getCliente(cliente) {
      return this.cliente.email;
    },
    //Exclui tudo o que tiver no carrinho
    limparCarrinho() {
      this.carrinho = {
        filmes: [],
        valor: 0,
        data: null,
        devolvido: false,
      };
    },
    //Exclui um item do carrinho
    excluirItem(filme) {
      console.log(filme);
      this.carrinho.filmes.indexOf((item) => item === filme);
      console.log(this.carrinho.filmes.indexOf(filme));
      const filmeExcluido = this.carrinho.filmes.splice(
        this.carrinho.filmes.indexOf(filme),
        1
      );
      console.log("Item excluído:", filmeExcluido);
    },
    // Adiciona os itens do carrinho em Meus Filmes
    finalizarCompra() {
      localStorage.setItem(
        "filmesUsuario",
        JSON.stringify(this.carrinho.filmes)
      );
      console.log(this.carrinho.filmes);
      this.limparCarrinho();
    },
    setClienteCarrinho(cliente) {
      this.carrinho.cliente = cliente;
    },
    addFilmeCarrinho(filme) {
      this.carrinho.filmes.push(filme);
    },
  },
});

export const appStore = useAppStore();
