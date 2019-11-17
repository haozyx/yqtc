<template>
	<view>
		<view class="buywrap">
			<view class="title">支付中心</view>
			<view class="textitem">
				<view class="lefttext">商品名称</view>
				<view class="righttext">刷新信息</view>
			</view>
			<view class="textitem">
				<view class="lefttext">备注信息</view>
				<view class="righttext">刷新信息</view>
			</view>
			<view class="textitem">
				<view class="lefttext">支付倒计时</view>
				<view class="righttext redtext">0分0秒</view>
			</view>
			<view class="textitem">
				<view class="lefttext">支付金额</view>
				<view class="righttext redtext">￥5元</view>
			</view>
			
			<view>
				<button type="primary" @tap="gotobuy" class="btn">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userobj:{},
				appId: '',
				timeStamp: '',
				nonceStr: '',
				package: '',
				signType: '',
				paySign: '',
			}
		},
		onLoad() {
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user;
				console.log(me.userobj);
			}
		},
		methods: {
			//前往支付
			gotobuy(){
				var me=this;
				var orderno = me.tradeNo();
				var buy = {
					orderno:orderno,
					tcuserid: me.userobj.id,
					buyname: '刷新消息',
					msgid:12,
					remark: '刷新消息',
					money: 0.01
				};
				
				me.webhttp({
					url:me.websiteUrl + 'prepay',
					method:'POST',
					data:buy
				}).then(res=>{
					if(res.code == 200){
						me.buybuy(res.paymap)
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
				
			},
			buybuy(wp){
				var me =this;
				me.appId = wp.appId;
				me.timeStamp = wp.timeStamp;
				me.nonceStr = wp.nonceStr;
				me.package = wp.package;
				me.signType = wp.signType;
				me.paySign = wp.paySign;
				// 调起微信支付
				if (typeof WeixinJSBridge == 'undefined') {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', me.onBridgeReady, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', me.onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', me.onBridgeReady);
					}
				} else {
					me.onBridgeReady();
				}
			},
			onBridgeReady() {
				var me = this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					{
						appId: me.appId, //公众号名称,由商户传入
						timeStamp: me.timeStamp, //时间戳,自1970年以来的秒数
						nonceStr: me.nonceStr, //随机串
						package: me.package,
						signType: me.signType, //微信签名方式：
						paySign: me.paySign //微信签名
					},
					function(res) {
						if (res.err_msg == 'get_brand_wcpay_request:ok') {
							// console.log('支付成功');
							//支付成功后跳转的页面
							uni.reLaunch({
								url:'/pages/index/index'
							})
						} else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
							console.log('支付取消');
						} else if (res.err_msg == 'get_brand_wcpay_request:fail') {
							console.log('支付失败');
							WeixinJSBridge.call('closeWindow');
						} //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
					}
				);
			},
			//创建订单编号
			tradeNo() {
				const now = new Date();
				const year = now.getFullYear();
				let month = now.getMonth() + 1;
				let day = now.getDate();
				let hour = now.getHours();
				let minutes = now.getMinutes();
				let seconds = now.getSeconds();
				String(month).length < 2 ? (month = Number('0' + month)) : month;
				String(day).length < 2 ? (day = Number('0' + day)) : day;
				String(hour).length < 2 ? (hour = Number('0' + hour)) : hour;
				String(minutes).length < 2 ? (minutes = Number('0' + minutes)) : minutes;
				String(seconds).length < 2 ? (seconds = Number('0' + seconds)) : seconds;
				const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
				return (
					yyyyMMddHHmmss +
					'_' +
					Math.random()
						.toString(36)
						.substr(2, 9)
				);
			}
		}
	}
</script>

<style>
@import url("buy.css");
</style>
