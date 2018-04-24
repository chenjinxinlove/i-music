import Vue from 'vue'
import App from './mv-plyer'

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()
