<template>
  <div class="buy-modal" v-if="show">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container">
        <div class="cube-popup-content">
            <div class="cube-action-sheet-panel cube-safe-area-pb" style="">
                <h1 class="cube-action-sheet-title"></h1>
                <div class="cube-content">
                    <div class="cube-action-sheet-content">
                        <div class="buy-title">
                            <img :src="thumb" alt="">
                            <div class="buy-pri">
                                <p class="red">￥<span>299.90</span>元</p>
                                <p>商品编号：{{commId}}</p>
                            </div>
                        </div>
                        <ul class="cube-action-sheet-list">
                        <li class="cube-action-sheet-item border-bottom-1px cube-foo"> 
                            <div id="buyModal">
                                <p v-for="(item,index) in labelData" :key="index" @click="changeLabel(item , index)" :class="[!item.active ? '' : 'active', item.stock!=0 ? '' :'disabled']"><span class="name">{{item.label}}</span></p>
                            </div>
                        </li>
                        
                        </ul>
                    </div>
                </div> 
                <div class="cube-action-sheet-close" @click="toBuy"><span>立即下单</span></div>   
                <div class="cube-action-sheet-submit" @click="cancelClick('cancel')"><span class="cubeic-close"></span></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuyActionSheet',
  props: ['show','data'],
  data () {
    return {
        commId: '',
        labelData: [],
        serial_number: '',
        thumb: '',
    }
  },
  watch: {
      data () { 
        this.commId = sessionStorage.getItem('commId') ;
        this.labelData = this.data
      },
      labelData () {    
        this.labelData.map(item => {
            if(item['active']) {
                this.thumb = item.thumb
                this.commId = item.serial_number
            }
        })
      }
  },
  methods: {
    // 取消
    cancelClick (name) {
        if(name && this.item != this.serial_number) {
            this.$emit('showBuyModal',this.serial_number)
        } 
    },
    // 立即下单
    toBuy() {
        this.$emit('toBuy',this.commId)
    },
    // 选中商品标签切换样式
    changeLabel (item,index) {
        if(item.stock == 0 || item.active) return
        let newData = JSON.parse(JSON.stringify(this.labelData));
        newData.map((v,i)=> {
            newData[i].active = (index ==i) ? true : false
        })
        this.serial_number = item.serial_number
        this.thumb = item.thumb
        this.labelData = newData
    }
  },
  mounted () {
      
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .buy-modal {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        .cube-popup-mask {
            display: block;
        }
        .cube-action-sheet-close {
            padding: 16px;
            background-color: #ab9467;
            span {
                font-size: 16px;
                color: #ffffff;
            }
        }
        .cube-action-sheet-submit {
            position: absolute;
            right: 0;
            top: 15px;
        }
        .cube-popup-content {
            top: 0;

        }
        .cube-content {
            max-height: 300px;
            padding: 0 10px;
            overflow: scroll;
        }
        .label {
            line-height: 30px;
            text-align: left;
            padding-left: 16px;
            font-size: 14px;
            span {
               display: block
            }
        }
    } 
    .cubeic-close {
        border: 1px solid #ccc;
        border-radius: 50%;
        font-size: 14px; 
        padding: 3px;
        margin-right: 10px;
    }
    .buy-title {
        display: flex;
        height: 100px;
        img {
            height: 80px;
            width: 80px;
            border: 1px solid #ececec;
        }
        .buy-pri {
            margin-left: 10px;
            text-align: left;
            p {
                color: #b5b5b5;
                padding: 5px 0;
            }
            p span {
                font-size: 16px;
            }
            p.red {
                color: #d33131;
            }

        }
    }
    #buyModal {
        overflow: hidden;
        p {
            width: 80%;
            padding: 10px 2px 10px 0;
            margin-bottom: 5px;
            border: 1px solid #666666;
            color: #666666;
            border-radius: 20px;
            font-size: 14px; 
            text-align: left;
            .name {
                display: block;
                margin: 0 auto;
                width: 80%;
                font-size: 14px;
                white-space: nowrap;
                overflow : hidden;
                text-overflow: ellipsis;
            }
        }
        p.active {
            border: 1px solid #b6926f;
            color: #b6926f;
            font-weight: 600;
        }
        p:nth-child(odd) {
            margin-right: 2%;
        }
    }
    .cube-action-sheet-close span, .cube-action-sheet-item, .cube-action-sheet-title {
        white-space: pre-wrap;
    }
    
</style>
