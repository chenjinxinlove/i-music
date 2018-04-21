import Vue from 'vue'
import App from './songs-details'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()