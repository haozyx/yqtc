<template>
	<view>
		<view class="content"  >
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation"   :scroll-into-view="scrollToView"   >
				<!-- 加载历史数据waitingUI -->
				<view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(msg,index) in msgList" :key="index" :id="'msg'+msg.id">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="msg.fromuid==userobj.id">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view   class="bubble">
									<rich-text :nodes="msg.message_content"></rich-text>
								</view>
								
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="msg.fromuimg"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="msg.fromuid!=userobj.id">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="msg.fromuimg"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">123</view> <view class="time">{{msg.send_time}}</view>
								</view>
								<!-- 文字消息 -->
								<view  class="bubble">
									<rich-text :nodes="msg.message_content"></rich-text>
								</view>
								 
							</view>
						</view>
				 
				</view>
			</scroll-view>
		</view>
		 
		<!-- 底部输入栏 -->
		<view class="input-box"   @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			 
			<view class="textbox">
				 
				<view class="text-mode"   >
					<view class="box">
						<textarea auto-height="true" v-model="textMsg"  />
					</view>
				</view>
			</view>
		 
			<view class="send"   @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userobj:{},
				touserobj:{},
				touid:0,
				//文字消息
				textMsg:'',
				//消息列表
				scrollAnimation:false,
				scrollToView:'',
				msgList:[],
				 
			};
		},
		onLoad(e) {
			var me = this;
			me.touid = e.tcuserid;
			me.gettouserobj();
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user;
				me.getmsgdetail(user.id,me.touid);
			}
			
		},
		methods:{
			getmsgdetail(fromuid,touid){
				var me = this;
				uni.request({
					data:{fromuid:fromuid,touid:touid},
					url:me.websiteUrl+'getmsgdetail',
					method:'GET',
					success: (res) => {
						if(res.data.code == 200){
							 me.msgList = res.data.detaillist;
							 if(me.msgList.length>0){
								 me.$nextTick(function() {
								 	// 滚动到底
								 	me.scrollToView = 'msg'+ me.msgList[me.msgList.length-1].id;
								 });
							 }
							
						}
					}
				});
				
			},
			//获取发消息的用户ID
			gettouserobj(){
				var me = this;
				me.webhttp({
					url:me.websiteUrl + 'gettcuserbyid',
					method:'GET',
					data:{
						id:me.touid	
					}
				}).then(res=>{
					if(res.code == 200){
						 
						me.touserobj = res.tcuser;
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
			},
	  
			// 发送文字消息
			sendText(){
				 
				if(!this.textMsg){
					return;
				}
				let content = this.textMsg;
				 
				this.sendMsg(content);
				this.textMsg = '';//清空输入框
			},
		 
			
			// 发送消息
			sendMsg(content){
				var me= this;
				//这里保存用户发送的消息 
				var sendbean={
					send_id:me.userobj.id,
					recieve_id:me.touserobj.id,
					fromuid:me.userobj.id,
					fromuimg:me.userobj.touxiangimg,
					touid:me.touserobj.id,
					touimg:me.touserobj.touxiangimg,
					fromuname:me.userobj.nickname,
					touname:me.touserobj.nickname,
					message_type:1,
					message_content:content,
					status:1
				};
				 
				me.webhttp({
					url:me.websiteUrl + 'sendmsg',
					method:'post',
					data:sendbean
				}).then(res=>{
					if(res.code == 200){
						//发送成功后重新请求一下
						me.getmsgdetail(me.userobj.id,me.touid);
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
				 
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				 // 用户消息
				this.addTextMsg(msg); 
				console.log('用户消息');
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg'+msg.msg.id
				});
			},
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			discard(){
				return;
			}
		}
	}
</script>

<style lang="scss">
@import "@/pages/imchat/imchat.scss"; 
</style>
