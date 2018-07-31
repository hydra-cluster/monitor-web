<template>
<div class="tile is-ancestor is-vertical">
  <div class="tile">
    <div class="tile">
      <div class="tile is-parent">
        <article class="tile is-child notification has-background-grey-light">
          <p class="title">One</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification has-background-grey-light">
          <p class="title">Two</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification has-background-grey-light">
          <p class="title">Three</p>
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
import Node from "./Node"
export default {
  name: 'cluster',
  components: {
    Node
  },
  computed: {
    nodes() {
      return this.$store.getters.getNodes;
    }
  }
}
</script>

<style>
</style>