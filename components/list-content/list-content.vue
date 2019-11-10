<template name="list-content">
	<view>
		<!-- 列表详情 start-->
		<view class="listwrap">
			<image class="leftimg" @tap="disperinfos" src="../../static/img/index/nantx.png" ></image>
			<view class="contentwrap" >
				<!-- title 左右结构-->
				<view class="titlewrap">
					<view class="title-zd">置顶</view>
					<view class="title-fl">招聘</view>
					<view class="title-nicheng">樱桃小丸子樱桃小丸子樱桃小丸子樱桃小丸子</view>
					<view class="rightsee" @tap="gotodetail">
						<image src="https://img.yohaoyun.com/yohaoyun/static/tc/eye.png" class="eyeimg"></image>
						<view class="seetext" >详情</view>
					</view>
				</view>

				<!-- 内容  start-->
				
				<view :class="{ contentbody: true, active: showall }">
					<view class="tagtag">
						<!-- primary、success、warning、danger、royal -->
						<uni-tag inverted="true" type="primary" text="你好"></uni-tag>
					</view>
					<view class="tagtag">
						<!-- primary、success、warning、danger、royal -->
						<uni-tag inverted="true" type="error" text="你好"></uni-tag>
					</view>
					<view class="tagtag">
						<!-- primary、success、warning、danger、royal -->
						<uni-tag inverted="true" type="warning" text="你好"></uni-tag>
					</view>
					<view class="tagtag">
						<!-- primary、success、warning、danger、royal -->
						<uni-tag inverted="true" type="success" text="你好"></uni-tag>
					</view>
					<view class="">黄河路附近有单间出租.黄河路附近有单间出租.黄河路附近有单间出租.黄河路附近有单间出租.</view>
					<!-- 招聘求职 start -->
					<block v-if="ctype == 'zhaopin'">
						<view>
							<view class="content-tag">招聘职位 :</view>
							公务员
						</view>
					</block>
				
					<block v-if="ctype == 'qiuzhi'">
						<view>
							<view class="content-tag">期望职位 :</view>
							公务员
						</view>
						<view>
							<view class="content-tag">性别 :</view>
							男
						</view>
						<view>
							<view class="content-tag">工作经验 :</view>
							5年
						</view>
						<view>
							<view class="content-tag">期望薪资 :</view>
							1W-2W
						</view>
					</block>
					<!-- 招聘求职 end -->
					<!-- 顺风车 start -->
					<block v-if="ctype == 'chezhaoren'">
						<view>
							<view class="content-tag">出发地 :</view>
							英言乡
						</view>
						<view>
							<view class="content-tag">目的地 :</view>
							垣曲县
						</view>
						<view>
							<view class="content-tag">出发时间 :</view>
							2019年10月27日13:24:16
						</view>
						<view>
							<view class="content-tag">剩余位置 :</view>
							1个
						</view>
					</block>
				
					<block v-if="ctype == 'renzhaoche'">
						<view>
							<view class="content-tag">出发地 :</view>
							英言乡
						</view>
						<view>
							<view class="content-tag">目的地 :</view>
							垣曲县
						</view>
						<view>
							<view class="content-tag">出发时间 :</view>
							2019年10月27日13:24:16
						</view>
						<view>
							<view class="content-tag">乘客人数 :</view>
							2位
						</view>
					</block>
					<block v-if="ctype == 'tiantianpin'">
						<view>
							<view class="content-tag">出发地 :</view>
							英言乡
						</view>
						<view>
							<view class="content-tag">目的地 :</view>
							垣曲县
						</view>
						<view>
							<view class="content-tag">车找人 :</view>
							随时联系
						</view>
						<view>
							<view class="content-tag">可乘人数 :</view>
							5人
						</view>
					</block>
					<!-- 招聘求职 end -->
					<!-- 房屋信息 end-->
					<block v-if="ctype == 'fangwuchuzu'">
						<view>
							<view class="content-tag">房屋位置 :</view>
							黄河路时代春天对面民针具背后的家属院那里右拐
						</view>
						<view>
							<view class="content-tag">房屋面积 :</view>
							120平方米
						</view>
						<view>
							<view class="content-tag">房屋户型 :</view>
							三室两厅
						</view>
						<view>
							<view class="content-tag">装修情况 :</view>
							精装
						</view>
					</block>
					<block v-if="ctype == 'fangwuchushou'">
						<view>
							<view class="content-tag">房屋位置 :</view>
							黄河路时代春天对面民针具背后的家属院那里右拐
						</view>
						<view>
							<view class="content-tag">房屋面积 :</view>
							120平方米
						</view>
						<view>
							<view class="content-tag">房屋户型 :</view>
							120平方米
						</view>
						<view>
							<view class="content-tag">房屋售价 :</view>
							120平方米
						</view>
					</block>
					<!-- 房屋信息 end -->
					<!-- 生意转让 start-->
					<block v-if="ctype == 'fangwuchushou'">
						<view>
							<view class="content-tag">行业 :</view>
							哈哈
						</view>
					</block>
				
					<!-- 生意转让 end-->
				
					<view class="content-phone">15120034501</view>
				
					<view class="callphone">
						<fa-icon color="#FFFFFF" size="15" class="fa-phone"></fa-icon>
						<view class="inlineblock">拨打电话</view>
					</view>
					<view class="sendmsg">
						<fa-icon color="#000000" size="15" class="fa-envelope-o "></fa-icon>
						<view class="inlineblock">发送私信</view>
					</view>
				</view>
				<!-- 显示全文-->
				<view class="disall" @tap="showall = !showall">{{ showall==true ? '隐藏' : '显示全文' }}</view>
				<!-- 内容  end-->
				 

				<!-- 图片 -->
				<view class="cont-img-wrap" :class="{ active: showallimg }">
					<image class="cont-img" src="../../static/img/index/meinv.jpg"></image>
					<image class="cont-img" src="../../static/img/index/meinv.jpg"></image>
					<view class="moreimg-wrap">
						<image class="cont-img" src="../../static/img/index/meinv.jpg"></image>
						<view class="moreimg-text" :class="{ showmore: showallimg }" @tap="showallimg=!showallimg">更多图片</view>
					</view>
					<image class="cont-img" src="../../static/img/index/meinv.jpg"></image>
				</view>

				<list-foot></list-foot>
			</view>
		</view>


	</view>
</template>

<script>
import listFoot from '../list-foot/list-foot.vue';
//标签
import uniTag from '@/components/uni-tag/uni-tag.vue';
export default {
	name: 'list-content',
	components:{
		listFoot,
		uniTag,
	},
	props: {
		ctype: {
			type: String,
			default: ''
		},
		tcbean:{},
		disallimg:{
			type:Boolean,
			default:false
		},
		disall:{
			type:Boolean,
			default:false
		},
		 
	},
	created() {
		var me = this;
		if(me.disall){
			me.showall = true;
		}
		if(me.disallimg){
			me.showallimg = true;
		}
	},
	data() {
		return {
			showall:false,
			showallimg:false,
			tagarry:['success','error','warning','primary']
		};
	},
	methods:{
		gotodetail(){
			console.info("1333");
			this.$emit('disdetail',{a:1});
		},
		disperinfos(){
			uni.navigateTo({
				url:'../../pages/perinfos/perinfos'
			})
		},
		 
	}
};
</script>

<style>
@import url('list-content.css');
</style>
