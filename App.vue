<script>
	export default {
		onLaunch: function() {
			//uni.setStorageSync('tcuser',{id:5,nickname:'含香里',sex:1,touxiangimg:'https://img.yohaoyun.com/yohaoyun/tongcheng/touxiang/20191115/file-1573786427123.jpg'});
			//uni.clearStorageSync();
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
	
	/* 最下方的空白 */
	.whitespace{
		height: 50px;
		width: 100%;
	}	
	
	.inlineblock{
		display: inline-block;
		margin-left: 5px;
	}
</style>
