import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios
// 引入reset.css
import "normalize.css"
// 引入公共样式
import "@/style/common-style.less"

// 引入jquery
import $ from 'jquery';

// 引入判断操作系统及app版本的函数并且添加到prototype上
import { APPSYS } from "@/utils/commonFn";
Vue.prototype.APPSYS = APPSYS;

import commonFn from "@/utils/commonFn";
Vue.prototype.openApp = commonFn.openApp; //调用openApp方法，打开应用宝
Vue.prototype.gotoCommonClick = commonFn.gotoCommonClick; //区分调用客户端方法还是打开应用包
/*主要用来注册H5方法供客户端调用，如需调用客户端方法请使用下边封装好的callAppMethod*/
Vue.prototype.setupWebViewJavascriptBridge = commonFn.setupWebViewJavascriptBridge;
// 引入 从url截取参数 的方法
// import { getParamsFromUrl } from "@/utils/commonFn"
Vue.prototype.getParamsFromUrl = commonFn.getParamsFromUrl;
// 分享链接必加参数,值为'share',isShareLink=share:代表分享;isShareLink=outLink:代表外部链接;
Vue.prototype.isShareLinkTag = commonFn.getParamsFromUrl("isShareLink") || "";

// 引入callAppMethod并且添加到prototype上
import { callAppMethod } from "@/utils/commonFn";
Vue.prototype.callAppMethod = callAppMethod;
// 获取移动端设备 1:Android；2.IOS
import { isMobile } from "@/utils/commonFn";
Vue.prototype.isMobile = isMobile;

// 引入 判空 的方法
import { notNull } from "@/utils/commonFn"
Vue.prototype.notNull = notNull;
//channel=1:手机银行,channel=2:缤纷生活,channel=3:微信公众号,channel=4:微信小程序,
// channel=5:12306;channel=6:惠美小程序,channel=7:惠美APP
Vue.prototype.channel = commonFn.getParamsFromUrl("channel") || "2";


// 引入request并添加到prototype上
import { request } from "@/utils/request"
Vue.prototype.request = request;
// 引入创建dom的函数并且添加到prototype上
import createDom from "@/utils/createDom"
Vue.prototype.createDom = createDom;

// console.log()
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

// 图片动态加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // loading: require('./assets/myTicket/default-img@2x.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  // error: require('./assets/icon/wifi.png')  //加载失败图片
});

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 引入Tab 标签页
import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
// 图标
import { Icon } from 'vant';
Vue.use(Icon);
// 列表（上滑加载）
import { List } from 'vant';
Vue.use(List);
// 引入 宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);
// 引入 单元格
import { Cell } from 'vant';
Vue.use(Cell);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

