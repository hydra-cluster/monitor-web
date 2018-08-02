<template>
<div class="tile is-parent is-vertical">
    <div class="tile">
        <div class="tile is-parent notification" :class="statusClass">
            <article class="tile is-child">
                <nav class="level is-mobile">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Status</p>
                            <p class="title is-6">{{node.status}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Hostname</p>
                            <p class="title is-6">{{node.hostname}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">IP Address</p>
                            <p class="title is-6" v-html="ip"></p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Kernel</p>
                            <p class="title is-6">{{node.kernel}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Distro</p>
                            <p class="title is-6">{{node.distro}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Model</p>
                            <p class="title is-6">{{node.model}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Agent uptime</p>
                            <p class="title is-6">{{uptime}}</p>
                        </div>
                    </div>
                </nav>
            </article>
        </div>
    </div>
    <div class="tile ">
        <div class="tile is-parent">
            <article class="tile is-child">
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <div class="field is-grouped">
                                <p class="control">
                                    <a class="button is-warning">
                                        <span class="icon">
                                            <i class="fa fa-exclamation-triangle"></i>
                                        </span>
                                        <span>Reboot</span>
                                    </a>
                                </p>
                                <p class="control">
                                    <a class="button">
                                        <span class="icon">
                                            <i class="fa fa-power-off"></i>
                                        </span>
                                        <span>Shutdown</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <div class="field is-grouped is-grouped-multiline">
                                <div class="control" v-for="(p, index) in node.params" :key="index">
                                    <tag :label="p.label" :id="node.id"></tag>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </nav>
            </article>
        </div>
    </div>
</div>
</template>

<script>
import Tag from './NodeParamTag'
export default {
  name: 'node',
  props: ['id'],
  components: {
    Tag
  },
  computed: {
    node() {
        return this.$store.getters.getNodeById(this.id)
    },
    statusClass() {
        return this.node.status == "Offline" ? "has-background-danger" : "has-background-grey-darker"
    },
    ip() {
        const n = this.node
        var ips = n.ip
        n.network_interfaces.forEach(network => {
            if (network.ip != n.ip) {
                ips += "<br>" + network.ip
            }
        })
        return ips
    },
    uptime() {
        return this.node.status == "Online" ? this.$moment(this.node.last_connection_at).fromNow() : "N/D"
    }
  },
  created: function() {
      this.timer = setInterval(this.verifyStatus, 5000)
  },
  methods: {
      verifyStatus: function() {
          const node = this.$store.getters.getNodeById(this.id)
          const diff = this.$moment().diff(this.$moment(node.last_updated_at), 'seconds')

          if (diff > 20 && node.status == "Online") {
              node.status = "Offline"
              this.$store.commit('updateNode', node)
          }
      }
  },
  beforeDestroy() {
      clearInterval(this.timer)
  }
}
</script>

<style>
</style>