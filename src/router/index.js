import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";
import menu from "./menu";

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    routes: [
      {
        path: "/",
        redirect: "/index",
        component: Layout,
        name: "main",
        meta: {
          title: "首页",
          icon: "fa fa-yx-home",
        },
        children: menu,
      },
    ],
  });

const router = createRouter();
export default router;
