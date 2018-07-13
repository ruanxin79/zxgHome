<template>
  <div class="buy-modal" v-if="show">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container">
        <div class="cube-popup-content">
            <div class="cube-action-sheet-panel cube-safe-area-pb">
                <div class="cube-content">
                    <p :class="checked ? 'active' : ''" @click='checkCover'><span>个人-商品明细</span></p>
                    <p :class="!checked ? 'active' : ''" @click='checkCover'><span>公司-商品明细</span></p>
                    <div class="model">
                        <span>抬头</span>
                        <cube-input v-model="PersonalValue" :placeholder="message.PersonalPlaceholder" v-if="checked"></cube-input>
                        <cube-input v-model="CompanyValue" :placeholder="message.CompanyPlaceholder" v-if="!checked"></cube-input>
                    </div>
                    <div class="model" v-if="!checked">
                        <span>税号</span>
                        <cube-input v-model="invoiceNumber" :placeholder="message.invoicePlaceholder"></cube-input>
                    </div>
                </div> 
                <div class="cube-action-sheet-close" @click="submitBtn"><span>确定</span></div>   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const MESSAGE = {
    PersonalPlaceholder: '请输入个人或姓名',
    CompanyPlaceholder: '请输入公司名称',
    invoicePlaceholder: '请输入税号',
}
export default {
  name: 'CoverActionSheet',
  props: ['show'],
  data () {
    return {
        checked: true, // true-个人，false-公司
        invoice: '', // 发票抬头
        PersonalValue: '', // 个人发票抬头
        CompanyValue: '', //公司发票抬头
        invoiceNumber: '', //税号 
        message: MESSAGE
    }
  },
  watch: {
      
  },
  methods: {
    // 发票弹窗确定按钮
    submitBtn () {
        let _para = {
            invoice_personal: this.checked ? this.PersonalValue : "",
            invoice_company:  this.checked ? "" : this.CompanyValue,
            invoice_sign: this.checked ? "" : this.invoiceNumber
        }
        this.$emit('showCoverModal', _para)
    },
    // 选择发票类型
    checkCover () {
        this.checked = !this.checked;
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
            padding: 10px;
            background-color: #ab9467;
            span {
                font-size: 16px;
                color: #ffffff;
            }
        }
        .cube-popup-container {
            width: 70%;
            left: 0;
            right: 0;
            margin: 0 auto;
            transform: translate(100%,60%);
            -webkit-transform: translate(100%, 60%);
            p {
                padding: 5px 0;
                background: url(../../common/images/qqq.png) no-repeat 20px center;
                background-size: 8%;
            }
            p.active {
                background: url(../../common/images/ggg.png) no-repeat 20px center;
                background-size: 8%;
            }
        }
        .model {
            display: flex;
            margin: 3px 0;
            padding: 0 20px;
            span {
                line-height: 40px;
                margin-right: 10px;
            }
            .cube-input {
                flex: 1;
                .cube-input-field {
                    padding: 5px 10px;
                }
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
            padding: 20px 10px;
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
