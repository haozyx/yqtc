<template>
	<view>
		
		<view class="info-wapper-tx">
			<label class="words-lbl">我的头像</label>
			
			<image class="usertx" :src="userobj.touxiangimg"></image>
			
			<avatar selWidth="300upx"
				selHeight="300upx" 
				@upload="myUpload" 
				:avatarSrc="myimgurl" 
				stretch="x"
				quality="1"
				inner="true"
				avatarStyle="border-radius:0; width: 30px; height: 30px;padding: 20upx; margin-left: 20px;border: 1px solid #F1F1F1;">
				</avatar>  
		</view>
		<view class="grayspace"></view>
		<view class="info-wapper">
			<label class="words-lbl">设置昵称</label>
			<input name="username" type="text" v-model="userobj.nickname"  class="input" placeholder="请输入用户名" placeholder-class="graywords" />
		</view>

		<view class="info-wapper" >
			<label class="words-lbl">绑定手机</label>
			<input name="password" type="text" value="" v-model="userobj.phone"   class="input" placeholder="请输入手机号"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl">绑定微信</label>
			<input name="password" type="text" v-model="userobj.wxaccount"   class="input" placeholder="请输入微信号"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl">真实姓名</label>
			<input name="password" type="text" v-model="userobj.pername"  class="input" placeholder="请输入真是姓名"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl" >修改性别</label>
			<view class="sexrap">
				<radio-group  @change="sexChange">
					<label class="sexlabel"><radio style="transform:scale(0.7)" value="1" :checked="userobj.sex == '1'" /> 男</label>
					<label class="sexlabel"><radio  style="transform:scale(0.7)" value="2" :checked="userobj.sex == '2' "/> 女</label>
					<label class="sexlabel"><radio  style="transform:scale(0.7)" value="0" :checked="userobj.sex == '0' "/> 保密</label>
				</radio-group>
			</view>
		</view>
		
		<view>
			<button class="updatebtn" @tap="savetcuser">确认修改</button>
		</view>
	</view>
</template>

<script>
	//图像裁剪上传
	import avatar from '@/components/yq-avatar/yq-avatar.vue';
	export default {
		data() {
			return {
				myimgurl:'https://img.yohaoyun.com/yohaoyun/tongcheng/upload.png',
				userid:0,
				sex:-1,
				oneclick:false,
				userobj:{},
			}
		},
		components:{
			avatar,
		},
		onLoad(){
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userid = user.id;
				me.getmeinfo();
			}
		},
		methods: {
			sexChange(e){
				this.userobj.sex = e.detail.value;
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
			/* 保存我的信息 */
			savetcuser(){
				var me = this;
				//请求不让多次点击
				if(this.oneclick) return;
				this.oneclick = true;
				setTimeout(()=>{ this.oneclick = false; }, 3000);
				 
				var userobj1 =me.userobj;
				
				me.webhttp({
					url:me.websiteUrl + 'savetcuser',
					method:'POST',
					data:userobj1
				}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title:'修改成功',
							icon:'none',
							mask:true
						});
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
			},
			/* 图片上传 */
			myUpload(rsp) {
				 
				var me = this;
				//数据对象的双向绑定
				//me.$set(me.userobj,'imgurl',rsp.path);
				me.uploadimg(rsp.path);
			},
			uploadimg(imgpath) {
				var me = this;
				uni.showLoading({
					title: '正在上传...'
				});
				// 开始上传
				uni.uploadFile({
					url: me.websiteUrl + 'uploadtx',
					filePath: imgpath,
					name: 'file',
					success: res => {
						var rjson = JSON.parse(res.data);
						//	console.log(rjson.data);
						var uimgurl = rjson.data;
						me.$set(me.userobj,'touxiangimg',uimgurl);
					  
					}, complete: ()=> {
						uni.hideLoading();
					}
				});
			},
			 
		}
	}
</script>

<style>
	@import url("updateme.css");
</style>
