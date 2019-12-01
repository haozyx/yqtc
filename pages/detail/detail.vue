<template>
	<view class="page">
		<!-- 网站横幅 start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(bimg, index) in bannerimgarry" :key="index"><image :src="bimg.imgurl" class="carousel"></image></swiper-item>
		</swiper>
		<!-- 网站横幅 end -->
		<!-- 内容详情 start -->
		<view class="listwrap">
			<view class="listwrap1">
				<image class="leftimg" @tap="disperinfos" :src="tcbean.tcuserimg"></image>
				<view class="contentwrap">
					<!-- title 左右结构-->
					<view class="titlewrap">
						<view class="title-zd" v-if="tcbean.istop == 1">置顶</view>
						<view class="title-fl">{{ tcbean.msgptypename }}</view>
						<view class="title-fl">{{ tcbean.msgtypename }}</view>
						<view class="title-nicheng">{{ tcbean.tcusernickname }}</view>
					</view>

					<!-- 内容  start-->

					<view :class="{ contentbody: true, active: true }">
						<block v-if="tcbean.msgtags != ''">
							<view class="tagtag" v-for="(tag, tx) in beantagarry" :key="tx"><uni-tag inverted="true" :type="tagarry[tx % 4]" :text="tag"></uni-tag></view>
						</block>

						<!--8 招聘求职 start  13 招聘 14求职-->
						<block v-if="tcbean.msgptypeid == 8">
							<view>
								<view class="content-tag">工作职位 :</view>
								{{ tcbean.gongzuozhiwei }}
							</view>
							<view>
								<view class="content-tag">性别 :</view>
								{{ tcbean.gongzuosex }}
							</view>
							<view v-if="tcbean.msgtypeid == 14">
								<view class="content-tag">工作经验 :</view>
								{{ tcbean.gongzuojingyan }}
							</view>
							<view v-if="tcbean.msgtypeid == 13">
								<view class="content-tag">岗位薪资 :</view>
								{{ tcbean.qiwangxinzi }}
							</view>
							<view v-if="tcbean.msgtypeid == 14">
								<view class="content-tag">期望薪资 :</view>
								{{ tcbean.qiwangxinzi }}
							</view>
						</block>
						<!-- 招聘求职 end -->
						<!-- 顺风车 start 9 == 顺风车 12 =天天拼 -->
						<block v-if="tcbean.msgptypeid == 9">
							<view>
								<view class="content-tag">出发地 :</view>
								{{ tcbean.chufadi }}
							</view>
							<view>
								<view class="content-tag">目的地 :</view>
								{{ tcbean.mudidi }}
							</view>
							<!-- <view v-if="tcbean.msgtypeid != 12">
								<view class="content-tag">出发时间 :</view>
								{{ tcbean.chengcheshijian }}
							</view> -->
							<view>
								<view class="content-tag">乘客人数 :</view>
								{{ tcbean.chengcherenshu }}
							</view>
						</block>

						<!-- 招聘求职 end -->
						<!-- 房屋信息  start 5=房屋租售 6 出售 26出租 -->
						<block v-if="tcbean.msgptypeid == 5">
							<block v-if="tcbean.msgtypeid == 6 || tcbean.msgtypeid == 26">
								<view>
									<view class="content-tag">房屋位置 :</view>
									{{ tcbean.fangwuweizhi }}
								</view>

								<view>
									<view class="content-tag">装修情况 :</view>
									{{ tcbean.zhuangxiuqingkuang }}
								</view>
							</block>
						</block>

						<!-- 房屋信息 end -->
						<!-- 生意转让 start-->
						<block v-if="tcbean.msgptypeid == 4">
							<view>
								<view class="content-tag">所属行业 :</view>
								{{ tcbean.shengyihangye }}
							</view>
						</block>
						<!-- 生意转让 end-->
						<!-- 2 二手交易 start -->
						<block v-if="tcbean.msgptypeid == 2">
							<view>
								<view class="content-tag">交易类型 :</view>
								{{ tcbean.ershoujiaoyitype }}
							</view>
						</block>
						<!-- 二手交易 end -->

						<!-- 内容在标签下面 -->
						<view class="msgcontent">{{ tcbean.msgcontent }}</view>
						<view class="content-phone">{{ tcbean.contactphone }}</view>

						<view class="callphone">
							<fa-icon color="#FFFFFF" size="15" class="fa-phone"></fa-icon>
							<view class="inlineblock" @tap="opencall(tcbean.contactphone)">拨打电话</view>
						</view>
						<view class="sendmsg" @tap="gotochat(tcbean.tcuserid)">
							<fa-icon color="#000000" size="15" class="fa-envelope-o "></fa-icon>
							<view class="inlineblock">发送私信</view>
						</view>
					</view>
					<!-- 显示全文-->

					<!-- 内容  end-->

					<!-- 图片 小于三个图片直接显示 -->
					<block v-if="tcbean.imglist.length > 0">
						<view class="cont-img-wrap">
							<block v-for="(tcimg, imgindex) in tcbean.imglist" :key="imgindex">
								<image class="cont-img" :src="tcimg.imgurl" @tap="preview(tcbean, imgindex)"></image>
							</block>
						</view>
					</block>
					<!-- 大于三个图片为了显示美观增加查看最多的按钮 -->

					<list-foot :tcinfo="tcbean"></list-foot>
				</view>
			</view>
			<view class="bottombtnwrap" v-if="btnarry.length > 0">
				<block v-for="(btn, bindex) in btnarry" :key="bindex">
					<button type="default" @tap="handleclick(btn, tcbean.id, index)" class="optbtn">{{ btn }}</button>
				</block>
			</view>
		</view>
		<!-- 内容详情 end -->
		
		<view class="whitespace" style="height: 110px;background: #FFFFFF;">
			
		</view>
		
		<!-- 微信分享 start -->
		<view class="back-top" @tap="gotoshare">
			<image src="https://img.yohaoyun.com/yohaoyun/tongcheng/share.png"></image>
			<view class="share-text"> 分享 </view>
		</view>
		<!-- 微信分享 start -->
		<view class="ecodewrap">
			<view class="dleft-text">免费发便民消息,请关注【垣曲恋爱吧】长按右侧图片识别二维码</view>
			<image class="ewmimg" src="https://img.yohaoyun.com/yohaoyun/tongcheng/appimg/love.jpg"></image>
		</view>
		
	</view>
</template>

<script>
import listContent from '@/components/list-content/list-content.vue';
import listFoot from '@/components/list-foot/list-foot.vue'; //标签
import uniTag from '@/components/uni-tag/uni-tag.vue';
export default {
	data() {
		return {
			tcbean: { imglist: [], commentlist: [] },
			beantagarry: [],
			btnarry: [],
			title:'便民垣曲-免费发布同城信息',
			clickimgarry: [],
			userid: 0,
			msgid:0,
			tagarry: ['success', 'error', 'warning', 'primary'],
			bannerimgarry: [{ imgurl: '../../static/img/detail/ad1.jpg' }]
		};
	},
	onLoad(e) {
		var me = this;
		var user = me.getGlobalTCUser();
		if (user) me.userid = user.id;
		var msgid = e.msgid;
		me.msgid = msgid;
		me.getmsginfodetail(msgid);
	},
	/* 下拉刷新 */
	onPullDownRefresh() {
		var me = this;
		me.tcbean={ imglist: [], commentlist: [] };
		me.getmsginfodetail(me.msgid);
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	/* 主要做微信的分享 */
	onShow() {},
	components: {
		listContent,
		listFoot,
		uniTag
	},
	methods: {
		/* 微信分享 */
		gotoshare(){
			uni.showToast({
				icon:'none',
				title:'请点击右上角的 "..." 进行分享',
			});
			/* var href = location.href;
			 WeixinJSBridge.invoke('shareTimeline',{
			 		"img_url":'https://img.yohaoyun.com/yohaoyun/tongcheng/appimg/bmyqlogo.png',
			 		"link":href,
			 		"desc": '111111111',
			 		"title":'招聘'
			});	 */
		},
		/* 微信配置 */
		configweixin(){
			
				var me = this;
				var jweixin = require('jweixin-module');
			 
				var signhref = location.href;
				me.webhttp({
					url: me.websiteUrl + 'getwxconfig',
					method: 'GET',
					data: {
						url: signhref
					}
				}).then(res => {
					if (res.code == 200) {
						let wxconfig = res.wxconfig;
						var config = {
							debug: false, // 调试，发布的时候改为false
							appId: wxconfig.appid,
							nonceStr: wxconfig.nonceStr,
							timestamp: wxconfig.timestamp,
							signature: wxconfig.signature,
							jsApiList: ['updateAppMessageShareData',
										'updateTimelineShareData',
										'onMenuShareTimeline',
										'onMenuShareAppMessage']
						};
						//配置微信
						jweixin.config(config);
						jweixin.error(err => {
							console.log('config fail:', err);
						});
			
						jweixin.ready(res => {
							jweixin.updateAppMessageShareData({ 
							    title: me.title, // 分享标题
							    desc: '便民垣曲，用心打造垣曲本地生活服务平台。让用户足不出户，一切尽在掌握。', // 分享描述
							    link: signhref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							    imgUrl: 'https://img.yohaoyun.com/yohaoyun/tongcheng/appimg/bmyqlogo.png', // 分享图标
							    success: function () {
							      // 设置成功
							    }
							  });
							  jweixin.updateTimelineShareData({ 
							      title: me.title, // 分享标题
							      link: signhref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							      imgUrl:'https://img.yohaoyun.com/yohaoyun/tongcheng/appimg/bmyqlogo.png', // 分享图标
							      success: function () {
							        // 设置成功
							      }
							    });
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							mask: true
						});
					}
				});
		},	
		/* 预览图片 */
		preview(tcbean, imgindex) {
			var imgarr = [];
			tcbean.imglist.forEach(imgbean => {
				imgarr.push(imgbean.imgurl);
			});
			var index = parseInt(imgindex);
			uni.previewImage({
				urls: imgarr,
				current: index
			});
		},
		/* 前往发送消息界面 */
		gotochat(tcuserid) {
			//自己和自己不能发消息
			var me = this;
			if (me.userid == tcuserid) {
				uni.showToast({
					title: '别逗了,自己不能撩自己~',
					icon: 'none',
					mask: true
				});
				return;
			}

			uni.navigateTo({
				url: '/pages/imchat/imchat?tcuserid=' + tcuserid
			});
		},
		/* 拨打电话 */
		opencall(phonenum) {
			uni.makePhoneCall({
				phoneNumber: phonenum //仅为示例
			});
		},
		/* 获取消息详情 */
		getmsginfodetail(msgid) {
			var me = this;
			me.webhttp({
				url: me.websiteUrl + 'gettcinfodetail',
				method: 'GET',
				data: { msgid }
			}).then(res => {
				if (res.code == 200) {
					me.tcbean = res.tcbean;
					me.title = me.tcbean.msgcontent;
					me.configweixin(); // 初始化微信分享
					if (me.tcbean.msgtags) {
						me.beantagarry = me.tcbean.msgtags.split(';');
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: true
					});
				}
				//	console.log(me.tcbean);
			});
		}
	}
};
</script>

<style>
@import url('detail.css');
</style>
