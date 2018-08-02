<template>
<div class="tile is-ancestor is-vertical">
  <div class="tile">
    <div class="tile">
      <div class="tile is-parent chart-tile">
        <article class="tile is-child">
          <chart></chart>
        </article>
      </div>
    </div>
  </div>
  <div class="tile">
    <div class="tile is-vertical">
      <node v-for="(node, index) in nodes" :key="index" :id="node.id"></node>
    </div>
  </div>
</div>
</template>

<script>
import Node from './Node'
import Chart from './Chart'
export default {
  name: 'cluster',
  components: {
    Node,
    Chart
  },
  computed: {
    nodes() {
      return this.$store.getters.getNodes
    }
  }
}
</script>

<style scoped>
  .chart-tile {
    min-width: 0;
  }
</style>