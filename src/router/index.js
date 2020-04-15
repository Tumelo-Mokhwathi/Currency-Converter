import Vue from "vue";
import VueRouter from "vue-router";
import Converter from "@/views/Converter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Converter",
    component: Converter
  }
];

const router = new VueRouter({
  routes
});

export default router;
