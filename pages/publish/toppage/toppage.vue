<template>
	<view class="page">
		<view class="content-wrap">
			<!-- 图片 -->
			<view class="imgwrap">
			<image src="../../../static/img/publish/chenggong.png" class="okimg"></image>
			<view class="psuccess">发布成功</view>
			</view>
			<!-- 按钮 -->
			<view class="btnwrap">
				<button class="btn">管理信息</button>
				<button class="btn">查看信息</button>
				<button class="btn">再发一条</button>
			</view>
			<!-- 置顶信息 -->
			<view class="topinfo">
				<image src="../../../static/img/publish/zhiding.png" class="zdimg"></image>
				<view class="toptext">信息置顶,提高6-10倍曝光率!</view>
			</view>
			<!-- 置顶套餐 -->
			<view class="uni-list">
				<radio-group @change="radioChange">
				    <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
				        <view>
				            <radio :value="item.value" :checked="index === current" />
				        </view>
				        <view>{{item.name}}</view>
				    </label>
				</radio-group>
			</view>
			<!-- 置顶提示 -->
			<view class="zhidinghint">
				置顶说明:信息将展示到最顶部,置顶15天以上送公众号图文消息推广一次.
			</view>
			<!-- 购买按钮 -->
			<view class="">
				<button class="buybtn">确认购买</button>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{ value: '5',  name: '置顶1天5块'  },
				        { value: '30',  name: '置顶7天30块'  },       
				        { value: '60',  name: '置顶15天60块'  },
					    { value: '120',  name: '置顶30天120块', checked: 'true'  } 
				       ],
				current: 3,
			}
		},
		onLoad(e) {
			console.log(e);
		},
		methods: {
			/* 单选框改变时间 */
			radioChange: function(evt) {
			            for (let i = 0; i < this.items.length; i++) {
			                if (this.items[i].value === evt.target.value) {
			                    this.current = i;
			                    break;
			                }
			            }
			}
		}
	}
</script>

<style>
@import url("toppage.css");
</style>
