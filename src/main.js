import Vue from 'vue'
import App from './App.vue'
import router from 'routing/router'
import createAuthenticationGuard from 'routing/authenticationGuard'
import createStore from 'store/index'
import createDataService from 'services/dataService'
import tokenService from 'services/tokenService'
import formatDate from 'filters/formatDateFilter'

Vue.config.productionTip = false

var dataService = createDataService("https://conduit.productionready.io");

Vue.filter('formatDate', formatDate);

const startVue = (user) => { 
  let store = createStore(dataService, tokenService, user);
  router.beforeEach(createAuthenticationGuard(store));

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

if (tokenService.tokenExists()) {
  dataService.getCurrentUser(tokenService.getToken()).then((response) => startVue(response.user));
} else {
  startVue(null);
}

