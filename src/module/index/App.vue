<template>
  <div id="app">
    <div class="home">
      <v-swiper :data="bannerList"/>
      <!-- <CutLine :content="content"/> -->
      <ul class="scrollNav">
        <li  v-for="(item,index) in navList" :key="index" :class=" index==0 ? 'active':''">
          <span>
            {{item.text}}
          </span>
        </li>
      </ul>
      <product-item :data="hotList"/>
      <div class="footer">
        <div>
          <a href="javascript:;" 
          @click="activeTab($event,1)"
          :class="active =='home' ? 'active' : ''">
            <i class="icon icon-home"></i>
            <span>首页</span>  
          </a>
          <a href="javascript:;" 
          @click="activeTab($event,2)"
          :class="active =='serv' ? 'active' : ''">
            <i class="icon icon-serv"></i>
            <span>客服</span>  
          </a>
          <a href="javascript:;" 
          @click="activeTab($event,3)"
          :class="active =='myorder' ? 'active' : ''">
            <i class="icon icon-use"></i>
            <span>我</span>  
          </a>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  import vSwiper from '../../base/swiper'
  import CutLine from '../../base/CutLine'
  import productItem from '../../components/productItem'
  import Cube from 'cube-ui'
  import { getBannerList, getHotProductList,getOpenId } from "../../utils/api";

  export default {
    name: 'app',
    data() {
      return {
        bannerList: [],
        hotList: [],
        content: '热门商品',
        active: 'home',
        navList:[{text:'精选商品'},{text:'租赁试用'},{text:'安装调试'},{text:'保养升级'},{text:'保养升级1'},{text:'保养升级2'},{text:'保养升级3'}]
      }
    },
    components: {
      Cube,
      vSwiper,
      CutLine,
      productItem
    },
    watch: {
      
    },
    methods: {
      activeTab (e,n) {
        if(e.currentTarget.className == 'active') return;
        if(n == 1) {
          this.active = 'home'
        }else if(n == 2) {
          this.active = 'serv'
        }else if(n == 3) {
          this.active = 'myorder'
          //window.location.href = './detail.html'
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
      }
    },
    created () {
      let bannerPara = {
        page: 1,
        index: 4,
        type: 0
      }
      let hotPara = {
        page: 1,
        index:20,
        index_show:1
      }
      this.showToastMask();
      getBannerList(bannerPara).then(res => {
        if(res.data.status_code === 200) {
            this.bannerList = res.data.data.list
            this.bannerList.map((item)=> {
              item.url = `http://weixin.lenovo.com.cn${item.url}`
            })
        }
      })
      getHotProductList(hotPara).then(res => {
        if(res.data.status_code === 200) {
          this.hotList = res.data.data.list
          this.hotList.map((item)=> {
            item.thumb = `http://weixin.lenovo.com.cn${item.thumb}`
          })
          this.hideToastMask();
        }
      })
    },
    
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
  .home {
    width: 100%;
  }
  .scrollNav {
    overflow-x: auto;
    display: flex;
    background-color: #ffffff;
    li {
      padding: 10px 20px;
      white-space:nowrap;
      span {
        padding-bottom: 5px; 
        font-size: 14px;
      }
    }
    li.active span {
      border-bottom: 1px solid #af8761;
      color: #af8761;
    }
  }
  .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px 0;
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
      background-size: 15%;
    } 
    .icon.icon-serv {
      background: url(../../common/images/bar_serv.png) no-repeat;
      background-position: 50%;
      background-size: 15%;
    } 
    .icon.icon-use {
      background: url(../../common/images/bar_me.png) no-repeat;
      background-position: 50%;
      background-size: 15%;
    } 
    .active {
      span {
        color: #ab9467;
      }
      .icon.icon-home {
        background: url(../../common/images/bar_home.png) no-repeat;
        background-position: 50%;
        background-size: 15%;
      } 
      .icon.icon-use {
        background: url(../../common/images/bar_click_me.png) no-repeat;
        background-position: 50%;
        background-size: 15%;
      } 
    }
  }
</style>
