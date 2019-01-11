import Vue from 'vue'
import Vuex from 'vuex'

import homePage from './modules/home/homePage'
import articleStore from './modules/articles/articleStore'
import authStore from './modules/auth/authStore'
import registerStore from './modules/register/registerStore'
import profileStore from './modules/profile/profileStore'

import { getField, updateField } from 'vuex-map-fields';


Vue.use(Vuex)

export default function createStore(dataService, tokenService, user) {
  return new Vuex.Store({
    modules: {
      homePage: homePage(dataService, tokenService),
      articleStore: articleStore(dataService, tokenService),
      authStore: authStore(dataService, tokenService, user),      
      registerStore: registerStore(dataService),
      profileStore: profileStore(dataService, tokenService)
    },    
    getters: {
      getField
    },
    mutations: {      
      updateField
    }    
  });
}   