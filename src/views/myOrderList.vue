<template>
    <div class="myOrderList">
        <!-- 头部导航 -->
        <van-nav-bar @click-left="onClickLeft" class="headCouponItem" 
        title="我的订单" left-arrow :fixed="true" :placeholder="true" ></van-nav-bar>
        <div class="myOrderList-content">
            <van-cell is-link :border="false" v-for="(item,index) in orderList" :key="index"
             @click="goOrderItem(item.title)">
                <template #title>
                    <div class="vancell">
                        <div class="OrderItemIcon">
                            <img :src="item.imgSrc"/>
                        </div>
                        <div class="custom-title">{{item.title}}</div>
                    </div>
                </template>
            </van-cell>
        </div>
    </div>
</template>
<script>
export default {
    name:'myOrderList',
    data(){
        return{
            orderList:[
                {
                    imgSrc:require('@/assets/myOrder/coupon-order@2x.png'),
                    title:'优惠券订单'
                // },{
                //     imgSrc:require('@/assets/myOrder/clevergo-order@2x.png'),
                //     title:'聪明购订单'
                },{
                    imgSrc:require('@/assets/myOrder/vipTravel-order@2x.png'),
                    title:'贵宾出行订单'
                },{
                    imgSrc:require('@/assets/myOrder/myMotion-order@2x.png'),
                    title:'我的运动订单'
                },{
                    imgSrc:require('@/assets/myOrder/recharge-order@2x.png'),
                    title:'手机充值订单'
                },{
                    imgSrc:require('@/assets/myOrder/movie-order@2x.png'),
                    title:'我的影票订单'
                },{
                    imgSrc:require('@/assets/myOrder/integral365-order@2x.png'),
                    title:'积分365订单'
                }
            ]
        }
    },
    methods:{
        // 返回至客户端
        onClickLeft(){
            this.callAppMethod({
                callName:"lastGoBack"
            })
        },
        // 进入 
        goOrderItem(title){
            if(title === '优惠券订单'){
                this.$router.push({
                    path: '/myOrder',
                })
            // }else if(title === '聪明购订单'){
            //     this.callAppMethod({
            //         callName:"goBannerModel",
            //         parameters:{
            //             uiJump:'1',
            //             uiJumpId:'200003'
            //         }
            //     })
            }else if(title === '贵宾出行订单'){
                this.callAppMethod({
                    callName:"goBannerModel",
                    parameters:{
                        uiJump:'1',
                        uiJumpId:'200004'
                    }
                })
            }else if(title === '我的运动订单'){
                this.callAppMethod({
                    callName:"goBannerModel",
                    parameters:{
                        uiJump:'1',
                        uiJumpId:'200007'
                    }
                })
            }else if(title === '手机充值订单'){
                this.callAppMethod({
                    callName:"goBannerModel",
                    parameters:{
                        uiJump:'1',
                        uiJumpId:'200005'
                    }
                })
            }else if(title === '我的影票订单'){
                this.callAppMethod({
                    callName:"goBannerModel",
                    parameters:{
                        uiJump:'1',
                        uiJumpId:'200006'
                    }
                })
            }else if(title === '积分365订单'){
                this.callAppMethod({
                    callName:"goBannerModel",
                    parameters:{
                        uiJump:'1',
                        uiJumpId:'200002'
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.myOrderList{
    min-height: 100vh;
    background-color: #F8F8F8;
}
.myOrderList-content{
    padding: 32px;
}
.vancell{
    display:flex;
    height: 100px;
}
.OrderItemIcon{
    width: 44px;
    height: 44px;
    padding: 28px 0;
    margin-right: 10px;
    img{
        width: 100%;
        height: 100%;
    }
}
.custom-title{
    color: #333;
    font-size: 30px;
    line-height: 100px;
}
.headCouponItem{
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
/deep/ .van-cell__left-icon, .van-cell__right-icon{
    height: 100px;
    line-height: 100px;
    color: #BCBCBC;
    font-size: 30px;
}
</style>