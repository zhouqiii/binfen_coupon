<template>
  <div class="HistoricalRecords">
    <!-- 头部导航 -->
    <van-nav-bar @click-left="onClickLeft" class="headTicket" title="优惠券历史记录" left-arrow  :fixed="true" :placeholder="true">
    </van-nav-bar>
    <!-- 已使用、已过期 -->
    <div class="ticket">
        <van-tabs 
        line-width="60px"
        line-height="3px"
        color="#F44336"
        title-active-color="#F44336"
        @click="cutNav"
        >
            <van-tab v-for="(item,index) in titleArr" :key="index" 
            :title="item.title">
                <!-- 遮罩层 -->
                <div v-show="!isReq" class="reqMask"></div>
                <div class="errorPage" v-if="!network">
                  <div class="errorPageImg">
                    <!-- 图片转成base64 -->
                    <img src="data:image/png;base64,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" />
                  </div>
                  <div class="errorPageWord">网络出现了问题，获取数据失败</div>
                  <div class="reload" @click="loadAgain()">
                    <div class="reloadSvg">
                      <svg t="1611124548462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1169" width="0.9375rem" height="0.9375rem"><path d="M511.997366 117.728395a392.928395 392.928395 0 0 1 233.797531 76.90535l-107.693827 15.27572a39.506173 39.506173 0 0 0 5.530864 78.485597 40.586008 40.586008 0 0 0 5.636214-0.263375l184.36214-26.337448a39.348148 39.348148 0 0 0 33.527572-44.510288l-26.337448-183.835391a39.506173 39.506173 0 0 0-78.222223 11.061728l10.53498 72.954733A472.678189 472.678189 0 0 0 62.575144 661.069959l64-64A393.112757 393.112757 0 0 1 511.997366 117.728395z m449.474897 244.674897l-64 64A394.482305 394.482305 0 0 1 273.985844 825.679012l85.57037-12.115226a39.506173 39.506173 0 1 0-11.167078-78.222222l-184.36214 26.337448a39.506173 39.506173 0 0 0-33.527572 44.510288l26.337448 183.835391A39.506173 39.506173 0 0 0 195.947984 1024a41.08642 41.08642 0 0 0 5.636214-0.526749 39.242798 39.242798 0 0 0 33.527572-44.510288l-13.537449-94.55144a472.546502 472.546502 0 0 0 739.897942-522.008231z" p-id="1170" fill="#F44336"></path></svg>
                    </div>  
                    <div>重新加载</div>
                  </div>
                </div>

                <van-list
                  v-else
                  v-model="loading"
                  :finished="finished"
                  finished-text=""
                  :error.sync="error"
                  error-text=""
                  @load="getRequest(item.title)"
                >
                  <div v-if="error" class="errorPage">
                    <!-- <div v-if="isFour"> -->
                      <div class="errorPageImg">
                        <img src="../assets/icon/404.png" />
                      </div>
                      <div class="errorPageWord">sorry,页面飞走了</div>
                    <!-- </div> -->
                  </div>
                  <div v-else-if="kongCouponList">
                      <div class="notyetphoto">
                          <img class="notyet-icon" src="@/assets/myTicket/notyet-icon@2x.png"/>
                      </div>
                      <div class="clevergo">暂无票券</div>
                  </div>
                  <ul v-else class="orderUl">
                      <li v-for="item in couponList" :key="item.totalOrderId" 
                      class="orderItem" @click="gotoCouponItem(item.orderId,item.waresId)">
                          <div  class="orderItem-left"  v-lazy:background-image="gfrdDefultImg">
                            <img v-lazy="item.imgUrl" />
                          </div>
                          <div  class="orderItem-center">
                            <div>
                              <div class="name"><div class="nameFlow">{{item.name}}</div></div>
                              <div class="time">{{item.validatyBegin}}-{{item.validatyEnd}}</div>
                              <!-- <div class="finish">支付完成2019.05.10</div> -->
                            </div>
                          </div>
                          <div class="orderItem-right">
                            <ul class="right-posi">
                              <li v-if="item.couponType == '01'" class="discount">
                                <div>
                                  <div class="num">￥<span :class="{'control':item.voucherAmount.toString().length>4}">{{item.voucherAmount}}</span></div>
                                  <div v-if="item.termsAmount && item.termsAmount!=0" 
                                  class="coupon">满{{item.termsAmount}}可用</div>
                                  <div v-else-if="item.termsAmount==0" class="coupon">无门槛券</div>
                                </div>
                              </li>
                              <li v-else-if="item.couponType == '02'" class="discount">
                                <div>
                                  <div class="numb"><span>{{item.discountRate}}</span>折</div>
                                  <div class="coupon" v-if="item.termsAmount==0">无门槛券</div>
                                  <div class="coupon" v-else-if="item.termsAmount && item.termsAmount!=0">
                                    满{{item.termsAmount}}可用</div>
                                  <div  class="coupon" v-else>满{{item.termsAmount}}件可用</div>
                                </div>
                              </li>
                              <li v-else class="discount">
                                <div class="electron">电子券</div>
                              </li>
                            </ul>  
                          </div>
                          <div class="expired">
                              <div class="expired-icon">
                                  <img v-if="title == '已使用'" src="@/assets/myTicket/used-icon@2x.png"/>
                                  <img v-else src="@/assets/myTicket/expired-icon@2x.png"/>
                              </div>
                          </div>
                      </li>
                  </ul>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name:'HistoricalRecords',
  data () {
    return {
      // 导航title
      titleArr:[{title:'已使用',length:0},{title:'已过期',length:0}],
      title:'已使用',
      // 默认图片
      gfrdDefultImg:require('../assets/myTicket/default-img@2x.png'),
      wifiIng:require('../assets/icon/wifi.png'),
      // 优惠券数据
      couponList:[],
      // 请求第几页的数据
      NextPage:1,
      // vant 下拉加载
      loading: false,
      finished: false,
      error: false,
      // 请求已响应
      sendout:false,
      // 是否是我主动调起的登录
      myLogin:false,
      // 优惠券列表为空
      kongCouponList:false,
      // 判断是断网还是请求错误
      // isFour:true
      // 默认有网
      network:true,
      // 切换导航时 有网,默认有
      haveWifi:true,
      // 当上一个请求未完成时，禁止下一次请求
      isReq:true
    }
  },
  mounted(){
    if (navigator.onLine) {
      this.haveWifi = true
    } else {
      this.network = false
      this.haveWifi = false
    }
    window.addEventListener('online',()=>{
      this.haveWifi = true
      // console.log('')
    })
    window.addEventListener('offline',()=>{
      this.network = false
      this.haveWifi = false
      // console.log('已断网')
    })
    this.loginInAfter()
    this.getRequest('已使用')
  },
  methods:{
    loadAgain(){
      window.location.reload()
    },
    /* 登录成功后 */
    loginInAfter(){
      let _this = this;
      this.setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler("loginIn", function(data) {
          if(_this.notNull(data)) {
            if(typeof data === "string") {
              data = JSON.parse(data);
            }

            let flag = data.flag;
            if(_this.notNull(flag)) {//登录成功
              //刷新页面
              if(_this.myLogin === true){
                _this.getRequest('已使用')//刷新页面
              }
              _this.myLogin = false
              
            } 
          }
        });
      });
    },
    // 返回 我的票券
    onClickLeft(){
        this.$router.push({
            path: '/myTicket',
        })
    },
    // 跳转至优惠券详情页面
    gotoCouponItem(orderId,waresId){
      // console.log(orderId)
      this.callAppMethod({
        callName:"goMyCouponDetail",
        parameters:{
          orderId:orderId,
          couponId:waresId,
          isAbroad:''
        }
      })
    },
    // 处理日期格式
    handleDate(date,sign){
      let y = date.substr(0,4)
      let m = date.substr(4,2)
      let d = date.substr(6,2)
      date = y+sign+m+sign+d
      return date
    },
    // 切换导航
    cutNav(name,title){
      if(this.haveWifi === true){
        this.network = true
      }
      this.sendout = false
      this.couponList = []
      this.NextPage = 1
      this.finished = false
      this.kongCouponList = false
      this.error = false
      // this.isFour = true

      let navTitle = title.substr(0,3)
      this.getRequest(navTitle)
      this.title = navTitle
    },
    // 调用接口，请求数据
    getRequest(title){
      this.isReq = false
      if(this.sendout === false){
        this.sendout = true
      }else{
        return
      }
      let _this = this
      // 1:已使用;2:已过期;
      let state = '1'
      if(title == '已使用'){
        state = '1'
      }else if(title == '已过期'){
        state = '2'
      }
     
      this.request({
        url: '/couponsNew.do',
        method:'get',
        params: {
          txnId:this.isMobile() + 'BSW100002',
          call:'cgi',
          certType:'',// v 证件类型 IDCD
          certId:'',// v 证件号 211303199601011628 110221199006169982
          // channel:this.channel,// v 渠道：B缤纷;T手机银行;W微信公众号;03华奥;00中银运动小程序
          pageNo:this.NextPage,//页码
          state:state,//优惠券状态：1:已使用;2:已过期;3:退货;4:待支付;5:已支付
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dns': 'dsmsboc001',
        },
      }).then((res)=>{
        _this.isReq = true
        _this.sendout = false
        if(res.stat == "00"){
          
          let data = res.body
          if(data){
            data.couponList.forEach((item)=>{
              if(item.orderDate){
                item.orderDate = _this.handleDate(item.orderDate,'/')
              }
              if(item.payDate){
                item.payDate = _this.handleDate(item.payDate,'/')
              }
              if(item.returnDate){
                item.returnDate = _this.handleDate(item.returnDate,'/')
              }
              item.validatyBegin = item.validatyBegin.replace(/-/g, '/')
              item.validatyEnd = item.validatyEnd.replace(/-/g, '/')
              if(item.discountRate){
                let discount = item.discountRate*10+''
                item.discountRate = discount.substr(0,3)
              }
              _this.couponList.push(item)
            })
          }
        
          _this.loading = false//loading
          if(data && data.hasNextPage>0){
            _this.NextPage++
          }else if(data && data.hasNextPage==0){
            if(_this.couponList.length > 0){
              _this.finished = true
            }else{
              _this.finished = true
              _this.kongCouponList = true
            }
          }else{
            _this.error = true;
            // _this.isFour = true
          }
        }else if(res.stat == "01"){//如果 未登录
          _this.callAppMethod({
            callName:"toLogin"
          })
          _this.myLogin = true
          _this.finished = true
        }else{
          _this.finished = true
          _this.error = true;
          // _this.isFour = true
        }
        

      }).catch(err=>{
        if(title == '已使用'){
          _this.titleArr[0].length = 0
        }else if(title == '已过期'){
          _this.titleArr[1].length = 0
        }

        _this.isReq = true
        _this.sendout = false
        _this.error = true;
        // _this.isFour = false;
        _this.loading = false//loading
      })
    },
  }
}
</script>
<style lang="less" scoped>
.HistoricalRecords{
  min-height: 100vh;
  background-color: #F8F8F8;
}
.notyetphoto{
  width: 200px;
  height: 200px;
  margin: 300px auto 24px;
  img{
    width: 100%;
    height: 100%;
  }
}
.cleverphoto{
    padding-top: 300px;
    font-size: 200px;
    color: #999;
    text-align: center;
}
.clevergo{
    text-align: center;
    color:#333;
}
.reqMask{
  position: fixed;
  top:0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
.errorPage{
  background: #F8F8F8;
  position: fixed;
  top:0;
  width: 100vw;
  height: 100vh;
  .errorPageImg{
    width: 200px;
    height: 200px;
    margin: 534px auto 0;
    background: no-repeat;
    background-size: 200px 200px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .errorPageWord{
    margin-top: 24px;
    text-align: center;
    font-size: 30px;
    color: #333;
  }
  .reload{
    color: #F44336;
    font-size: 30px;
    margin-top: 27px;
    display: flex;
    justify-content: center;
    .reloadSvg{
      margin-right: 11px;
      transform:rotate(-45deg)
    }
  }
}

.orderUl{
  padding: 32px 32px 0;
}
.orderItem{
  display:flex;
  height: 180px;
  margin-bottom: 24px;
  background: url('../assets/myTicket/ticket-back@2x.png') no-repeat;
  background-size:100% 100%;
}
.orderItem-left{
  width: 180px;
  height: 180px;
  background: no-repeat;
  background-size: 180px 180px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
}
.orderItem-center{
  flex:1;
  padding:0 20px 0 16px;
  display: flex;
  align-items: center;
  .name{
    font-weight: 600;
    font-size: 28px;
    line-height: 150%;
    color: #333;
    .nameFlow{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .time{
    margin-top: 24px;
    color: #999;
    font-size: 22px;
  }
  .finish{
    margin-top: 20px;
    font-size: 24px;
    color: #666;
  }
}
.orderItem-right{
  width: 180px;
  text-align: center;
  opacity:0.3;
  .right-posi{
    width: 100%;
    height: 180px;
    position: relative;
    .discount{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .numb{
        font-size: 40px;
        color: #333;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .num{
        font-size: 32px;
        color: #333;
        font-weight: bold;
        span{
          font-size: 56px;
        }
        .control{
          font-size: 36px;
        }
      }
      .coupon{
        font-size: 24px;
        color: #999;
        margin-top: 8px;
      }
      .electron{
        color: #333;
        font-weight: bold;
        font-size: 40px;
      }
    }
    .state{
      width: 150px;
      margin: 0 auto;
      line-height: 52px;
      border-radius: 26px;
      background-color: #666;
      color: #fff;

      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
    }
  }
}
.expired{
    position: relative;
}
.expired-icon{
    width: 119px;
    height: 119px;
    position: absolute;
    right: 120px;
    bottom: 30px;
    font-size: 100px;
    img{
      width: 100%;
      height: 100%;
    }
}


.headTicket{
    // 修改头部导航icon的颜色
    /deep/ .van-nav-bar .van-icon{
        color:#444;
    }
    /deep/ .van-nav-bar .van-nav-bar__content{
        height: 92px;
        .van-nav-bar__title{
            font-size: 36px;
            line-height: 150%;
            font-weight: bold;
        }
        .van-nav-bar__arrow{
            font-size: 44px;
            line-height: 100%;
        }
    }
}
// 修改tab表签的默认样式
.ticket{
    /deep/ .van-tabs__wrap{
        height: 88px;
        position: fixed;
        width: 100%;
        z-index: 1;
    }
    /deep/ .van-tabs__nav--line{
        .van-tab{
            font-size: 30px;
            line-height: 150%;
            color: #999;
        }
    }
    // 内容
    /deep/  .van-tabs__content{
        padding-top: 88px;
        .van-list__loading{//加载中...  的样式
          .van-loading{
            span:nth-child(1){
              width: 28px !important;
              height: 28px !important;
            }
            .van-loading__text{
              font-size:28px;
            }
          }
        }
    }
}
</style>
