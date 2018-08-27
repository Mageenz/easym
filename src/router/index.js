import VueRouter from 'vue-router';
import Vue from 'vue';

import List from '../pages/list.vue';
import Create from '../pages/create.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    component: List,
    path: '/',
    name: 'list'
  }, {
    component: Create,
    path: '/create',
    name: 'create'
  }]
})