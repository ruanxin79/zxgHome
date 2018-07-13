<template>
  <div class="swipe-wrapper">
    <cube-scroll>
      <cube-swipe>
        <transition-group name="swipe" tag="ul" class="vertical" >
          <li  v-for="(item,index) in data" :key="index">
               <div class="item-inner" @click='onItemClick(item)'>
                <div class="icon">
                  <img :src="item.thumb">
                </div>
                <div class="text">
                  <h2 class="item-name" v-html="item.abbreviation"></h2>
                  <p class="item-desc" v-html="i.selling_point" v-for="(i, ind) in item.selling_points" :key="ind"></p>
                  <div class="item-price">
                      <p>
                        <span class="price">￥{{item.price}}元</span>
                        <span class="del-price">￥{{item.package_price}}元</span>
                      </p>
                  </div>
                </div>
               </div> 
          </li>
        </transition-group> 
      </cube-swipe>
    </cube-scroll>
  </div>
</template>

<script>
    export default {
        name: 'productItem',
        props: ['data'],
        data() {
            return {
            
            }
        },
        watch: {
            data () { }
        },
        methods: {
            onItemClick(item) {
               let openId = 'oDFHdw039DxCdtIyIJnXu_hLiYdg'
               window.location.href = `./detail.html?commId=${item.serial_number}&openId=${openId}`
            }     
        },
        mounted() {
            
        },
        created() {
            
        }

    }
</script>

<style lang="scss" scoped>
    .swipe-wrapper {
        padding:0 5px; 
        margin-bottom: 60px;
        .swipe-item-wrapper {
            margin-top: 10px;
        }
    }
    .vertical {
        overflow: hidden;
        li {
            display: inline-block;
            width: 49%;
            min-height: 200px;
            margin-top: 10px;
            float: left;
            background-color: #ffffff;
            img {
                width: 100%;
            }
        }
        li:nth-chlid(odd) {
            clear: both;
        }
        li:nth-child(even) {
            margin-left: 2%;
        }
        .item-inner {
            .text {
                flex-direction: column ;
                text-align: left;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                width: 100%;
                padding: 0 3px;
                .item-name{
                    padding: 5px 0;
                    width: 100%;
                    font-size: 14px;
                    color: #4a4a4a;
                    white-space: nowrap;
                    overflow : hidden;
                    text-overflow: ellipsis;
                }
                .item-desc {
                    white-space: nowrap;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    color: #9b9b9b;
                }
                .item-price {
                    display:table-cell; 
                    vertical-align:bottom;
                    flex: 1;
                    position: relative;
                    line-height: 32px;
                }
                
                .price {
                    color: #ff0000;
                    font-size: 14px;
                }
                .del-price {
                    float: right;
                    padding-right: 5px; 
                    text-decoration: line-through;
                    color:#999;
                }
                
            }
            .icon {
                overflow: hidden;
                img {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
</style>

