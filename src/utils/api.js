//import $http from 'axios'
import Vue from 'vue';
// import 'whatwg-fetch'
// import 'es6-promise'
import vueResource from 'vue-resource'
Vue.use(vueResource)

let base = 'http://aliweixin.lenovo.com.cn/weixin3/index.php';
let smart = 'http://smart.lenovo.com.cn/v1'


//获取openid
export const getOpenId = params => {
    return Vue.http.get(`${smart}/userOpenId`, params)
}
// 首页banner
export const getBannerList = params => {
    return Vue.http.post(`${base}/zxg3_home_banner_api/GetBannerList.html`, params, {emulateJSON:true})
}
// 首页热门商品
export const getHotProductList = params => {
    return Vue.http.post(`${base}/zxg3_home_product_api/GetHotProductList.html`, params, {emulateJSON: true})
}


// 商品详情
export const getProductList= params => {
    return Vue.http.post(`${base}/zxg3_home_product_api/getProduct.html`, params, {emulateJSON:true})
}
// 商品详情待领取优惠券列表
export const getCouponOfProductList = params => {
  return Vue.http.get(`${smart}/coupon/getCouponOfProductList`, {params: params})
}
// 领取优惠券 
export const receiveCoupon = params => {
    return Vue.http.post(`${smart}/coupon/receiveCoupon`, params, {emulateJSON:true})
}
// 商品详情  sku标签
export const getSpecProductList = params => {
    return Vue.http.get(`${smart}/spec/getSpecProductList`, {params:params})
}


//订单页面 获取商品价格 
export const getTotal = params => {
    return Vue.http.post(`${base}/zxg3_home_order_api/getTotal.html`, params ,{emulateJSON:true})
}
// 订单页面 可用优惠券列表
export const getOrderCouponList = params => { 
    return Vue.http.get(`${smart}/coupon/getOrderCouponList`, {params:params})
}
