<template>
	<view class="page-fill">
		
		<nodata v-if="msglist.length == 0"></nodata>
		
		<view class="msgwrap"  v-for="(msg,index) in msglist" :key="index">
			<image class="tximg" v-if="userobj.id == msg.fromuid" :src="msg.touimg"></image>
			<image class="tximg"  v-if="userobj.id == msg.touid" :src="msg.fromuimg"></image>
			<view class="rightwrap" @tap="gotomsgdetail(msg)">
				<view class="timetext">{{msg.send_time}}</view>
				<view class="msgtext">{{msg.message_content}}</view>
			</view>
			<view class="deltext"  @tap="delmsglist(msg)">删除</view>
		</view>
	<!-- 	<view class="line-wrap"><view class="line"></view> </view> -->
	</view>
</template>

<script>
	import nodata from '@/components/nodata/nodata.vue';
	
	export default {
		components:{
			nodata,
		},
		data() {
			return {
				userobj:{},
				msglist:[],
			}
		},
		onLoad() {
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user;
				me.getmsglist();
			}
		},
		methods: {
			/* 查看消息详情 */
			gotomsgdetail(msg){
				var me = this;
			 
				var uid = me.userobj.id;
				var touid=0;
				
				if(uid == msg.fromuid){
					touid = msg.touid;
				}else{
					touid = msg.fromuid;
				} 
				uni.navigateTo({
					url:'/pages/imchat/imchat?tcuserid='+touid
				})
			},
			/* 删除单个消息详情 */
			delmsglist(msg){
				var me = this;
				
				var uid = me.userobj.id;
				var touid=0;
				if(uid == msg.fromuid){
					touid = msg.touid;
				}else{
					touid = msg.fromuid;
				}
				/* 删除只是进行单方面的删除. */
				me.webhttp({
					url:me.websiteUrl + 'delmsgdetail',
					method:'GET',
					data:{
						fromuid:uid,
						touid:touid	
					}
				}).then(res=>{
					//console.info(res);
					if(res.code == 200){
						me.getmsglist();
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				}); 
			},
			getmsglist(){
				var me = this;
				me.webhttp({
					url:me.websiteUrl + 'getmsglist',
					method:'GET',
					data:{
						tcuserid : me.userobj.id	
					}
				}).then(res=>{
					console.info(res);
					if(res.code == 200){
						me.msglist = res.msglist;
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
			}
		}
	}
</script>

<style>
@import url("mytidings.css");
</style>
