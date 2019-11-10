<template name="tab-control">
	<view class="tab-control">
		<block v-for="(item,index) in tabarry" :key="index">
			<view class="tab-item" 
			@tap="handleItemClick" :data-index="index"
			:class="currindex==index ?'active':''">
			<text>{{item}}</text>
			</view>
		</block>
		
		 
	</view>
</template>

<script>
	export default {
		name:"tab-control",
		props:{
			tabarry:{}
		},
		data() {
			return {
				currindex:0
			};
		},
		methods:{
			handleItemClick(e){
				var me = this;
				var index = e.currentTarget.dataset.index;
				me.currindex = index;
				
				me.$emit("send",me.currindex);
			}
		}
	}
</script>

<style>
.tab-control{
	display: flex;
	flex-direction: row;
	height: 70upx;
	line-height: 70upx;
	background: #FFFFFF;
}
.tab-item{
	flex: 1;
	font-size: 14px;
	text-align: center;
}
.active text{
	padding: 10upx 16upx;
	color: #52A9EC;
	border-bottom: 1px solid #52A9EC;
}
</style>
