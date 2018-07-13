import Vue from 'vue'
import App from './App'

import Cube from 'cube-ui'
import 'lib-flexible'
Vue.use(Cube)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
