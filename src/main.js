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
        return node.hostname == newNode.hostname
      })
      if (!lodash.isEmpty(n)) {
        state.nodes.splice(state.nodes.indexOf(n), 1)
      }
      state.nodes.push(newNode)
    }
  }
})

var uuid = "web" + Math.floor(new Date().valueOf() * Math.random()) + ".hydra"
const socket = new WebSocket("ws://localhost:5000/ws?id=" + uuid + "&mode=web")

socket.onopen = function () {
  console.log("Connected to server")
}

socket.onmessage = function (msg) {
  const message = JSON.parse(msg.data)
  console.log(message)
  switch(message.Action) {
    case "registered-agents":
      lodash.forEach(message.Content.registered, function(node) {
        node.status = "Offline"
        store.commit('updateNode', node)
      })
      break
    case "updated-agent":
      message.Content.status = "Online"
      store.commit('updateNode', message.Content)
      break
  }
}

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})


