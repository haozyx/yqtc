<template name="my-list-content">
	<view>
		<!-- 列表详情 start-->
		<view class="listwrap" v-for="(tc,index) in tcinfolist" :key="index">
			<view class="listwrap1">
				<!-- <image class="leftimg" @tap="disperinfos" src="../../static/img/index/nantx.png" ></image> -->
				<image class="leftimg" :src="tc.tcuserimg" ></image>
				<view class="contentwrap" >
					<!-- title 左右结构-->
					<view class="titlewrap">
						<view class="title-zd" v-if="tc.istop==1">置顶</view>
						<view class="title-fl">{{tc.msgtypename}}</view>
						<view class="title-nicheng">{{tc.tcusernickname}}</view>
						<view class="rightsee" @tap="gotodetail(tc.id)">
							<image src="https://img.yohaoyun.com/yohaoyun/static/tc/eye.png" class="eyeimg"></image>
							<view class="seetext" >详情</view>
						</view>
					</view>

					<!-- 内容  start-->
					
					<view :class="{ contentbody: true, active: clickarry.indexOf(index) != -1 }">
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
								{{tc.chengcherenshu}}
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
						<!-- 2 二手交易 start -->
						<block v-if="tc.msgptypeid == 2">
							<view>
								<view class="content-tag">交易类型 :</view>
								{{tc.ershoujiaoyitype}}
							</view>
						</block>
						<!-- 二手交易 end -->
						
						<!-- 内容在标签下面 -->
						<view class="msgcontent">{{tc.msgcontent}}</view>
						<view class="content-phone">{{tc.contactperson}}-{{tc.contactphone}}</view>
					
						<!-- 自己就别给自己打电话发信息了 -->
						<!-- <view class="callphone">
							<fa-icon color="#FFFFFF" size="15" class="fa-phone"></fa-icon>
							<view class="inlineblock">拨打电话</view>
						</view>
						<view class="sendmsg" @tap="gotochat(tc.tcuserid)">
							<fa-icon color="#000000" size="15" class="fa-envelope-o "></fa-icon>
							<view class="inlineblock">发送私信</view>
						</view> -->
					</view>
					<!-- 显示全文-->
					<view class="disall" @tap="disorhide(index)">{{clickarry.indexOf(index) != -1? '隐藏' : '显示全文'}}</view>
				 
					<!-- 内容  end-->
					 

					<!-- 图片 小于三个图片直接显示 -->
					<block v-if="tc.imglist.length>0&&tc.imglist.length<=3"> 
						<view class="cont-img-wrap">
							<block  v-for="(tcimg,imgindex) in tc.imglist" :key="imgindex">	
								<image class="cont-img" :src="tcimg.imgurl" @tap="preview(tc,imgindex)"  ></image>
							</block>
						</view>
					</block>
					<!-- 大于三个图片为了显示美观增加查看最多的按钮 -->
					<block v-if="tc.imglist.length>3">
						<view class="cont-img-wrap" :class="{active:clickimgarry.indexOf(index) != -1 }" >
							<block  v-for="(tcimg,imgindex) in tc.imglist" :key="imgindex">	
								<image class="cont-img" @tap="preview(tc,imgindex)" :src="tcimg.imgurl" v-if="imgindex != 2"></image>
								<view class="moreimg-wrap" v-if="imgindex == 2">
									<image class="cont-img" @tap="preview(tc,imgindex)" :src="tcimg.imgurl"></image>
									<view class="moreimg-text" :class="{ showmore: clickimgarry.indexOf(index) != -1 }" @tap="dismoreimg(index)">更多图片</view>
								</view>
							</block>
						</view>
					</block>
					
					<list-foot :tcinfo="tc"></list-foot>
				</view>
				</view>
			<view class="bottombtnwrap"  >
				<button type="default" v-if="tc.status == '1'" @tap="refreshdata(tc)"  class="optbtn">刷新</button>
				<button type="default" v-if="tc.status == '1'"  @tap="gototop(tc.id)" class="optbtn">置顶</button>
				<button type="default"  v-if="tc.status == '3'" @tap="gotobuy(tc)"   class="optbtn">支付</button>
				<button type="default"  v-if="tc.status == '1'" @tap="undercarrige(index,tc.id,0)" class="optbtn">下架</button>
				<button type="default"  v-if="tc.status == '0'" @tap="undercarrige(index,tc.id,1)" class="optbtn">上架</button>
			</view>
		</view>
		

	</view>
</template>

<script>
import listFoot from '../list-foot/list-foot.vue';
//标签
import uniTag from '@/components/uni-tag/uni-tag.vue';
export default {
	name: 'my-list-content',
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
		btnarry:{
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
			curindex:-1,
			userid:0,
			showallimg:false,
			clickarry:[], // 显示隐藏更多
			clickimgarry:[], //显示隐藏更多图片
			tagarry:['success','error','warning','primary']
		};
	},
	methods:{
		/* 预览图片 */
		preview(tcbean,imgindex) {
			var imgarr = [];
			tcbean.imglist.forEach(imgbean=>{
				imgarr.push(imgbean.imgurl);
			}
			);
			var index = parseInt(imgindex);
			uni.previewImage({
				urls: imgarr,
				current: index 
			});
		},
		disorhide(a){
			var me = this;
			 
			/* if(me.curindex == a){
				me.curindex =-1;
			}else{
				me.curindex = a;
			} */
			//使用数组的方式可以进行多项的隐藏显示   使用curindex方式全局只能一个
			if (me.clickarry.indexOf(a) != -1) {
				me.clickarry.splice(me.clickarry.indexOf(a), 1);
			} else {
				me.clickarry.push(a);
			}
		},
		dismoreimg(b){
			var me  = this;
			if (me.clickimgarry.indexOf(b) != -1) {
				me.clickimgarry.splice(me.clickimgarry.indexOf(b), 1);
			} else {
				me.clickimgarry.push(b);
			}
		},
		gotodetail(msgid){
			//查看详情
			uni.navigateTo({
				url:'/pages/detail/detail?msgid='+msgid
			});
			//this.$emit('disdetail',{msgid:msgid});
		},
		disperinfos(){
			uni.navigateTo({
				url:'../../pages/perinfos/perinfos'
			})
		},
		/* 处理按钮点击事件 */
		handleclick(btntext,msgid,index){
			this.$emit('btnclick',{btntext:btntext,msgid:msgid,arryindex:index});	
		},
		/* 前往支付页面 */
		gotobuy(tc){
			/* 发布一条消息5元 */
			var buy={
				orderno:'',
				tcuserid :tc.tcuserid,
				msgid:tc.id,
				buyname:'发布付费消息',
				remark:'发布付费消息',
				/* money:0.01, */
				money:5,
				type:'publish',
				topdays:0
			};
			//放入缓存. 这边放 那边取
			uni.removeStorageSync('buybean');
			uni.setStorageSync('buybean',buy);
			//页面跳转
			uni.redirectTo({
				url: '/pages/buy/buy'
			});
			
		},
		/* 前往发送消息界面 */
		gotochat(tcuserid){
			var me = this;
			var user = me.getGlobalTCUser();
			if(user) me.userid = user.id; 
			if(me.userid == tcuserid){
				uni.showToast({
					title: '别逗了,自己不能撩自己~',
					icon:'none',
					mask:true
				});
				return;
			}
			
			uni.navigateTo({
				url:'/pages/imchat/imchat?tcuserid='+tcuserid
			})
		},
		/* 置顶消息 */
		gototop(msgid){
			uni.navigateTo({
				url:'/pages/publish/toppage/toppage?msgid='+msgid
			})
		},
		/* 下架消息 */
		undercarrige(index,msgid,type){
			var me = this;
			me.webhttp({
				url:me.websiteUrl + 'undercarrige',
				method:'GET',
				data:{
					msgid:msgid,
					type:type	
				}
			}).then(res=>{
				if(res.code == 200){
					uni.showToast({
						title: '操作成功',
						icon:'none',
						mask:true
					});
					me.tcinfolist.splice(index,1);
				}else{
					uni.showToast({
						title: res.msg,
						icon:'none',
						mask:true
					});
				}	
			});
		},
			
		/* 刷新消息 */	
		refreshdata(tc){
			
			uni.showModal({
				confirmText:'确定',
				title:'本次刷新消息2元,确定刷新吗?',
				content:'刷新后消息首页展示.',
				success(res) {
					if(res.confirm){
						
						var msgid = tc.id;
						var userid = tc.tcuserid;
						var buy={
							orderno:'',
							tcuserid :userid,
							msgid:msgid,
							buyname:'刷新消息',
							remark:'刷新消息',
							money:0.01,
							type:'refresh',
							topdays:0
						};
						//放入缓存. 这边放 那边取
						uni.removeStorageSync('buybean');
						uni.setStorageSync('buybean',buy);
						uni.redirectTo({
							url: '/pages/buy/buy'
						});
					}
				}
			})
			
		}	
	}
};
</script>

<style>
@import url('my-list-content.css');
</style>
