<template>
	<view class="page">
		<view class="title">
			
			{{objinfo.name}}
			
		</view>
		<view class="textwrap" >
			<view >电话：{{objinfo.phone}} </view>
			<image src="https://img.yohaoyun.com/yohaoyun/tongcheng/you.png" class="you"></image>
		</view>
		<view class="line-wrap"> <view class="line"></view> </view>
		<view class="textwrap" >
			<view >地址：{{objinfo.address}} </view>
			<image src="https://img.yohaoyun.com/yohaoyun/tongcheng/you.png" class="you"></image>
		</view>
		<view class="line-wrap"> <view class="line"></view> </view>
		
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(bimg,index) in bannerimgarry" :key="index">
				<image :src="bimg" class="carousel"></image>
			</swiper-item>
		 
		</swiper>
		<!-- 轮播图end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				objinfo:{},
				bannerimgarry:['https://img.yohaoyun.com/yohaoyun/tongcheng/ad/detailad.jpg','https://img.yohaoyun.com/yohaoyun/tongcheng/ad/detailad.jpg','https://img.yohaoyun.com/yohaoyun/tongcheng/ad/detailad.jpg']
			}
		},
		onLoad(e){
			var me = this;
			me.getDetail(e.id);
		},
		methods: {
			getDetail(id){
				var me = this;
				uni.request({
					url: me.websiteUrl + 'getbyid',
					method: 'GET',
					data: {id:id},
					success: res => {
						//console.log(res);
						if(res.data.code ==200){
							me.objinfo = res.data.objinfo;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
 
<style>
@import url("detail.css");
</style>
