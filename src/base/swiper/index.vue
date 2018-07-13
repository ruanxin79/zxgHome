<template>
    <cube-slide ref="slide" :data="data">
        <cube-slide-item v-for="(item, index) in data" :key="index">
            <a href="javascript:;">
            <img :src="item.url">
            </a>
        </cube-slide-item>
    </cube-slide>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    name: 'vSwiper',
    props: ['data'],
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
   .cube-slide {
       height: 200px;
       max-height: 200px;
   }
   .cube-slide-item img{
        width: 100%;
   }
    
</style>
