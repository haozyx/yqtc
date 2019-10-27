<template>
	<view class="page">
		<!-- 网站横幅 start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(bimg,index) in bannerimgarry" :key="index">
				<image :src="bimg.imgurl" class="carousel"></image>
			</swiper-item>
		 
		</swiper>
		<!-- 网站横幅 end -->
		<!-- 内容详情 start -->
			<list-content :disall="true" :disallimg="true"></list-content>
		<!-- 内容详情 end -->
		
	</view>
</template>

<script>
	import listContent from '../../components/list-content/list-content.vue';
	export default {
		data() {
			return {
				bannerimgarry:[{imgurl:'../../static/img/detail/ad1.jpg'}],
			}
		},
		components:{
			listContent
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("detail.css");
</style>
