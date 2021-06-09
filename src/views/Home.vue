<template>
  <div class="home">
    <div class="main">home页面</div>
    <div @click="getInfo" class="testBtn btn_big btn_red">测试和后台交互</div>
    <div @click="showDialog" class="testBtn btn_big btn_red">测试弹框</div>
    <div @click="showToast" class="testBtn btn_big btn_red">测试toast</div>
    <div>
      <router-link to="/MyActivity">
        <van-button type="info">我的活动</van-button>
      </router-link>
    </div>
    <div class="bottom">home页面的底部</div>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Toast from "@/components/Toast";
import createDom from "@/utils/createDom"
import { callAppMethod } from "@/utils/commonFn"
console.log(callAppMethod)
export default {
  name: "Home",
  methods: {
    // 测试与后台的交互
    getInfo() {
      this.request({
        url:"/cgi.do",
        // data:{
        //   name:'lisong'
        // },
        params:{
          txnId:"1COU000001",
          params:"123",
          aaa:"aaa",
          imei:"222222"
        }
      })
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    // 测试弹框
    showDialog(){
      createDom(Dialog,{},{
        title:"测试的标题",
        content:"测试的内容",
        cancelText:"取消",
        confirmText:"确定",
        confirmCallback(){
          console.log("这是成功的回调")
        },
        cancelCallback(){
          console.log("这是失败的回调")
        }
      })
    },
    // 测试toast
    showToast(){
      const toast = this.createDom(Toast,{
        showToast:true,
        toastText:"绑卡失败"
      })
console.log(toast)
    }
  },
  created () {
    
  },

};
</script>

<style lang="less" scoped>
.home {
  .testBtn{
    margin: 20px;
  }
}
</style>