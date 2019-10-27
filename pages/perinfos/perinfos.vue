<template>
	<view class="page">
		<!-- 头像start -->
			<view class="headwrap">
				<view class="imgwrap">
					<image class="tximg" src="../../static/img/index/nantx.png"></image>
					<image class="seximg" src="../../static/img/perinfos/nv.png"></image>
				</view>
				<view class="bodywrap">
					<view class="infoitem jiacu">昵称: 樱桃小丸子</view>
					<view class="infoitem">注册时间: 2019年10月27日</view>
					<view class="infoitem">信息发布: 100条</view>
				</view>
			</view>
		<!-- 头像end -->
		
		<!-- 下面是这个人发布的所有的信息 -->
		<listContent @disdetail="gotodetail"></listContent>
		<listContent @disdetail="gotodetail"></listContent>
		<listContent @disdetail="gotodetail"></listContent>
		
	</view>
</template>

<script>
	import listContent from '../../components/list-content/list-content.vue';
	export default {
		data() {
			return {
				
			}
		},
		components:{
			listContent,
		},
		methods: {
			gotodetail(){
				uni.navigateTo({
					url:'../detail/detail'
				})
			},
		}
	}
</script>

<style>
@import url("perinfos.css");
</style>
