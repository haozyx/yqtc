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
