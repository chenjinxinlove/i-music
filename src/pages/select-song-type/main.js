import Vue from 'vue'
import App from './select-song-type'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)

import store from '../../store'

const app = new Vue({
  store,
  ...App
})
app.$mount()
