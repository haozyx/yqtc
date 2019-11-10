<template>
	<view>
		<view class="info-wapper">
			<view class="info-title">请选择举报原因</view>
			<view class="info-body">
				<view class="tagwrap" v-for="(tag, index) in tagarry" :key="index">
					<uni-tag :inverted="choosetagarry.indexOf(tag) == -1" :text="tag" 
					:data-tagname="tag" @tap="seltag" type="primary" />
				</view>
			</view>
		</view>
		
		<view class="grayspace"></view>
		<view class="info-wapper">
			<view class="info-title">备注说明(0-100字)</view>
			<view class="info-body">
				<textarea maxlength="100" class="notetext" placeholder="请简要说明您的举报理由,以便工作人员进行审核判断."></textarea>
			</view>
		</view>
		 
		<view >
			<button class="reportbtn">确定</button>
		</view>
	</view>
</template>

<script>
	//标签
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	export default {
		data() {
			return {
				tagarry:[' 电话虚假（空号、无人接听）','涉黄违法',' 虚假信息（如职位、待遇等）','恶意营销','其他'],
				choosetagarry:[],
			}
		},
		components:{
			uniTag
		},
		methods: {
			/* 可选择的举报原因 */
			seltag(e){
				var me = this;
				
				var tagname = e.e.currentTarget.dataset.tagname;
				if (me.choosetagarry.indexOf(tagname) != -1) {
					me.choosetagarry.splice(me.choosetagarry.indexOf(tagname), 1);
				} else {
					if(me.choosetagarry.length ==1){
						me.choosetagarry = [];
						me.choosetagarry.push(tagname);
						 
					}else{
						me.choosetagarry.push(tagname);
					}
					
				}
			},
		}
	}
</script>

<style>
@import url("report.css");
</style>
