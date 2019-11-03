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
					<image :src="clz.img" class="clzimg"></image>
					<view class="clztext">{{clz.name}}</view>
				</view>
			</block>
		</view>
		<!-- 栏目分类 end-->
		
		<!-- 各个分类下的弹出层 start -->
		<view>
			<!-- 顺风车 -->
			<uni-popup type="center" ref="shunfengchepop" :custom="true" :mask-click="true">
				 <view class="itemwrap">
					<view class="item-text">
						请选择发布类型
					</view>
					 <view class="item-text" @tap="gotochezhaoren">
					 	车找人
					 </view>
					 <view class="item-text">
					 	人找车
					 </view>
					 <view class="item-text noboder">
					 	天天拼
					 </view>
				 </view>
			</uni-popup>
			<!-- 招聘求职 -->
			<uni-popup type="center" ref="zhaopinpop" :custom="true" :mask-click="true">
				 <view class="itemwrap">
					<view class="item-text">
						请选择发布类型
					</view>
					 <view class="item-text">
					 	招聘
					 </view>
					 <view class="item-text noboder">
					 	求职
					 </view>
				 </view>
			</uni-popup>
			<!-- 本地服务 -->
			<uni-popup type="bottom" ref="bendifuwupop" :custom="true" :mask-click="true">
				 <view class="itemwrap-bottom">
					<view class="item-text-center">
						请选择发布类型
					</view>
					<view class="twoitem">
						<view class="item-text-one">
							家政服务
						</view>
						<view class="item-text-one">
							维修服务
						</view>
						<view class="item-text-one">
							装修服务
						</view>
						<view class="item-text-one">
							商务服务
						</view>
					</view>
					 
				 </view>
			</uni-popup>
			<!-- 汽车交易 -->
			<uni-popup type="center" ref="qichejiaoyipop" :custom="true" :mask-click="true">
				 <view class="itemwrap">
					<view class="item-text">
						请选择发布类型
					</view>
					 <view class="item-text">
					 	出售
					 </view>
					 <view class="item-text noboder">
					 	求购
					 </view>
				 </view>
			</uni-popup>
			<!-- 房屋租售 -->
			<uni-popup type="center" ref="fangwuzushoupop" :custom="true" :mask-click="true">
				 <view class="itemwrap">
					<view class="item-text">
						请选择发布类型
					</view>
					 <view class="item-text">
					 	出售
					 </view>
					 <view class="item-text">
					 	出租
					 </view>
					 <view class="item-text">
					 	求组
					 </view>
					 <view class="item-text noboder">
					 	求购
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
			}
		},
		methods: {
			openclzsel(id){
				var me = this;
				switch (id){
				case 1:
					me.$refs.shunfengchepop.open();
					break;
				case 2:
					me.$refs.zhaopinpop.open();
					break;
				case 3:
					me.$refs.bendifuwupop.open();
					break;	
				case 4:
					me.$refs.fangwuzushoupop.open();
					break;
				case 5:
					 
					break;
				case 6:
					me.$refs.qichejiaoyipop.open();
					break;
				case 7:
					me.$refs.ershouwupinpop.open();
					break;									
				default:
					break;
				}
				
			},
			gotochezhaoren(){
				uni.navigateTo({
					url:'/pages/publish/chezhaoren/chezhaoren'
				})
			}
		}
	}
</script>

<style>
	@import url("publish.css");
</style>
