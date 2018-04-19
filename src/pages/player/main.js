import Vue from 'vue'
import App from './player'

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()
