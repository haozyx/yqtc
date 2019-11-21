<template>
	<view class="page-fill">
		
		<nodata v-if="msglist.length == 0"></nodata>
		
		<view class="msgwrap"  v-for="(msg,index) in msglist" :key="index">
			<image class="tximg" :src="msg.touimg"></image>
			<view class="rightwrap" @tap="gotomsgdetail(msg.touid)">
				<view class="timetext">{{msg.send_time}}</view>
				<view class="msgtext">{{msg.message_content}}</view>
			</view>
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
			gotomsgdetail(touid){
				uni.navigateTo({
					url:'/pages/imchat/imchat?tcuserid='+touid
				})
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
					// console.info(res);
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
