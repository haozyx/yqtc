<template name="listFoot">
	<view>
		<!-- 时间-->
		<view class="timewrap">
			<view class="timetext">2019-10-26 20:53:54</view>
							<fa-icon class="fa-commenting-o" size="14" color="#999999" @tap="dhflag=!dhflag"></fa-icon>
							<!-- 动画组件-->
							<view class="donghuawrap" :class="{gdshow:dhflag}">
								<view class="dt-item">
									<fa-icon color="#FFFFFF" size="10" class="fa-exclamation-circle"></fa-icon>
									<view class="dt-text">举报</view>  
								</view>
								 <view class="dt-item">
									<fa-icon color="#FFFFFF" size="10" class="fa-star"></fa-icon>
									<view class="dt-text">收藏</view>  
								 </view> 
								 <view class="dt-item">
									<fa-icon color="#FFFFFF" size="10" class="fa-envelope-o"></fa-icon>
									<view class="dt-text">私信</view>  
								 </view> 
								 <view class="dt-item">
									<fa-icon color="#FFFFFF" size="10" class="fa-comment-o"></fa-icon>
									<view class="dt-text">评论</view>  
								 </view> 
							</view>
							
		</view>
		<!-- 上三角 -->
		<view class="shangsanjiao"> </view>
		<view class="viewwrap">
			<image src="../../static/img/index/heart1.png" class="viewleftimg"></image>
			<view class="view-count">110 浏览量</view>
		</view>
		
		<view class="comment-wrap">
			<view class="comment-item">
				<view class="comment-nickname">小小微 : </view>
				哈哈哈哈哈哈
			</view>
			<view class="comment-item">
				<view class="comment-nickname">小小微 : </view>
				哈个屁
			</view>
			<view class="morecomment">
				查看更多评论
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"listFoot",
		data() {
			return {
				dhflag:false,
			};
		}
	}
</script>

<style>
@import url("list-foot.css");
</style>
