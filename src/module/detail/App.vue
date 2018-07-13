<template>
  <div id="app">
    <v-swiper :data="productList.head_images"/>
    <section class="main">
      <div class="title">
        <div class="title-price"  v-if="productList.package_price">
            <span id="hidePrice red" style="display: none">押金 &nbsp;</span>
            <small class="red">¥</small>
            <small class="chi-money red">{{productList.package_price}}</small>
            <small class="red">元</small>
            <small class="pri-money" id="pri-money">¥{{productList.package_original_price}}元</small>
            <div data-role="trigProm" class="label-wrap clearfix" data-name="智享生活服务介绍" latag="latag_wx_zxg_prodetail606775_serviceinfo">
              <span class="label-icon">7天</span>
              <span class="label-icon">优选</span>
              <span class="label-icon ">管家</span>
              <span class="label-icon ">上门</span>
              <span class="label-icon">包邮</span>
            </div>
        </div>
        <p class="title-name">
          {{productList.abbreviation}}
        </p>
        <p class="title-info" v-html="productList.briefly"></p>
        <div class="title-activity red">
          <p class="activity-info">618领券活动，最高可优惠200元先到先得</p>
          <p class="activity-time">
            <span class="star-tine">活动时间：06.11-06.18</span>
            <span class="end-time">距结束还剩：01：23：34</span>
          </p>
        </div>
    </div>
    </section>
    <cube-button :light="true" @click="showModal('gifts')" class="gift-wrap" v-if="productList.gifts && productList.gifts.lenght!=0">
      赠品
      <span><i class="cubeic-label" v-for="(i,ind) in giftData" :key="ind">{{i.full_name}}</i></span>
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button :light="true" @click="showCouPonModal" class="coupon-wrap" v-if="couponList.length && productList !=0">
      领券
      <span><i class="cubeic-label">领券优惠券</i></span>
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button :light="true" @click="showModal('services')" class="serv-wrap" v-if="productList.services && productList.services.length!=0">
      服务
      <span><i class="cubeic-label" v-for="(i,ind) in servData" :key="ind">{{i.full_name}}</i></span>
      <i class="cubeic-arrow"></i>
    </cube-button>
    <cube-button  :light="true" @click="showModal('parts')" class="part-wrap" v-if="productList.parts && productList.parts.length!=0">
      配件
      <i class="cubeic-arrow"></i>
    </cube-button>
    <div class="detail-img">
        <img :src="item.image" alt="" v-for="(item, index) in productList.detail_images" :key="index"> 
    </div>
    <v-gift :show="isShowGift" :data="productList.gifts" @showGiftModal='showGiftModal'/>
    <v-serv :show="isShowServ" :data="productList.services" @showServModal='showServModal'/>
    <v-buy :show="isShowBuy" :data="SpecData" @showBuyModal="showBuyModal" @toBuy="toBuy"/>
    <div class="footer">
        <div>
          <a href="javascript:;" 
          @click="activeTab($event,1)"
          :class="active =='home' ? 'active' : ''">
            <i class="icon icon-home"></i>
            <span>首页</span>  
          </a>

          <a href="javascript:;" 
          @click="activeTab($event,3)"
          :class="active =='myorder' ? 'active' : ''">
            <span>{{buyTxt}}</span>  
          </a>
        </div>
    </div>
    <!-- <cube-button>Toast- with mask</cube-button> -->
  </div>
</template>

<script>
  import commonCenter from '../../common/js'
  import vSwiper from '../../base/swiper'
  import CutLine from '../../base/CutLine'
  import productItem from '../../components/productItem'
  import vServ from '../../components/ActionSheet/serv'
  import vPart from '../../components/ActionSheet/part'
  import vGift from '../../components/ActionSheet/gift'
  import vBuy from '../../components/ActionSheet/buy'

  import { getProductList, getCouponOfProductList, receiveCoupon, getSpecProductList} from "../../utils/api";
  export default {
    name: 'detail',
    data() {
      return {
        openId: 'oDFHdw039DxCdtIyIJnXu_hLiYdg',
        commId: '',
        productList: [],  //主商品详情
        couponList:[], //优惠券
        SpecData: [], //商品标签
        active: 'myorder',
        buyTxt: '立即购买',
        ActionSheet: 'coupon',
        stanName: '',

        isShowGift: false,
        giftData: [], // 已选促销
        isShowPart: false, 
        partData: [], // 已选配件
        isShowServ: false,
        servData: [], //已选服务
        isShowBuy:false, 
    

      }
    },
    components: {
      vSwiper,
      vServ,
      vPart,
      vGift,
      vBuy
    },
    methods: {
      postCoupon (item) {
        let _para = {
          coupon_id: item.coupon_id,
          openid: this.openId
        }
        if(item.receive == 1) {
          const toast = this.$createToast({
              txt: '您已领取过此优惠券',
              type: 'correct',
              time: 1500
            })
            toast.show()
          return  
        }
        receiveCoupon(_para).then(res => {    
          if(res.status_code ===200) {
            const toast = this.$createToast({
              txt: '领取成功',
              type: 'correct'
            })
            toast.show()
          }else {
            
            const toast = this.$createToast({
              txt: '优惠券已被抢光...',
              type: 'error'
            })
            toast.show()
          }
        })
      },
      showModal(name) {
        //促销
        if(name == 'gifts') {
          this.isShowGift = !this.isShowGift;
        }   
        // 服务
        else if(name == "services") { 
          this.isShowServ = !this.isShowServ;
        }
        // 配件
        else if(name == "parts") {
          this.showPartModal(this.productList.parts);
        }
        // 立即购买
        else if(name == 'buy') {
          // 如果是没有商品标签的直接跳转下单页面
          if(this.SpecData.length > 0) {
            this.isShowBuy = !this.isShowBuy;
          }else {
            this.toBuy(this.commId)
          }
        }
      },
      // 优惠券弹窗
      showCouPonModal() {
        this.$createActionSheet({
          title: '优惠券',
          pickerStyle: true,
          maskClosable: false,

          data: this.couponList.map(i => {
            return {
              content: `<div class="couponModal">
                  <img style="width: 100%" src="../../../static/images/coupon-status${i.receive == 0 ? '1':'4'}.png"/>
                  <div id="coupon-info" style="position: absolute;display: flex;top: 17px;left: 0;width:100%;padding: 0 16px;">
                    <p class="coupon-money" style="min-width:115px;text-align: center;line-height: 105px;font-size: 24px;color:#fff">￥<span style="font-size: 32px">${i.denomination}</span> <span style="font-size: 20px">元</span></p>
                    <p style="margin-left: 5px;">
                      <span style="text-align:left;display: block;font-size: 16px;margin-top: 35px;color:#fff;text-overflow: ellipsis;min-width: 200px;overflow: hidden;white-space: nowrap;">${i.name}</span>
                      <span style="text-align:left;display: block;font-size: 14px;color:#fff;margin-top:3px">有效期至 <small>${i.active_end_time}</small></span>
                    </p>
                  </div>
              </div>`,
              class: 'cube-foo'
            }
          }),
          onSelect: (item, index) => {
            this.postCoupon(this.couponList[index]) 
            this.showCouPonModal();       
          }
        }).show()
      },
      // 配件弹窗
      showPartModal(item) {
        let url = 'http://weixin.lenovo.com.cn/';
        this.$createActionSheet({
          title: '选配件',
          pickerStyle: true,
          maskClosable: false,

          data: item.map(i => {
            return {
              content: `<div class="partModal" style="display: flex;">
                  <img style="width: 100px;height: 100px;" src="${url}${i.thumb}"/>
                  <div style="flex: 1;position: relative;text-align: left; padding-left: 10px">
                    <p style="font-size: 14px; color: #b3b3b3;padding: 3px 0;">${i.full_name}</p>
                     <div class="title-price;" style="position: absolute; left: 10px; bottom:0;">
                        <small style="color:#ff0000">¥</small><small class="chi-money" style="color:#ff0000;font-size:14px">${i.package_price}</small><small style="color:#ff0000">元</small>
                        <small class="pri-money" style="text-decoration: line-through;padding-left:10px;font-size:12px">¥${i.package_original_price}元</small>
                    </div>
                  </div>
              </div>`,
              class: 'cube-foo'
            }
          }),
          onSelect: (item, index) => {
            
            window.location.href = `./detail.html?commId=${this.productList.parts[index].serial_number}&openId=${this.openId}` 
   
          }
        }).show()
      },
      // 赠品弹窗
      showGiftModal(item) {
        this.isShowGift = !this.isShowGift;
        if (item) {
          this.giftData = item;
        }
      },
      // 服务弹窗
      showServModal(item) {
        this.isShowServ = !this.isShowServ;

        if (item) {
          this.servData = item;
        }
      },
      // 立即购买弹窗
      showBuyModal(serial_number) {
        this.isShowBuy = !this.isShowBuy;
        
        if(serial_number) {
          this.showToastMask();
          this.getProductList(serial_number)
          window.history.pushState({ title: null }, null, `detail.html?commId=${serial_number}&openId=${this.openId}`)
        }
      },
      // 下单
      toBuy(product_id) {
        let _para = {
            open_id: this.openId,
            id: this.productList.id,
            phone: '',
            address: '',
            customer: '',
            product_id: product_id,
            gifts: this.giftData,//this.giftData.map(item=>{ return item.id}),
            services: this.servData,//this.servData.map(item=>{ return item.id}),
            parts: this.partData,//this.partData.map(item=>{ return item.id}),
            remark: '',
            coupon_code: '',
            additional: '',
          }
        sessionStorage.setItem('buyInfo',JSON.stringify(_para))
        window.location.href = `./orderDetail.html`
      },
      // 底部导航
      activeTab(e,n) {
        if(n == 1) {
          this.active = 'home'
          window.location.href = './index.html'
        }else if(n == 2) {
          this.active = 'serv'
        }else if(n == 3) { 
          // let _para = {
          //   open_id: this.openId,
          //   id: this.productList.id,
          //   phone: '',
          //   address: '',
          //   customer: '',
          //   product_id: this.productList.serial_number,
          //   gifts: this.giftData.map(item=>{ return item.id}),
          //   services: this.servData.map(item=>{ return item.id}),
          //   parts: this.partData.map(item=>{ return item.id}),
          //   remark: '',
          //   coupon_code: '',
          //   additional: '',
          // }
          // sessionStorage.setItem('buyInfo',JSON.stringify(_para))
          this.active = 'myorder'
          this.showModal('buy')
          //this.showBuyModal();
          //window.location.href = './orderDetail.html'
        }
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
      } ,
      // 优惠券
      getCouponProductList () { 
        let couponPara = {
          service_type: 1,
          serialnumber: this.commId,
          openid: this.openId
        }
        this.showToastMask();
        getCouponOfProductList(couponPara).then(res => {
          if(res.data.status_code === 200) {
            this.couponList = res.data.data
          }
          this.hideToastMask();
        })
          
      },
      // 获取商品标签
      getSpecProductList() {
        let SpecPara = {
          serial_number: this.commId,
        }
        getSpecProductList(SpecPara).then(res => {
          if(res.data.status_code ===200) {
            this.SpecData = res.data.data
            // 默认选中商品标签
            if(this.SpecData.length > 0) {
              this.SpecData.map(item => {
                item['active'] = (item.serial_number == this.commId)
              })
            }
          }
          // this.SpecData = [
          //   {
          //       "serial_number": "725759",
          //       "label": "32G + 绿色",
          //       "stock": 62,
          //       "package_price": "1000.01",
          //       "thumb":"http://weixin.lenovo.com.cn/img/zxg/5b0f69b2ac975.jpg"
          //   },
          //   {
          //       "serial_number": "994068",
          //       "label": "32G + 红色",
          //       "stock": 6,
          //       "package_price": "1008.01",
          //       "thumb":"http://weixin.lenovo.com.cn/img/zxg/5b0f6cdd513b1.jpg"
          //   }
          // ]
          
          
        })
      },
      // 获取主商品详情
      getProductList(serial_number) {
         let productPara = {
          serial_number: serial_number ? serial_number : this.commId,
          open_id: this.openId
        }
        getProductList(productPara).then(res => {
          if(res.data.status_code === 200) {
            this.productList = res.data.data;
            this.productList.head_images.map((item) => {
              item.url = `http://weixin.lenovo.com.cn${item.image}`
            })
            this.productList.detail_images.map((item) => {
              item.image = `http://weixin.lenovo.com.cn${item.image}`
            })
          }
          this.hideToastMask();
        })
      },
      init() {
        this.commId = commonCenter.getQueryString('commId')
        this.openId = commonCenter.getQueryString('openId');
        sessionStorage.setItem('openId',this.openId)
        this.getSpecProductList();
        this.getProductList();
        this.getCouponProductList();
      }
    },
    mounted() {
      this.init();
    }

  }
</script>

<style lang="scss" scoped>
@import '../../common/css/reset.css';

   #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e51;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 60px;
    background-color: #f2f2f2;
  }
  .red {
    color: #d33131;
  }
  .hidden {
    display: none;
  }
  .main {
    text-align: left;
    padding:  10px 5px;
    background-color: #ffffff;
    .title-name {
      font-size: 16px;
      font-weight: 500;
      color: #515151;
      padding: 10px 0;
    }
    .title-info {
      font-size: 14px;
      color: #6e6e6e;
    }
    .title-price {
      small {
        font-weight: 600;
      }
      .chi-money {
        font-size: 16px;
      }
      .pri-money {
        font-size: 14px;
        color: #9b9b9b;
        padding-left: 10px;
        text-decoration: line-through; 
      }
    }
    .label-wrap {
      padding: 10px 5px;
      display: inline-block;
      .label-icon {
        color: #b6926f;
        background-color: #f5f0ec;
        border-radius: 3px;
        padding: 2px 5px;
      }
    }

    .title-activity {
      margin-top: 10px;
      .activity-info {
        font-size: 14px;
        font-weight: 500;
      }
      .activity-time {
        display: flex;
        span {
          flex: 1;
          padding: 10px 0;
        }
        span.end-time {
          font-weight: 500;
          text-align: right;
        }
      }
    }
  }


  .cube-foo .couponModal {
    .couponImg {
      width: 100% !important;
    }
  }



  .cube-btn {
    text-align: left;
    padding: 17px 5px;
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
    max-width: 80%;
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


  .detail-img {
    margin-top: 10px;
    img{
      width: 100%;
    }
  } 
  .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #ececec;
      z-index: 99;
      >div {
        display: flex;
        >a {
          flex: 1;
          font-size: 14px;
          color: #666666;
        }
        >a span {
          padding-top: 5px;
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



   .pop_top{
      width:100%;
      text-align: center;
      line-height: 40px;
      background: rgba(75,75,75,0.8);
      position: fixed;
      top: 0;
      left: 50%;
      color: white;
      transform: translate3d(-50%, -100%, 0);
      transition: .2s ease-out;
      visibility: hidden;
      white-space: nowrap;
      word-break: keep-all;
      text-overflow: ellipsis;
  }
  .pop_show{
      transform: translate3d(-50%, 0%, 0) ;
      visibility: visible;
  }
 
 
 
 
  .toast{
      width:100%;
      height:100%;
      background: rgba(75,75,75,.8);
      position: absolute;
      top: 0px;
      z-index: 2001;
      visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-delay: 0.2s;
  }
  .show_toast{
      visibility: visible;
  }

  .toast .content{
      width: 80%;
      border:1px solid #ddd;
      border-radius: 5px;
      background-color: white;
      visibility: hidden;
      position: absolute;
      z-index: 2002;
      transition: .3s ease;
      opacity: 0;
      transform: scale(0.8);
  }
  .toast .scale_content{
      transform: scale(1);
      transition-delay: 0.15s;
      visibility: visible;
      opacity: 1;
  }
  .toast_title{
      line-height: 30px;
      padding: 5px;
      text-align: center;
  }
  .toast_info{
      line-height: 30px;
      padding: 10px;
      color: #999999;
      text-align: center;
  }
  .toast_btns{
      border-top: 1px solid #ddd;
  }
  .toast_btns button:active{
      opacity: 0.5;
  }
  .toast_btns button{
      width: 50%;
      border-width: 0px;
      float: left;
      background-color: transparent;
      padding: 10px;
      outline:none;
  }
  .toast_btns button:nth-child(1){
      border-right: 1px solid #ddd;
  }
  .sure_btn{
      color: #00a4e4;
  }

  .servList{
    p {
      width: 50%;
      display: inline-block;
    }
  }

</style>
