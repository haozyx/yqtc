<script>
	export default {
		onLaunch: function() {
			//uni.setStorageSync('tcuser',{id:2,nickname:'雪后彩虹',sex:2,touxiangimg:'https://img.yohaoyun.com/yohaoyun/tongcheng/touxiang/20191116/file-1573907932430.jpg'});
			uni.setStorageSync('tcuser',{id:3,nickname:'晴天有雨',sex:1,touxiangimg:'https://img.yohaoyun.com/yohaoyun/tongcheng/touxiang/20191115/file-1573786427123.jpg'});
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*每个页面公共css */
	.page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		/* 	position: absolute; */
	}
	.page-fill {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		position: absolute;
	}
	/* 线条 */
	.line-wrap {
		padding: 0upx 35upx;
	}
	.line {
		height: 1px;
		background-color: #e3e3e3;
	}
	.globalblue{
		color:#52A9EC;
	}
	/* 这是隐藏滚动条的，在单个页面设置不管用 */
	::-webkit-scrollbar {
		display: none;
	}
	.bcolor{
		background-color: #52A9EC;
	}
	
	.inlineblock{
		display: inline-block;
		margin-left: 5px;
	}
</style>
