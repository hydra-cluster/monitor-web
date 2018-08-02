<template>
<div class="tags has-addons">
    <span class="tag is-light" style="width: 80px">{{param.label}}</span>
    <span class="tag has-text-weight-bold" style="width: 60px" :class="status">{{value}}</span>
</div>
</template>

<script>
export default {
    name: 'tag',
    props: ['label','id'],
    computed: {
        param() {
            return this.$store.getters.getNodeParamByLabel(this.label, this.id)
        },
        status() {
            const node = this.$store.getters.getNodeById(this.id)
            if (node.status == "Offline") {
                return "has-background-grey-dark has-text-white"
            } else if (parseInt(this.param.value) > parseInt(this.param.danger_target)) {
                return "is-danger"
            } else if (parseInt(this.param.value) > parseInt(this.param.warning_target)) {
                return "is-warning" 
            }
            return "is-primary"
        },
        value() {
            return this.$store.getters.getNodeById(this.id).status == "Offline" ? "N/D" : this.param.value + this.param.unit
        }
    }
}
</script>
