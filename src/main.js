import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueNoty from "vuejs-noty";
import VueAxiosPlugin from "vue-axios-plugin";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuejs-noty/dist/vuejs-noty.css";

library.add(fas);

Vue.use(VueNoty);

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
});

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  router,
  components: { App },
  render: h => h(App)
}).$mount("#app");
