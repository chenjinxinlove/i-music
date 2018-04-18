import Vue from 'vue'
import App from './songs'

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()