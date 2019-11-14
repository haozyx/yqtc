<template name="list-content">
	<view>
		<!-- 列表详情 start-->
		<view class="listwrap" v-for="(tc,index) in tcinfolist" :key="index">
			<image class="leftimg" @tap="disperinfos" src="../../static/img/index/nantx.png" ></image>
			<view class="contentwrap" >
				<!-- title 左右结构-->
				<view class="titlewrap">
					<view class="title-zd">置顶</view>
					<view class="title-fl">{{tc.msgtypename}}</view>
					<view class="title-nicheng">{{tc.tcusernickname}}</view>
					<view class="rightsee" @tap="gotodetail">
						<image src="https://img.yohaoyun.com/yohaoyun/static/tc/eye.png" class="eyeimg"></image>
						<view class="seetext" >详情</view>
					</view>
				</view>

				<!-- 内容  start-->
				
				<view :class="{ contentbody: true, active: showall }">
					<block v-if="tc.msgtags!='' ">
						<view class="tagtag" v-for="(tag,tx) in tc.msgtags.split(';')" :key="tx">
							<uni-tag inverted="true" :type="tagarry[tx%4]" :text="tag"></uni-tag>
						</view>
					 </block>
					
					<!--8 招聘求职 start  13 招聘 14求职-->
					<block v-if="tc.msgptypeid == 8">
						<view>
							<view class="content-tag">工作职位 :</view>
							{{tc.gongzuozhiwei}}
						</view>
						<view>
							<view class="content-tag">性别 :</view>
							{{tc.gongzuosex}}
						</view>
						<view v-if="tc.msgtypeid == 14">
							<view class="content-tag">工作经验 :</view>
							{{tc.gongzuojingyan}}
						</view>
						<view v-if="tc.msgtypeid == 13">
							<view class="content-tag">岗位薪资 :</view>
							{{tc.qiwangxinzi}}
						</view>
						<view v-if="tc.msgtypeid == 14">
							<view class="content-tag">期望薪资 :</view>
							{{tc.qiwangxinzi}}
						</view>
					</block>
					<!-- 招聘求职 end -->
					<!-- 顺风车 start 9 == 顺风车 12 =天天拼 -->
					<block v-if="tc.msgptypeid == 9">
						<view>
							<view class="content-tag">出发地 :</view>
							{{tc.chufadi}}
						</view>
						<view>
							<view class="content-tag">目的地 :</view>
							{{tc.mudidi}}
						</view>
						<view v-if="tc.msgtypeid != 12">
							<view class="content-tag">出发时间 :</view>
							{{tc.chengcheshijian}}
						</view>
						<view>
							<view class="content-tag">乘客人数 :</view>
							{{tc.chengkerenshu}}
						</view>
					</block>
					 
					<!-- 招聘求职 end -->
					<!-- 房屋信息  start 5=房屋租售 6 出售 26出租 -->
					<block v-if="tc.msgptypeid == 5">
						<block v-if="tc.msgtypeid==6 || tc.msgtypeid==26">
						<view>
							<view class="content-tag">房屋位置 : </view>
							{{tc.fangwuweizhi}}
						</view>
						 
						<view>
							<view class="content-tag">装修情况 : </view>
							{{tc.zhuangxiuqingkuang}}
						</view>
						</block>
					</block>
			 
					<!-- 房屋信息 end -->
					<!-- 生意转让 start-->
					<block v-if="tc.msgptypeid == 4">
						<view>
							<view class="content-tag">所属行业 :</view>
							{{tc.shengyihangye}}
						</view>
					</block>
				
					<!-- 生意转让 end-->
					<!-- 内容在标签下面 -->
					<view class="">{{tc.msgcontent}}</view>
					<view class="content-phone">{{tc.contactphone}}</view>
				
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
		tcinfolist:{
			type:Array,
			default: ()=> []
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
