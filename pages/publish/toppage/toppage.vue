<template>
	<view class="page">
		<view class="content-wrap">
			<!-- 图片 -->
			<view class="imgwrap">
			<image src="../../../static/img/publish/chenggong.png" class="okimg"></image>
			<view class="psuccess">发布成功</view>
			</view>
			<!-- 按钮 -->
			<view class="btnwrap">
				<button class="btn" @tap="gotomyinfo">管理信息</button>
				<button class="btn" @tap="gotodetail">查看信息</button>
				<button class="btn"  @tap="gotopublish">再发一条</button>
			</view>
			<!-- 置顶信息 -->
			<view class="topinfo">
				<image src="../../../static/img/publish/zhiding.png" class="zdimg"></image>
				<view class="toptext">信息置顶,提高6-10倍曝光率!</view>
			</view>
			<!-- 置顶套餐 -->
			<view class="uni-list">
				<radio-group @change="radioChange">
				    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
				        <view>
				            <radio :value="item.value" :checked="index === current" />
				        </view>
				        <view>{{item.name}}</view>
				    </label>
				</radio-group>
			</view>
			<!-- 置顶提示 -->
			<view class="zhidinghint">
				置顶说明:信息将展示到最顶部,置顶15天以上送公众号图文消息推广一次.
			</view>
			<!-- 购买按钮 -->
			<view class="">
				<button class="buybtn" @tap="gotobuy">确认购买</button>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{ value: '5',  name: '置顶1天5元'  },
				        { value: '30',  name: '置顶7天30元'  },       
				        { value: '60',  name: '置顶15天60元'   },
					    { value: '120',  name: '置顶30天120元'  } 
				       ],
				current: 1,
				userobj:{},
				msgid:'',
			}
		},
		onLoad(e) {
			var me = this;
			me.msgid = e.msgid;
			
			var user =me.getGlobalTCUser();
			if(user==null || user==''||user == undefined){
				setTimeout(()=>{
					//弹窗提醒用户未登录
					uni.showModal({
						showCancel:false,
						title:'系统检测到您未登录,发布消息需进行微信授权.',
						content:'确认授权吗?',
						confirmText:'确定',
						success(res) {
							if(res.confirm){
								// #ifdef H5
								window.location.href= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx767a50ba17367aa1&redirect_uri=https%3A%2F%2Fyohaoyun.com%2Ftch5%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
								// #endif
							}
						}
					})
				},1000);
			}
			me.userobj = user;
		},
		methods: {
			
			/* 前往支付页 */
			gotobuy(){
				var me=this;
				uni.showLoading({
					mask:true,
					title:'创建订单中...'
				});
				setTimeout(()=>{
					me.createbuyorder();
					uni.hideLoading();
				},2000);
			},
			/* 创建置顶订单 */
			createbuyorder(){
				var me = this;
				var money = me.items[me.current].value;
				var topdays =0 ;
				if(me.current == 0)topdays=1;
				if(me.current == 1)topdays=7;
				if(me.current == 2)topdays=15;
				if(me.current == 3)topdays=30;
				
				var buy={
					orderno:'',
					tcuserid :me.userobj.id,
					msgid:me.msgid,
					buyname:'置顶消息',
					remark:'置顶消息',
					money:money,
					type:'gototop',
					topdays:topdays
				};
				//放入缓存. 这边放 那边取
				uni.removeStorageSync('buybean');
				uni.setStorageSync('buybean',buy);
				uni.redirectTo({
					url: '/pages/buy/buy'
				});
			},
			/* 单选框改变事件 */
			radioChange: function(evt) {
				console.log(evt);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			/* 前往信息管理界面 */
			gotomyinfo(){
				uni.redirectTo({
					url: '/pages/me/minetcinfo/minetcinfo'
				});
			},
			/* 再发一条页面 */
			gotopublish(){
				uni.redirectTo({
					url:'../publish'
				});
			},
			/* 前往查看信息界面 */
			gotodetail(){
				var me = this;
				//查看详情 点返回可以继续置顶操作
				uni.navigateTo({
					url:'/pages/detail/detail?msgid='+me.msgid
				})
			}
		}
	}
</script>

<style>
@import url("toppage.css");
</style>
