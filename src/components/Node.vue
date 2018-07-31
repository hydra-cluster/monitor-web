<template>
<div class="tile is-parent is-vertical">
    <div class="tile">
        <div class="tile is-parent notification has-background-grey-darker">
            <article class="tile is-child">
                <nav class="level is-mobile">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="subtitle is-6 is-spaced">Status</p>
                            <p class="title is-6">Offline</p>
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
                                <!--
                                <div class="control" v-for="(p, index) in serverParams" :key="index">
                                    <tag :param="p"></tag>
                                </div>
                                -->
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
import moment from 'moment'
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
      ip() {
        const n = this.node
        var ips = n.ip
        n.network_interfaces.forEach(network => {
            if (network.ip != n.ip) {
                ips += "<br>" + network.ip
            }
        });
        return ips
      },
      uptime() {
          return moment(this.node.last_connection_at).fromNow()
      }
  }
}
</script>

<style>
</style>