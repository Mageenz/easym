import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';

Vue.use(ElementUI);

Vue.prototype.$http = axios

new Vue({
  el: '#app',
  data: {
    msg: 'hello world'
  },
  router
});