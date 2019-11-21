<template>
	<view class="page page-fill">
		
		<view class="header">
			<view >
				<!-- <image src="https://img.yohaoyun.com/yohaoyun/tongcheng/nantx.png" class="face"></image> -->
				<image :src="userobj.touxiangimg" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<view class="nickname">
					{{userobj.nickname}}
				</view>
				<navigator url="updateme/updateme">
				<view class="nav-info">修改资料 <fa-icon class="fa-angle-right" style="margin-left: 10px;" size="20" color="#ffffff"></fa-icon> </view>
				</navigator>
			</view>
			 
			
			<view class="set-wapper">
				<navigator url="updateme/updateme">
					<image src="../../static/img/me/settings.png" class="settings"></image>	
				</navigator>
			</view>
		</view>
		<view class="body">
			<view class="textwrap" @tap="gotoshoucang">
				<view class="leftwrap">
					<image class="leftimg" src="../../static/img/me/shoucang.png"></image>
					<view class="lefttext">我的收藏</view>
				</view>
				<view class="rightwrap">
					<view class="righttext">点击查看</view>
					<image src="../../static/img/you.png" class="you"></image>
				</view>
				
			</view>
			<view class="line-wrap"> <view class="line"></view> </view>
			
			<view class="textwrap" @tap="gotominetcinfo">
				<view class="leftwrap">
					<image class="leftimg" src="../../static/img/me/fabu.png"></image>
					<view class="lefttext">发布管理</view>
				</view>
				<view class="rightwrap">
					<view class="righttext">点击查看</view>
					<image src="../../static/img/you.png" class="you"></image>
				</view>
				
			</view>
			<view class="line-wrap"> <view class="line"></view> </view>
			
			<view class="textwrap" @tap="gotomytidings">
				<view class="leftwrap">
					<image class="leftimg" src="../../static/img/me/liuyan.png"></image>
					<view class="lefttext">私信管理</view>
				</view>
				<view class="rightwrap">
					<view class="righttext">点击查看</view>
					<image src="../../static/img/you.png" class="you"></image>
				</view>
				
			</view>
			<view class="line-wrap"> <view class="line"></view> </view>
			
			<view class="textwrap" @tap="gotoreport" v-if="userobj.id == 3">
				<view class="leftwrap">
					<image class="leftimg" src="../../static/img/me/jubao.png"></image>
					<view class="lefttext">举报管理</view>
				</view>
				<view class="rightwrap">
					<view class="righttext">点击查看</view>
					<image src="../../static/img/you.png" class="you"></image>
				</view>
				
			</view>
			<view class="line-wrap"> <view class="line"></view> </view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:undefined,
				userobj:{},
			}
		},
		onLoad(){
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user;
			}else{
				setTimeout(()=>{
					//弹窗提醒用户未登录
					uni.showModal({
						showCancel:false,
						title:'系统检测到您未登录,如需操作请进行微信授权.',
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
		},
		methods: {
			gotominetcinfo(){
				uni.navigateTo({
					url:'/pages/me/minetcinfo/minetcinfo'
				})
			},
			gotoshoucang(){
				uni.navigateTo({
					url:'/pages/me/shoucang/shoucang'
				})
			},
			gotoreport(){
				uni.navigateTo({
					url:'/pages/me/report/report'
				})
			},
			/* 前往我的私信界面 */
			gotomytidings(){
				uni.navigateTo({
					url:'mytidings/mytidings'
				})
			},
			/* 获取我的信息 */
			getmeinfo(){
				var me =this;
				me.webhttp({
					url:me.websiteUrl + 'gettcuserbyid',
					method:'GET',
					data:{
						id:me.userid
					}
				}).then(res=>{
					if(res.code==200){
						me.userobj = res.tcuser;
					}
				});
			},
		}
	}
</script>

<style>
@import url("me.css");
</style>
