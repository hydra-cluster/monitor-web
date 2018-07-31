import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import moment from 'moment'
import lodash from 'lodash'

Vue.prototype.$moment = moment
Vue.prototype.$lodash = lodash

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nodes: []
  },
  getters: {
    getNodes(state) {
      return lodash.sortBy(state.nodes, ['hostname'])
    },
    getNodeById: (state) => (id) => {
      return state.nodes.find(node => node.id === id)
    },
    getNodeParamByLabel: (state) => (label, id) => {
      return state.nodes.find(node => node.id === id).params.find(param => param.label === label)
    }
  },
  mutations: {
    updateNode(state, newNode) {
      const n = state.nodes.find(node => {
        return node.id == newNode.id
      })
      if (n !== null && n !== undefined) {
        state.nodes.splice(state.nodes.indexOf(n), 1)
      }
      state.nodes.push(newNode)
    }
  }
})

const socket = new WebSocket("ws://head01.hydra:5000/ws")

socket.onopen = function () {
  console.log("Connected to server")
}

socket.onmessage = function (msg) {
  const node = JSON.parse(msg.data)
  node.new_val.status = "Online"
  store.commit('updateNode', node.new_val)
}

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})


