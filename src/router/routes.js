const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/loginCliente",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginCliente") }],
  },
  {
    path: "/meusFilmes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MeusFilmes") }],
  },
  {
    path: "/cadastroFilme",
    component: () => import("pages/CadastroFilme.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
