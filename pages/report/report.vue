<template>
	<view>
		<view class="info-wapper">
			<view class="info-title">请选择举报原因</view>
			<view class="info-body">
				<view class="tagwrap" v-for="(tag, index) in tagarry" :key="index">
					<uni-tag :inverted="choosetagarry.indexOf(tag) == -1" :text="tag" 
					:data-tagname="tag" @tap="seltag" type="primary" />
				</view>
			</view>
		</view>
		
		<view class="grayspace"></view>
		<view class="info-wapper">
			<view class="info-title">备注说明(0-100字)</view>
			<view class="info-body">
				<textarea maxlength="100" v-model="content" class="notetext" placeholder="请简要说明您的举报理由,以便工作人员进行审核判断."></textarea>
			</view>
		</view>
		 
		<view >
			<button class="reportbtn" @tap="saveinfo">确定</button>
		</view>
	</view>
</template>

<script>
	//标签
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	export default {
		data() {
			return {
				userobj:{},
				msgid:0,
				oneclick:false,
				content:'',
				tagarry:[' 电话虚假（空号、无人接听）','涉黄违法',' 虚假信息（如职位、待遇等）','恶意营销','其他'],
				choosetagarry:[],
			}
		},
		components:{
			uniTag
		},
		onLoad(e) {
			var me = this;
			var userinfo = me.getGlobalTCUser();
			if(userinfo){
				me.userobj = userinfo;
				me.msgid = e.msgid;
			}
		},
		methods: {
			saveinfo(){
				var me = this;
				//请求不让多次点击
				if(this.oneclick) return;
				this.oneclick = true;
				setTimeout(()=>{ this.oneclick = false; }, 3000);
				
				if(me.choosetagarry.length == 0){
					uni.showToast({
						title:'请选择举报原因',
						icon:'none',
						mask:true
					});
					return ;
				}
				if(me.content==""){
					uni.showToast({
						title:'请填写举报理由',
						icon:'none',
						mask:true
					});
					return ;
				}
				
				
				var rpo ={};
				 rpo.msgid = me.msgid;
				 rpo.userid = me.userobj.id;
				 rpo.reason = me.choosetagarry[0];
				 rpo.content = me.content;
				me.webhttp({
					url:me.websiteUrl + 'savereportinfo',
					method:'POST',
					data:rpo,
					showloading:true
				}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: "感谢您的反馈",
							icon:'none',
							mask:true,
							duration:5000
						});
						
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							});
						},3000);
						console.info("3秒后进行跳转");
						
						
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
				 
				 
			},
			/* 可选择的举报原因 */
			seltag(e){
				var me = this;
				
				var tagname = e.e.currentTarget.dataset.tagname;
				if (me.choosetagarry.indexOf(tagname) != -1) {
					me.choosetagarry.splice(me.choosetagarry.indexOf(tagname), 1);
				} else {
					if(me.choosetagarry.length ==1){
						me.choosetagarry = [];
						me.choosetagarry.push(tagname);
						 
					}else{
						me.choosetagarry.push(tagname);
					}
					
				}
			},
		}
	}
</script>

<style>
@import url("report.css");
</style>
