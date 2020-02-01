import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Icon from "vue-awesome/components/Icon";
import VueNoty from "vuejs-noty";
import VueAxiosPlugin from "vue-axios-plugin";

import "vuejs-noty/dist/vuejs-noty.css";

Vue.use(VueNoty);

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
});

Vue.component("v-icon", Icon);
Vue.config.productionTip = false;

new Vue({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  router,
  render: h => h(App)
}).$mount("#app");
