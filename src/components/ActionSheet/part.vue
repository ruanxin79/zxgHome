<template>
  <div class="part-modal" v-if="show">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container">
        <div class="cube-popup-content">
            <div class="cube-action-sheet-panel cube-safe-area-pb" style="">
                <h1 class="cube-action-sheet-title border-bottom-1px">选配件</h1>
                <div class="cube-content">   
                    <!-- <h2 class="label partlabel"><span v-for="(i,ind) in partlabel" :key="ind">{{i}}</span></h2> -->
                    <div class="cube-action-sheet-content">
                        <ul class="cube-action-sheet-list">
                        <li class="cube-action-sheet-item border-bottom-1px cube-foo"
                            v-for="(item,index) in data" :key="index"> 
                            111111
                        </li>
                        
                        </ul>
                    </div>
                </div>    
                <div class="cube-action-sheet-cancel" @click="handelClick"><span>取消</span></div>
                <div class="cube-action-sheet-submit" @click="handelClick('submit')"><span>确定</span></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partActionSheet',
  props: ['show','data'],
  data () {
    return {
        partlabel: []
    }
  },
  watch: {
      data () { 
          console.log(this.data)
      },
  },
  methods: {
    handelClick (name) {
        let  _para = {
            services: this.servlabel,
            parts: this.partlabel
        } 
        if(name) {
            this.$emit('showPartModal', _para)
        }  
    },
    changeLabel (item,name) {
        // item.active = !item.active;
        // if(name =='partModal') {
        //     if(this.partlabel.indexOf(item.full_name)!=-1) {
        //         this.partlabel.splice(this.partlabel.indexOf(item.full_name))
        //     }else {
        //         this.partlabel.push(item.full_name)
        //     }
        // }else if(name == 'servModal') {
        //     if(this.servlabel.indexOf(item.full_name)!=-1) {
        //         this.servlabel.splice(this.servlabel.indexOf(item.full_name))
        //     }else {
        //         this.servlabel.push(item.full_name)
        //     }
        // }
    }
  },
  mounted () {
      
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .part-modal {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        .cube-popup-mask {
            display: block;
        }
        .cube-action-sheet-cancel {
            position: absolute;
            left: 0;
            top: 0;
            span {
                padding: 16px;
            }
        }
        .cube-action-sheet-submit {
            position: absolute;
            right: 0;
            top: 15px;
            span {
                padding: 16px;
                font-size: 16px;
            }
        }
        .cube-popup-content {
            top: 0;

        }
        .cube-content {
            max-height: 300px;
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
    .cube-action-sheet-cancel span, .cube-action-sheet-item, .cube-action-sheet-title {
        white-space: pre-wrap;
    }
    #servModal,#partModal {
        overflow: hidden;
        p {
            width: 47%; 
            float: left;
            padding: 5px 2px 5px 0;
            margin-bottom: 5px;
            border: 1px solid #666666;
            color: #666666;
            border-radius: 3px;
            font-size: 14px; 
            text-align: left;
            display: flex;
            .name {
                flex: 1;
                text-indent: 2px;
                white-space: nowrap;
                overflow : hidden;
                text-overflow: ellipsis;
            }
            .chi {
                width: 40px;
                text-align: right
            }

        }
        p.active {
            color: #ffffff;
            border: 1px solid transparent;
            background-color: #ab9467;
        }
        p:nth-child(odd) {
            margin-right: 2%;
        }
    }
</style>
