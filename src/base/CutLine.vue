<template>
    <section class="sp-line">
        <div class="line-r"></div>
        <div class="line-content">{{content}}</div>
        <div class="line-r"></div>
    </section>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['content'],
    methods: {

    }
}
</script>

<style scoped lang="scss">
    .sp-line {
        height: 50px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
        .line-r {
            width: 100px;
            height: 23px;
            border-bottom: 1px solid #c9c9c9;
        }
        .line-content {
            font-size: 14px;
            margin-left: 10px;
            margin-right: 10px;
            color: #666666;
            line-height: 50px;
        }
    }
</style>



