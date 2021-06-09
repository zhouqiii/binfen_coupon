<template>
    <div style="background-color: #F8F8F8;padding-top:8px;">
		<div class="headNav" v-show="isShowTopHeader">
			<van-nav-bar title="我的活动" class="headTicket" :fixed="true" left-arrow  @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon :name="require('../assets/icon/share.png')" size="18" slot="right" />
			</van-nav-bar>
		</div>
        <div class="my-swipe-box">
            <van-swipe class="my-swipe" :autoplay="3000">
                <van-swipe-item v-for="(obj, index) in lunbo" :key="index">
                    <van-image style="background-color: #fff;" lazy-load :src="obj.image" @click="swipeSkip(obj)" rel="external nofollow"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div style="margin:0 8px 8px;">
            <van-grid :border="false" :column-num="2" :gutter="8">
                <van-grid-item v-for="(obj, index) in images1" :key="index">
                    <van-image radius="8" lazy-load :src="obj.image" @click="moduleSkip(obj)" rel="external nofollow"/>
				</van-grid-item>
            </van-grid>
        </div>
        <div class="myActivityList" style="margin-top: 10px;">
            <van-tabs line-width="56px" background="#F8F8F8" line-height="3px" title-style="font-size: 16px;" 
			title-active-color="#F44336" title-inactive-color="#999999" v-model="active"  
			swipeable sticky :offset-top="offsetTop" @change="onClick">
                <van-tab style="border-top: solid 1px #EEEEEE;" v-for="(obj, index) in lablelist" :key="index" :title="obj.newsTitle">
                    <van-pull-refresh v-model="refreshing" :success-text="successText" @refresh="onRefresh">
                        <van-list style="padding:16px;" v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                            <van-cell style="border-radius:8px;margin-bottom: 8px;" v-for="(obj, index) in newsList" :key="index" @click="thkxDetailSkip(obj)">
								<div style="border-radius:8px;" class="list_item_content">
                                    <div class="img_item_outer">
                                        <van-image width="7.8125rem" height="4.375rem" style="border-radius:2px;" class="img_item" :src="obj.newsImgList" />
                                    </div>
									<div class="text">
										<div class="text-one">
											<div class="text_title">
												{{obj.newsTitle}}
											</div>
											<div  class="text_word">
												<div class="one">
													截止{{obj.newsEndDt}}
												</div>
												<div v-if="obj.num" class="two">
													<img class="hot" src="@/assets/icon/icon_hot@2x.png" /> {{obj.num}}阅读
												</div>
												<div v-else class="two">
													<img class="hot" src="@/assets/icon/icon_hot@2x.png" /> 0阅读
												</div>
											</div>
										</div>
                                    </div>
                                </div>
							</van-cell>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Toast, Lazyload, Swipe, SwipeItem, Tab, Tabs, List, PullRefresh } from "vant";
Vue.use(Lazyload, {
    lazyComponet: true
}).use(List).use(PullRefresh);
import { sendRequestThkx } from "@/api/MyActivity";
export default {
    data() {
        return {
			isShowTopHeader:true,//是否显示头部导航
            active: 0,
            list: [],
            loading: false,
            finished: false,
			refreshing: false,
			successText: '',
            lunbo: [
				{
                    image: require('@/assets/MyActivity/activity-register@2x.png'),
					uiParmValue: '',
					title: '注册有礼',
					uiJump: '1',
					uiJumpId: '062002'
                },
                {
					image:require('@/assets/MyActivity/lunbo/apple/findzhong@2x.png'),
					// url: 'http://www.baidu.com',
					uiParmValue: 'https://mlife.jf365.boc.cn/mlife/mobilelife/html5/107/ColorfulLife_motionHealth_XW/index.html',//运动专区首页链接
					// title: '上冰雪找中行',
					uiJump: '1',
					uiJumpId: '190001'
                },
                {
					image:require('@/assets/MyActivity/lunbo/apple/food@2x.png'),
					uiParmValue: 'https://onlinepay.cupdata.com/PointPayResource/resource/bcqd/columnsList.do?id=1&hjf_source=7cQ8a0988767C85Uo301',
					// title: '食来运转',
					uiJump: '1',
					uiJumpId: '090002'
				},
				// { //签到已到期
				// 	image:require('@/assets/MyActivity/lunbo/apple/signin@2x.png'),
				// 	uiParmValue: 'https://mlife.jf365.boc.cn/mlife/mobilelife/html5/107/ColorfulLife_motionHealth_XW/index.html#/blankExcessPage?wechatEntFlag=mlifeAppSigle&wechatModel=qiandaoEnter&wechatEntParams=&wechatPaType=1',
				// 	// title: '每日签到领活力',
				// 	uiJump: '1',
				// 	uiJumpId: '190002'
                // },
                {
					image:require('@/assets/MyActivity/lunbo/apple/carBuying@2x.png'),
					uiJumpUrl: 'https://img2.souche.com/page-combined/210120PG090251.html?spm=400700.238108.11148.67936.2182934.1.15182055',
					// title: '燃情汽车',
					uiJump: '2',
					uiJumpId: ''
                },
				// {
				// 	image:require('@/assets/MyActivity/lunbo/apple/skiing.png'),
				// 	uiParmValue: 'https://mlife.jf365.boc.cn/mlife/mobilelife/html5/107/ColorfulLife_motionHealth_XW/index.html#/blankExcessPage?wechatEntFlag=mlifeShare&wechatModel=axessEnter&wechatEntParams=&wechatPaType=1',
				// 	// title: '冬奥一卡通',
				// 	uiJump: '1',
				// 	uiJumpId: '190002'
                // },
				// {
				// 	image:require('@/assets/MyActivity/lunbo/apple/recruit@2x.png'),
				// 	uiParmValue: 'https://mlife.jf365.boc.cn/mlife/mobilelife/html5/107/ColorfulLife_motionHealth_XW/index.html#/blankExcessPage?wechatEntFlag=mlifeAppSigle&wechatModel=volunteerEnter&wechatEntParams=&wechatPaType=1',
				// 	// title: '冬奥志愿团招募',
				// 	uiJump: '1',
				// 	uiJumpId: '190002'
                // },
            ],
            images1: [
                {
                    image: require('@/assets/MyActivity/activity-signup.png'),
                    uiParmValue: '',
					title: '活动报名',
					uiJump: '1',
					uiJumpId: '036003'
                },
                // {
                //     image: require('@/assets/MyActivity/activity-register.png'),
				// 	uiParmValue: '',
				// 	title: '注册有礼',
				// 	uiJump: '1',
				// 	uiJumpId: '062002'
                // },
				{//银行卡专区入口跳转（营销活动专区）ID:   828952493122650112
                    image: require('@/assets/MyActivity/bankCard@2x.png'),
					uiParmValue: '',
					title: '银行卡专区',
					uiJump: '1',
					uiJumpId: '061001',
					uiParmValue: '828952493122650112'
                },
                {
                    image: require('@/assets/MyActivity/activity-invitation.png'),
					// https://alex188.cn/mlife/mobilelife/html5/014/ColorfulLife_invites/app.html
					uiParmValue: 'https://mlife.jf365.boc.cn/mlife/mobilelife/html5/014/ColorfulLife_invites/app.html',
					title: '邀请有礼',
					uiJump: '1',
					uiJumpId: '063001'
                },
                {
                    image: require('@/assets/MyActivity/activity-Reappearance.jpg'),
                    uiParmValue: '',
					title: '羊毛福利',
					uiJump: '1',
					uiJumpId: '043001'
                }
			],
            lablelist: [],
			newsList: [],
			aaa: '',
			currentPage: -1,
			parammeters:{
			},
			newsCityCde:'',
			// tabs吸顶距离
			offsetTop:'0'
        }
	},
    methods: {
        onClickLeft(obj) {
			this.callAppMethod({
                callName:"lastGoBack"
            })
        },
        onClickRight() {
			let activeShareUrl = 'https://alex188.cn/mlife/mobilelife/html5/167/ColorfulLife_my/index.html#/MyActivity'
            this.callAppMethod({
				callName: "appShare",
				parameters: {
					shareId: 202101181617048,//9201
					shareTitle: '活动精选',
					shareUrl: activeShareUrl,
					isNewShare:'1'
				}
			});
		},
		// 点击跳转
        functionSkip() {
			console.log(this.parammeters)
			console.log(this.parammeters.uiJump,this.parammeters.uiJumpId,this.parammeters.uiParmValue,this.parammeters.uiJumpUrl)
			if(this.isShowTopHeader == true){
				this.callAppMethod({
					callName: "goBannerModel",
					parameters: this.parammeters
				});
			}else if(this.isShowTopHeader == false){
				let actConfig = {
					type: this.parammeters.uiJump,
					uiJumpId: this.parammeters.uiJumpId,
					uiJumpChildId: "",
					tip: "",
					uiName: "",
					uiJumpUrl: "",
					uiParmValue: this.parammeters.uiParmValue,
				};
				this.openApp(actConfig);
			}
			
		},
		//轮播图跳转
		swipeSkip(obj){
			this.parammeters = {
				uiJumpUrl:obj.uiJumpUrl,
				uiParmValue: obj.uiParmValue,
				uiJump: obj.uiJump,
				uiJumpId: obj.uiJumpId
			}
			this.functionSkip()
		},
		//模块功能跳转
		moduleSkip(obj){
			this.parammeters = {
				uiParmValue: obj.uiParmValue,
				uiJump: obj.uiJump,
				uiJumpId: obj.uiJumpId
			}
			this.functionSkip()
		},
		//特惠快讯详情跳转
		thkxDetailSkip(obj){
			this.parammeters = {
				uiParmValue: obj.id,
				uiJump: '1',
				uiJumpId: '023003'
			}
			this.functionSkip()
		},
		//切换标题
        onClick(name, title) {
			this.newsList = [];
			this.currentPage = 0

			let params = {
				txnId: this.isMobile() + 'THK000002',
				newsPage: this.currentPage,
				newsCityCde:this.newsCityCde
			};
			this.aaa = this.lablelist[name].id
			params.lableId = this.aaa
			sendRequestThkx(params).then(response => {
				if(response.stat=="00"){
					this.newsList = response.body.newsList
					this.loading = false
					if(response.body.newsPageNext=="1"){
						this.finished = false;
					}else{
						this.loading = false
						this.finished = true
					}
				}else{
					this.loading = false
					this.finished = true
				}			
			})
		},
		//获取特惠快讯消息列表
        onLoad() {
			this.loading = true
			this.currentPage++
			setTimeout(() => {
				if (this.refreshing) {
					this.newsList = []
					this.refreshing = false
				}

				let params = {
					txnId: this.isMobile() + 'THK000002',
					lableId: this.aaa,
					newsPage: this.currentPage,
					newsCityCde:this.newsCityCde
				};
				sendRequestThkx(params).then(response => {
					// console.log(response)
					if(response.stat=="00"){
						this.successText = '刷新成功'
						let list = response.body.newsList
						this.newsList.push(...list);
						this.loading = false
						if(response.body.newsPageNext=="1"){
							this.finished = false;
						}else{
							this.loading = false
							this.finished = true
						}
					}else{
						this.successText = response.result
						this.loading = false
						this.finished = true
					}
				})
			}, 1000);
		},
		//下拉刷新
        onRefresh() {
            // 清空列表数据
            this.finished = false
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
			this.loading = true

			this.currentPage = -1

            this.onLoad();
		},
		
		
	},
	created() {
		 this.newsCityCde = this.getParamsFromUrl('cityIdCde')
		//初始化请求特惠快讯标题列表
		let params = {
			txnId: this.isMobile() + 'THK000001',
			lableId:'',
			newsCityCde:this.newsCityCde
		};
		sendRequestThkx(params).then(response => {
			//列表首个标题添加全部
			let list = {
				id: '',
				newsTitle:"全部"
			}
			this.lablelist = response.body.lablelist
			this.lablelist.push(list)
		})
	},
	mounted(){
		if(this.isShareLinkTag == "share"){
			this.isShowTopHeader = false
			this.offsetTop = '0'
		}else{
			this.isShowTopHeader = true
			this.offsetTop = '2.875rem'
		}
	}
		
}
</script>
<style lang="less" scoped>
	.headNav{
		height: 88px;
	}
	.my-swipe-box{
		border-radius:16px; 
		overflow:hidden; 
		transform: translateY(0); 
		margin: 16px 32px 32px;
		.my-swipe{
			height: 220px;
		}
		/deep/ .van-swipe__indicator{
			width: 16px;
			height: 4px;
			border-radius:0;
		}
		/deep/ .van-swipe__indicator--active{
			background-color:#F44336;
			opacity:1;
		}
		/deep/ .van-swipe__indicator:not(:last-child){
			margin-right: 8px;
		}
	}
	.list_item_content {
		display: flex;
		padding: 14px 8px;
		.img_item_outer{
			width: 250px;
			/deep/ .van-image{
				display: block;
			}
		}
	}
	.van-grid-item__content {
		padding:0;
	}
	.text{
		width: 100%;
		margin: 0 0 0 16px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.text-one{
			width: 100%;
			.text_title {
				/*width: 300px;*/
				// width: 468px;
				font-size: 26px;
				line-height: 150%;
				color: #333333;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.text_word{
				display: flex;
				justify-content: space-between;
				margin-top: 24px;
				.one {
					color: #999999;
					font-size: 22px;
				}
				.two {
					color: #999999;
					font-size: 22px;
					.hot{
						width:26px;
						height:22px;
						vertical-align: top;
					}
				}
			}
		}
	}
	

	.text_bottom {
		color: #b4b4b4;
		font-size: 28px;
		float:left;
		// overflow: hidden;/*!*超出部分隐藏*!*/
		// white-space: nowrap;/*!*不换行*!*/
		// text-overflow:ellipsis;/*!*超出部分文字以...显示*!*/
	}
	
	
	.content {
  		padding: 16px 16px 160px;
	}
	/deep/ .van-nav-bar .van-nav-bar__content{
        height: 92px;
        .van-nav-bar__title{
			font-size: 36px;
			font-weight: 800;
			color: #333333;
            line-height: 150%;
        }
        .van-nav-bar__arrow{
            font-size: 44px;
            line-height: 100%;
        }
	}
	// 内容
    /deep/  .van-tabs__content{
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
	// .myActivityList{
	// 	/deep/  .van-sticky--fixed{
	// 		top:92px;
	// 	}
	// }  
</style>
<style>
	.van-tabs--line .van-tabs__wrap {
    	height: 100px;
	}
	.van-tab {
		font-size: 32px;
	}
	.van-tab--active {
		font-size: 36px;
		font-weight: 500;
	}
	.van-grid-item__content--center {
		padding: 0;
		background-color:#F8F8F8;
	}
	.van-nav-bar .van-icon {
		color: #000000;
		width: 44px;
		height: 44px;
	}
	.van-nav-bar .van-icon img{
		width: 100%;
		height: 100%;
	}
</style>
