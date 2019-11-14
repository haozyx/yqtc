<template name="listFoot">
	<view>
		<!-- 时间-->
		<view class="timewrap">
			<view class="viewwrap">
				<image src="https://img.yohaoyun.com/yohaoyun/static/tc/heart1.png" class="viewleftimg"></image>
				<view class="view-count">{{tcinfo.msgviews}} 浏览量 、</view>
			</view>
			<view class="timetext">{{timestampFormat(tcinfo.msgpublishtime)}}</view>
			<fa-icon class="fa-commenting-o" size="14" style="margin-left: auto;" color="#999999" @tap="dhflag=!dhflag"></fa-icon>
			<!-- 动画组件-->
			<view class="donghuawrap" :class="{gdshow:dhflag}">
				<view class="dt-item" @tap="gotoreport">
					<fa-icon color="#FFFFFF" size="10" class="fa-exclamation-circle"></fa-icon>
					<view class="dt-text">举报</view>  
				</view>
				 <view class="dt-item" @tap="collectinfo">
					<fa-icon color="#FFFFFF" size="10" class="fa-star"></fa-icon>
					<view class="dt-text">收藏</view>  
				 </view> 
			<!-- 	 <view class="dt-item">
					<fa-icon color="#FFFFFF" size="10" class="fa-envelope-o"></fa-icon>
					<view class="dt-text">私信</view>  
				 </view> -->
				 <view class="dt-item" @tap="showmessagepop">
					<fa-icon color="#FFFFFF" size="10" class="fa-comment-o"></fa-icon>
					<view class="dt-text">评论</view>  
				 </view> 
			</view>
							
		</view>
		<!-- 上三角 -->
<!-- 		<view class="shangsanjiao"> </view>
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
		</view> -->
		
		
		<!-- 弹出层 -->
		<view>
			<uni-popup type="center" ref="messagepop" :custom="true" :mask-click="false">
				<view class="auditwraper">
					<view class="head-title">留言内容</view>
					<view class="textareawrap1">
						<textarea maxlength="20" placeholder="输入...." class="text-input" style="border: 1px solid #F1F1F1 ;"></textarea>
						
					</view>
					<view class="audit-bottom">
						<view class="audit-text no" @tap="accessno">取消</view>
						<view class="audit-text ok globalblue" @tap="accessyes"> 确定</view>
					</view>
				</view> 
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		name:"listFoot",
		components:{
			uniPopup,
		},
		props:{
			tcinfo:{}
		},
		data() {
			return {
				dhflag:false,
			};
		},
		methods:{
			/* 打开留言框 */
			showmessagepop(){
				this.$refs.messagepop.open();
			},
			accessno(){
				this.$refs.messagepop.close();
			},
			accessyes(){
				console.log("点击了确定");
				this.$refs.messagepop.close();
			},
			collectinfo(){
				uni.showToast({
					title: '收藏成功',
					icon:'none'
				});
				this.dhflag=!this.dhflag;
			},
			gotoreport(){
				uni.navigateTo({
					url:'../../pages/report/report'
				})	 
			},
			/* 时间格式化 */
			zeroize( num ) {
			    return (String(num).length == 1 ? '0' : '') + num;
			},
			timestampFormat( timestr ) {
				var me =this;
				var timestamp = Date.parse(timestr)/1000;
			
			    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
			    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
			
			    var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
			    var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象
			
			    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
			    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
			
			    if ( timestampDiff < 60 ) { // 一分钟以内
			        return "刚刚";
			    } else if( timestampDiff < 3600 ) { // 一小时前之内
			        return Math.floor( timestampDiff / 60 ) + "分钟前";
			    } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
			        return '今天' + me.zeroize(H) + ':' + me.zeroize(i);
			    } else {
			        var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
			        if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
			            return '昨天' + me.zeroize(H) + ':' + me.zeroize(i);
			        } else if ( curDate.getFullYear() == Y ) {
			            return  me.zeroize(m) + '月' + me.zeroize(d) + '日 ' + me.zeroize(H) + ':' + me.zeroize(i);
			        } else {
			            return  Y + '年' + me.zeroize(m) + '月' + me.zeroize(d) + '日 ' + me.zeroize(H) + ':' + me.zeroize(i);
			        }
			    }
			},
			
			
		}
	}
</script>

<style>
@import url("list-foot.css");
</style>
