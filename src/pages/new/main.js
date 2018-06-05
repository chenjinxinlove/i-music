import Vue from 'vue'
import App from './new'

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()
