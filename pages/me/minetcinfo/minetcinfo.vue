<template>
	<view class="page-fill">
		<tab-control :tabarry="tabarry" @send="getflvalue"></tab-control>
		<view style="grayspace"></view> 
		<!-- 列表详情 start-->
		<list-content @disdetail="gotodetail" :disall="true"></list-content>
		<list-content @disdetail="gotodetail" :disallimg="true"></list-content>
		<!-- 列表详情 end-->
		
	</view>
</template>

<script>
	/* 使用定义的子组件 */
	import tabControl from "@/components/tab-control/tab-control.vue";
	import listContent from '@/components/list-content/list-content.vue';
		
	export default {
		components:{
			tabControl,
			listContent
		},
		data() {
			return {
				tabarry:['全部','展示中','未支付','已下架']
			}
		},
		methods: {
			getflvalue(e){
				console.info(e);
			}
		}
	}
</script>

<style>
@import url("minetcinfo.css");
</style>
