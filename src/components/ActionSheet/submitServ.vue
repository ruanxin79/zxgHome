<template>
  <div class="serv-modal" v-if="show">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container">
        <div class="cube-popup-content">
            <div class="cube-action-sheet-panel cube-safe-area-pb" style="">
                <h1 class="cube-action-sheet-title border-bottom-1px">服务</h1>
                <div class="cube-content">
                    <div class="cube-action-sheet-content">
                        <ul class="cube-action-sheet-list">
                            <li class="cube-action-sheet-item cube-foo">
                            <div id="servModal">
                                <p v-for="(item,index) in list" :key="index" @click="changeServ(item)" :class="item.active ? 'active' : ''">
                                    {{item.full_name}}
                                </p>
                            </div>
                               
                            </li>
                        </ul>
                    </div>
                </div>    
                <div class="cube-action-sheet-submit">
                    <span @click="handelClick">取消</span>
                    <span class="submit" @click="handelClick('submit')">确定</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitServActionSheet',
  props: {
    show: {
        type:Boolean
    },
    servData:{
        type:  Array
    }
  },
    data(){
        return{
            list: []
        }
    },
    watch:{
        servData() {
           this.list = JSON.parse(JSON.stringify(this.servData))    
        }
    },
  methods: {
    handelClick (type) {
        let _obj = [] 
        if(type) {
            this.list.map( item => {
                if(item.active) {
                    _obj.push(item.id)
                }
            })
        }
        this.$emit('showServModal',_obj)
    },
    changeServ (item) {
        item.active = !item.active;
    },
  },
  mounted () {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .serv-modal {
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
            position: absolute;
            left: 0;
            top: 16px;
            span {
                padding: 16px;
            }
        }
        .cube-action-sheet-submit {
            height: 50px;
            line-height: 50px;
            display: flex;
            border-top: 1px solid #B49D72;
            span {
                flex: 1;
                font-size: 16px;
                color: #B49D72;
            }
            .submit {
                background-color: #B49D72;
                color: #ffffff;
            }
        }
        .cube-popup-content {
            top: 0;
        }
        .cube-content {
            min-height: 230px;
            max-height: 250px;
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
    .cube-action-sheet-close span, .cube-action-sheet-title {
        white-space: pre-wrap;
    }
    .cube-action-sheet-title {
        text-align: left;
        color: #9B9B9B;
        font-size: 14px;
        border-bottom: 1px solid #CCCCCC; 
    }
    #servModal,#partModal {
        overflow: hidden;
        p {
            padding: 10px 0;
            text-align: left;
            white-space: nowrap;
            overflow : hidden;
            text-overflow: ellipsis;
            background: url(../../common/images/check.png) no-repeat right center;
            background-size: 6%;
        }
        p.active {
            background: url(../../common/images/checked.png) no-repeat right center;
            background-size: 6%;
        }
    }
</style>
