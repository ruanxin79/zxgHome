<template>
  <div id="app" v-show="isShow">
    <div class="header_bg"></div>
    <cube-button :light="true" class="reAddress">
      添加收货地址
      <i class="cubeic-arrow"></i>
    </cube-button>
    <section class="main">
        <div class="product">
          <img :src="productList.thumb" alt="" class="product_img">
          <div class="product_info">
            <h3 class="product_title">{{productList.full_name}}</h3>
            <p>{{productList.briefly}}</p>
            <p class="product_serv"><span>包邮</span><span v-if="list.gifts.length != 0">赠品</span><span v-if="productList.services.length != 0">{{productList.services[0].briefly}}</span></p>
            <p class="product_pir">
              <span>￥<small>{{productList.package_price}}</small></span>
              <span class="ori">￥{{productList.package_original_price}}</span>
            </p>
          </div>

        </div>
    </section>
    <cube-button :light="true" class="cover" @click="showCover">
      发票信息
      <span><i class="cubeic-label">个人-商品明细</i></span>
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button :light="true" class="serv" @click="showServ">
      服务
      <span><i class="cubeic-label">上门安装</i><i class="cubeic-label">7天无理由</i></span>
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button :light="true" class="coupon" @click="showCoupon">
      优惠券
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button :light="true" class="distribution">
      配送
      <span><i class="cubeic-label">免邮</i></span>
    </cube-button>
    <div class="remark">
    <label>备注:</label>
      <cube-input v-model="remark" :placeholder="placeholder"></cube-input>
    </div>
    <div class="notes">
      <p>注：1.【7天无条件退货】时间从快递签收日算起。</p>
      <p>2.自卖家发货日起,15天后交易自动完成。</p>
      <p>3.开具发票时,将会以你的实付金额开具。</p>
      <p>3.若商品价格或订单异常,我们将会与您联系取消订单并全额退款。</p>
    </div>
    <v-cover :show="isShowCover" @showCoverModal="showCoverModal"/>
    <v-submitserv :show="isShowServ" :servData="list.services" @showServModal="showServModal"/>
    <div class="footer">
        <div>
          <a href="javascript:;" class="pri">
            实付金额:
            <span>{{total}}</span>  
          </a>
          <a href="javascript:;" 
          class="buy"
          :class="active =='myorder' ? 'active' : ''">
            <span>{{buyTxt}}</span>  
          </a>
        </div>
    </div>
  </div>
</template>

<script>
  import {getProductList, getTotal, getOrderCouponList} from "../../utils/api";
  import vCover from '../../components/ActionSheet/cover';
  import vSubmitserv from '../../components/ActionSheet/submitServ.vue';
  export default {
    name: 'app',
    data() {
      return {
        openId: '',
        commId: '',
        buyTxt: '立即下单',
        remark: '',
        isShow: false,
        isShowCover: false,
        isShowServ: false,
        total: '0',
        list: {   // 已选择的赠品、服务
          gifts: [],
          services: [],
        },
        servData: [], 
        productList: { // 主商品信息
          gifts: [],
          services: []
        },
        couponItem: [], // 可用优惠券列表
        placeholder: '请输入您所需要备注的信息',
        
      }
    },
    components: {
        vCover,
        vSubmitserv
    },
    methods: {
      // 优惠券弹窗
      showCoupon () {
        let _para = {
          service_id: this.list.id,
          openid: this.openId,
          total: this.total
        }
        getOrderCouponList(_para).then( res => {
          if(res.data.status_code === 200){
            this.couponItem = res.data.data
            console.log(this.couponItem)
          }
        })

      },
      // 发票弹窗
      showCover () {
        this.isShowCover = !this.isShowCover
      },
      // 选择的发票类型 税号
      showCoverModal (obj) {
        this.showCover();
        if(obj) {
          console.log(obj)
        }
      },
      // 服务弹窗
      showServ () {
        this.isShowServ = !this.isShowServ
      },
      // 选择服务
      showServModal (obj) {
        this.showServ();
        if(obj) {
          console.log(obj)
        }
      },
      getProductList(serial_number) {
         let productPara = {
          serial_number: serial_number ? serial_number : this.commId,
          open_id: this.openId
        }
        this.showToastMask() 
        getProductList(productPara).then(res => {
          if(res.data.status_code === 200) {
            this.productList = res.data.data;
            this.productList.thumb = `http://weixin.lenovo.com.cn${this.productList.thumb}`
            this.productList.head_images.map((item) => {
              item.url = `http://weixin.lenovo.com.cn${item.image}`
            })
            this.productList.detail_images.map((item) => {
              item.image = `http://weixin.lenovo.com.cn${item.image}`
            })
            this.isShow = true;
          }
          this.hideToastMask();
        })
      },
      // 计算总价
      getProductTotal () {
        let _para = {
            product_id: this.list.id,
            gifts: this.list.gifts,
            services: this.list.services,
            parts: this.list.parts
        };
        getTotal(_para).then(res => {
          if(res.data.status_code ===200) {
            this.total = res.data.data.total;
          }
        })
      },
      showToastMask () {
        const toast = this.$createToast({
          txt: 'Loading...',
          mask: true,
          time: 0
        })
        toast.show()
      },
      hideToastMask () {
        const toast = this.$createToast({
          txt: 'Loading...',
          mask: true,
          time: 1000
        })
        toast.show()
      },
      // 初始化
      init() {
        this.openId = sessionStorage.getItem('openId');
        this.list = JSON.parse(sessionStorage.getItem('buyInfo'));
        this.list.services.map(item => {
          item.active = false
        })
        this.commId = this.list.product_id
        this.getProductList();
        this.getProductTotal();
      }
    },
    mounted () {
      this.init()
    }
    
  }
</script>

<style lang='scss' scoped>
@import '../../common/css/reset.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f2f2f2;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;
  }
  .header_bg {
    height: 5px;
    background-image: url(../../common/images/header_01.jpg);
    background-repeat: repeat-x;
  }
   .cube-btn {
    text-align: left;
    padding: 17px 10px;
    margin-top: 10px;
    background: #ffffff;
    color: #666666;
    display: flex;
    
  }
  .cube-btn .cubeic-arrow {
    flex: 1;
    text-align: right;
  }
  .cube-btn span {

    white-space: nowrap;
    overflow : hidden;
    text-overflow: ellipsis;
    .cubeic-label {
      // background-image: url(../../../static/images/coupon.jpg);
      // background-repeat: no-repeat;
      // background-size: 100%;
      font-size: 12px;
      transform: scale(1);
      display: inline-block;
      margin-left: 5px; 
      color: #b6926f;
      background-color: #f5f0ec;
      border-radius: 3px;
      padding:3px 5px;
    }
  }
  .distribution span,.cover span,.serv span{
    display: inline-block;
    width: 100%;
    text-align: right;
    .cubeic-label {
      font-size: 14px;
      background-color: transparent;
      color: #666666; 
    }
  }
  .remark {
    display: flex;
    margin-top: 10px;
    background-color: #ffffff;
    label {
      width: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #666666;
    }
    .cube-input {
      flex: 1;
    }
    .cube-input_active {
      border: none;
    }
  }
  .notes {
    border-top: 1px solid #ecebeb; 
    background-color: #ffffff;
    padding: 10px 0;
    p{
      text-align: left;
      color: #9b9b9b;
      font-size: 16px;
      padding: 10px;
    }
  }
  .main {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    background-color: #f8f8f8;
    .product {
      width: 100%;
      .product_img {
        display: inline-block;
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin-right: 10px; 
      }
      .product_info {
        display: inline-block;
        width:calc((100%) - 130px);
        text-align: left;
        padding-right: 5px; 
      }
      .product_title {
        font-size: 16px;
        font-weight: 600;
        color: #585858;
        padding: 10px 0;
      }
      p {
        color: #b7b7b7;
        padding: 3px 0;
      }
      .product_serv {
        line-height: 24px;
        white-space: nowrap;
        overflow : hidden;
        text-overflow: ellipsis;
        span{
            background-color: #f5f0ec;
            color: #af8762;
            margin-right: 5px;
            padding: 2px 5px;
            border-radius: 3px;
        }
      }
      .product_pir span{
        color: #d33131;
        small {
          font-size: 14px;
        }
      }
      .product_pir .ori {
        margin-left: 10px;
        color: #9b9b9b;
        text-decoration: line-through;
      }
    }
  }
  .my-title p{
    padding: 5px 0;
    text-align: center
  }
  .cube-dialog-btn_highlight {
    color: #ffffff;
    background-color: #ab9467;
  }
  .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #ffffff;
      z-index: 99;
      >div {
        display: flex;
        >a {
          font-size: 14px;
          color: #666666;
          padding: 15px 0;
        }
        >a span {
          padding-top: 5px;
        }
        .buy {
          width: 40%;
          background-color: #ab9467;
          color: #ffffff;
          font-size: 16px;
        }
        .pri {
          flex: 1;
          text-align: right;
          padding-right: 10px;
          span {
            color: #d33131;
            font-size: 18px;
            font-weight: 600;
          }
        }

      }
    .icon {
      width: 100%;
      min-height: 30px;
      display: block;
    }
    .icon.icon-home {
      background: url(../../common/images/bar_index.png) no-repeat;
      background-position: 50%;
      background-size: 10%;
    } 
    .icon.icon-serv {
      background: url(../../common/images/bar_serv.png) no-repeat;
      background-position: 50%;
      background-size: 10%;
    } 
    .icon.icon-use {
      background: url(../../common/images/bar_me.png) no-repeat;
      background-position: 50%;
      background-size: 10%;
    } 
    .active {
      line-height: 50px;
      background-color: #ab9467;
      span {
        color: #ffffff;
        font-size: 18px;
      }
      .icon.icon-home {
        background: url(../../common/images/bar_home.png) no-repeat;
        background-position: 50%;
        background-size: 10%;
      } 
      .icon.icon-use {
        background: url(../../common/images/bar_click_me.png) no-repeat;
        background-position: 50%;
        background-size: 10%;
      } 
    }
  }
</style>
