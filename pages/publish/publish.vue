<template>
	<view class="page-fill">
		<view class="headwrap">
			<view class="title">
				您发布的信息将会实时展示，请确保发布的信息真实有效。
			</view>
			<view class="lanmu">----请选择你要发布的栏目----</view>
		</view>

		<!-- 栏目分类 start-->
		<view class="classify">
			<block v-for="(clz,index) in classifyarry" :key="index">
				<view class="clzwraper" @tap="openclzsel(clz.id)" :data-id="clz.id">
					<image :src="clz.icon" class="clzimg"></image>
					<view class="clztext">{{clz.name}}</view>
				</view>
			</block>
		</view>
		<!-- 栏目分类 end-->
		
		<!-- 各个分类下的弹出层 start -->
		<view>
			<!-- 各个分类下的弹出层分为两类 A类:只有简单几项中间界面可以放置的下
			 B类,分类超过8项采用底部弹出的方式
			 -->
			<uni-popup type="center" ref="aleipop" :custom="true" :mask-click="true">
				 <view class="itemwrap">
					<view class="item-text">
						请选择发布类型
					</view>
					<block v-for="(a,index) in aleiarry" :key="index">
						<view class="item-text"  :class="{noboder:(index+1) == aleiarry.length}" @tap="gotoaddinfo(a.id)">
							{{a.name}}
						</view>
					</block>
					 
				 </view>
			</uni-popup>
			 
			<!-- 本地服务 -->
			<uni-popup type="bottom" ref="bleipop" :custom="true" :mask-click="true">
				 <view class="itemwrap-bottom">
					<view class="item-text-center">
						请选择发布类型
					</view>
					<view class="twoitem">
						<view class="item-text-one" v-for="(b,index) in bleiarry" :key="index" @tap="gotoaddinfo(b.id)"> 
							{{b.name}}
						</view>
					</view>
					 
				 </view>
			</uni-popup>
		</view>
		<!-- 各个分类下的弹出层 end -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
		
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				classifyarry:[
					{'id':1,'name':'顺风车','img':'../../static/img/index/shunfengche.png'},
					{'id':2,'name':'招聘求职','img':'../../static/img/index/zhaopin.png'},
					{'id':3,'name':'本地服务','img':'../../static/img/index/bendi.png'},
					{'id':4,'name':'房屋租售','img':'../../static/img/index/fangzi.png'},
					{'id':5,'name':'生意转让','img':'../../static/img/index/shengyi.png'},
					{'id':6,'name':'汽车交易','img':'../../static/img/index/qichejiaoyi.png'},
					{'id':7,'name':'二手物品','img':'../../static/img/index/ershou.png'}],
				aleiarry:[],
				bleiarry:[],
			}
		},
		onLoad() {
			var me = this;
			me.gettwocategory();
			
			var user = me.getGlobalTCUser();
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
			
		},
		methods: {
			openclzsel(id){
				var me = this;
				me.getthreecategroy(id);
			},
			/* 根绝分类的不同显示不同的发布页面 */
			gotoaddinfo(id){
				//关闭分类选择--没有进行记录这里统一关闭
				this.$refs.aleipop.close();
				this.$refs.bleipop.close();
				uni.navigateTo({
					url:'/pages/publish/addinfo/addinfo?categoryid='+id
				})
			},
			/* 获取分类信息 */
			gettwocategory(){
				var me = this;
				
				me.webhttp({
					url: me.websiteUrl + 'gettwocategory',
					method: 'GET',
					data: {},
				}).then(res=>{
					if(res.code == 200 ){
						me.classifyarry = res.list; 
					}
				});
			},
			getthreecategroy(pid){
				var me =this;
 
				me.webhttp({
					url: me.websiteUrl + 'getthreecategory',
					method: 'GET',
					data: {pid:pid},
				}).then(res=>{
					if(res.code == 200 ){
						if(res.list!=""&&res.list.length>6){
							me.bleiarry = res.list;
							me.$refs.bleipop.open();
						}else{
							me.aleiarry = res.list;	
							me.$refs.aleipop.open();
						}
						
						
					}
				});
			}
		}
	}
</script>

<style>
	@import url("publish.css");
</style>
