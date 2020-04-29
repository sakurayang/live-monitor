import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueNoty from "vuejs-noty";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuejs-noty/dist/vuejs-noty.css";

library.add(fas);

Vue.use(VueNoty);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  router,
  components: { App },
  render: h => h(App)
}).$mount("#app");
