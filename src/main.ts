import Vue from "vue";

import App from "./App.vue";
import router from "@/shared/router";
import { createPinia, PiniaVuePlugin } from "pinia";
import "./assets/main.css";

const pinia = createPinia();
Vue.use(PiniaVuePlugin);
new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
