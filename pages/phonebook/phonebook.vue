<template>
	<view class="page-fill">
		<search @search="searchthreeclassify"></search>
		
		<view class="body">
			
			<block v-for="(item,index) in indexarry" :key="index">
				<view class="textwrap" @tap="disdetail"   :data-id="item.id" :data-name="item.name">
					<view >{{item.name}}</view>
					<image src="https://img.yohaoyun.com/yohaoyun/tongcheng/you.png" class="you"></image>
				</view>
				<view class="line-wrap"> <view class="line"></view> </view>
			</block>
		</view>
		<view class="whitespace"></view>
	</view>
</template>

<script>
	import search from '@/components/search/search.vue';
	export default{
		data(){
			return {
				indexarry:[],
			}
		},
		components: {
			search
		},
		onLoad() {
			//获取一级分类
			this.getoneclassify();
		},
		methods:{
			searchthreeclassify(e){ 
				var name =e;
				uni.navigateTo({
					url:'/pages/phonebook/search/search?name='+e
				})
			},
			disdetail(e){
				var id = e.currentTarget.dataset.id;
				var name = e.currentTarget.dataset.name;
				uni.navigateTo({
					url:'/pages/phonebook/classify/classify?id='+id+'&name='+name
				})
			},
			getoneclassify(){
				var me = this;
				uni.request({
					url:me.websiteUrl + 'getoneclassify',
					method:'GET',
					success(res) {
						if(res.data.code ==200){
							me.indexarry = res.data.list;
						}
					},fail(e) {
						//console.log(e);
					}
				})
			}
		}
	}
</script>

<style>
@import url("phonebook.css");
</style>
