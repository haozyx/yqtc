<template>
	<view class="page-fill">
		
		<search @search="searchthreeclassify"></search>
		
		<block v-for="(value,key) in  dataarry" :key="key">
			<view class="first-str">
			 {{key}}
			</view>
			<view class="righttext" v-for="(item,index) in value" :key="index" @tap="viewdetail" :data-id="item.id">
				{{item.name}}
			</view>
		</block>
		
		<view class="nodata" v-if="disno">
			<view class="bigtext">没有搜索结果</view>
			<view class="smalltext">点击右下角的+可添加电话</view>
			<fa-icon class="fa-smile-o" color="#000000" size="30"></fa-icon>
		</view>
		<view class="add" @tap="addinfo">
			<image class="addimg" src="https://img.yohaoyun.com/yohaoyun/tongcheng/jia.png"></image>
		</view>
		
	</view>
</template>

<script>
	import search from '@/components/search/search.vue';
	
	export default {
		components: {
			search
		},
		data() {
			return {
				disno:false,
				dataarry:[],
			}
		},
		onLoad(e) {
			var me = this;
			var name = e.name;
			me.dataarry = [];
			me.searchthreeclassify(name);
		},
		methods: {
			
			viewdetail(e){
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url:'../detail/detail?id='+id
				})
			},
			addinfo(){
				uni.navigateTo({
					url:'../add/add'
				})
			
			},
			searchthreeclassify(e){
				//console.log(e);
				var me = this;
				uni.request({
					url: me.websiteUrl + 'searchphonebook',
					method: 'POST',
					data: {name:e},
					success: res => {
						if(res.data.code ==200){
							
							var dataarry = res.data.list;
							if(dataarry){
								me.disno = false;
								me.dataarry = res.data.list;
							}else{
								me.disno = true;
							}
						
						}
						 
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
@import url("search.css");
</style>
