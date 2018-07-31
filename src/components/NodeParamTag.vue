<template>
<div class="tags has-addons">
    <span class="tag is-light" style="width: 80px">{{p.label}}</span>
    <span class="tag has-text-weight-bold" style="width: 60px" :class="p.status">{{p.value}}</span>
</div>
</template>

<script>
export default {
    name: 'tag',
    props: ['param'],
    data: function () {
        return {
            p: this.param
        }
    }
}
</script>
